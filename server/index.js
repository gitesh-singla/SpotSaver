const express = require('express')
// const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const Users = require('./models/Users')
const Spots = require('./models/Spots')
const Bookings = require('./models/Bookings')
const distance = require('./functions/distanceFunction')
const coordinatesToCity = require('./functions/coordsToCity')
const { default: axios } = require('axios')
const checkAvailability = require('./functions/checkAvailability');


const app = express()

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtKey = process.env.JWT_KEY

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(cookieParser())
app.use(express.json())

async function runMongo() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        app.listen('4000')
        console.log("listening in 4000")
        // const data = await Users.find()
        // console.log(data);
    } catch (error) {
        console.log(error)
    }
}
runMongo();

app.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body
    //console.log(name, email, phone, password);
    try {
        const userExists = await Users.findOne({ email: email })
        if (!userExists) {
            const newUser = await Users.create({
                name,
                email,
                phone,
                password: bcrypt.hashSync(password, bcryptSalt),
            })
            console.log(newUser);
            res.json(newUser)
        } else {
            res.status(422).json('User already Registered')
        }
    } catch (error) {
        console.log(error);
        res.status(422).json(error)
    }
}
)

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const userExists = await Users.findOne({ email: email })
        //console.log(userExists);
        if (userExists) {
            const passwordValid = bcrypt.compareSync(password, userExists.password)

            if (passwordValid) {
                jwt.sign({ email: userExists.email, _id: userExists._id }, jwtKey, {}, (error, token) => {
                    try {
                        if (error) throw error
                        const { name, email, _id, phone } = userExists
                        res.cookie('authToken', token).json({ name, email, _id, phone })
                    } catch (error) {
                        console.log(error);
                        res.status(422).json(error.message)
                    }
                })
            } else {
                res.status(422).json('password is invalid')
            }
        } else {
            res.status(422).json('not found')
        }
    } catch (error) {
        console.log(error);
        res.status(422).json(error.message)
    }
})

app.get('/auth', (req, res) => {
    const { authToken } = req.cookies
    //console.log(req.cookies);
    if (authToken) {
        jwt.verify(authToken, jwtKey, {}, async (err, jwtResponse) => {
            try {
                if (err) throw err;
                const { name, email, _id, phone } = await Users.findById(jwtResponse._id)
                res.json({ name, email, _id, phone });
            } catch (error) {
                console.log(error)
                res.status(422).json(error.message)
            }
        })
    } else {
        res.json(null)
    }
})

app.post('/logout', (req, res) => {
    res.cookie('authToken', '').json('Logged out.')
})

app.post('/addlisting', (req, res) => {
    const data = req.body
    const { authToken } = req.cookies
    if (authToken) {
        jwt.verify(authToken, jwtKey, {}, async (err, jwtResponse) => {
            try {
                if (err) throw err;
                const { _id, phone } = await Users.findById(jwtResponse._id)
                // console.log({ _id, phone });
                const city = await coordinatesToCity(data.location.lat, data.location.lon)
                if (!city) throw ('city not determined')
                const newSpot = await Spots.create({
                    ...data,
                    city,
                    owner: _id,
                    createdAt: new Date(),
                    phone,
                })
                res.json(newSpot)
            } catch (error) {
                console.log(error);
                res.status(422).json(error.message)
            }
        })
    } else {
        res.status(302).json('not logged in')
    }
})


app.get('/listings', async (req, res) => {
    try {
        const { lon, lat, city, startTime, endTime } = req.query;
        const allSpots = await Spots.find({ city: city }).lean()
        let spots = await Promise.all(allSpots.map(async spot => {
            const available = await checkAvailability(spot._id, spot.slots, startTime, endTime);
            return {
                ...spot,
                distance: distance(lat, lon, spot.location.lat, spot.location.lon).toFixed(2),
                available,
            }
        }));
        spots = spots.filter(spot => spot.available)
        res.json(spots)
    } catch (error) {
        console.log(error);
        res.status(402).json(error);
    }
})

app.get('/listing/', async (req, res) => {
    const { id, lat, lon } = req.query
    try {
        const spotData = await Spots.findOne({ _id: id }).lean()
        const { name, phone } = await Users.findOne({ _id: spotData.owner })
        let response = { ...spotData, name, phone }
        if (lat != 0 && lon != 0) {
            const origin = [lon, lat]
            const dest = [spotData.location.lon, spotData.location.lat]
            console.log('requesting route');
            const { data } = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.ORS_API_KEY}&start=${origin}&end=${dest}`)
            const { duration, distance } = data.features[0].properties.segments[0]
            const coordinates = data.features[0].geometry.coordinates
            response = { ...response, duration, distance, coordinates }
        }
        res.json(response)
    } catch (error) {
        res.status(422).json(error.message)
    }
})

app.post('/book', async (req, res) => {
    const { spot, start, end } = req.body;
    const { authToken } = req.cookies
    if (authToken) {
        jwt.verify(authToken, jwtKey, {}, async (err, jwtResponse) => {
            try {
                if (err) throw err;
                if (!spot || !start || !end || start >= end) {
                    throw ("Invalid request");
                }
                if (start > new Date().setDate(new Date().getDate() + 6) || start < new Date()) {
                    throw ("Invalid request");
                }
                const spotExists = await Spots.findOne({ _id: spot });
                if (spotExists) {
                    const { slots } = spotExists;
                    const available = await checkAvailability(spot, slots, start, end);
                    if (available) {
                        const bookingInfo = await Bookings.create({
                            spot,
                            createdAt: new Date(),
                            client: jwtResponse._id,
                            status: "active",
                            start,
                            end,
                        })
                        res.json(bookingInfo)
                    } else {
                        throw ("Spot unavailable at requested time.");
                    }
                } else {
                    throw ("Spot does not exist.");
                }
            } catch (error) {
                console.log(error);
                res.status(422).json(error)
            }
        })
    } else {
        res.status(302).json('Not logged in.')
    }
})

app.get('/myspots', async (req, res) => {
    const { authToken } = req.cookies
    if (authToken) {
        jwt.verify(authToken, jwtKey, {}, async (err, jwtResponse) => {
            try {
                if (err) throw err;
                const spots = await Spots.find({owner: jwtResponse._id});
                res.json(spots)
            } catch (error) {
                console.log(error);
                res.status(422).json(error.message)
            }
        })
    } else {
        res.status(302).json('not logged in')
    }
})

app.get('/reservations', async (req, res) => {
    const { authToken } = req.cookies
    console.log("reservations requested");
    if (authToken) {
        jwt.verify(authToken, jwtKey, {}, async (err, jwtResponse) => {
            try {
                if (err) throw err;
                const reservations = await Bookings.find({client: jwtResponse._id}).lean();
                console.log("reservations: ", reservations.length);
                const resInfo = await Promise.all(reservations.map(async reservation => {
                    let spotInfo = await Spots.findOne({_id: reservation.spot}).lean();
                    console.log("logging spotinfo", spotInfo);
                    return {
                        ...reservation,
                        address: spotInfo.address,
                        description: spotInfo.description,
                        phone: spotInfo.phone,
                        cost: spotInfo.price,
                    }
                }));
                res.json(resInfo)
            } catch (error) {
                console.log(error);
                res.status(422).json(error.message)
            }
        })
    } else {
        res.status(302).json('not logged in')
    }
})

async function logSpots() {
    const data = await Spots.find({});
    console.log(data);
}
// logSpots()

