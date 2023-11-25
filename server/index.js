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
const distance = require('./utils/calculateDistance')
const coordinatesToCity = require('./utils/coordsToCity')
const checkAvailability = require('./utils/checkAvailability');
const router = require("./routes/routes");
const useAuth = require('./middleware/useAuth')


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

app.use('/', router)

// app.post('/addlisting', useAuth, async (req, res) => {
//     const data = req.body
//     const { jwtResponse } = req;
//     try {
//         const { _id, phone } = await Users.findById(jwtResponse._id)
//         const city = await coordinatesToCity(data.location.lat, data.location.lon)
//         if (!city) throw ('city not determined')
//         const newSpot = await Spots.create({
//             ...data,
//             city,
//             owner: _id,
//             createdAt: new Date(),
//             phone,
//         })
//         res.json(newSpot)
//     } catch (error) {
//         console.log(error);
//         res.status(422).json(error.message)
//     }
// })


// app.get('/listings', async (req, res) => {
//     try {
//         const { lon, lat, city, startTime, endTime } = req.query;
//         if (startTime >= endTime) throw ("Invalid Time Range.");
//         const allSpots = await Spots.find({ city: city }).lean()
//         let spots = await Promise.all(allSpots.map(async spot => {
//             const available = await checkAvailability(spot._id, spot.slots, startTime, endTime);
//             return {
//                 ...spot,
//                 distance: distance(lat, lon, spot.location.lat, spot.location.lon).toFixed(2),
//                 available,
//             }
//         }));
//         spots = spots.filter(spot => spot.available)
//         res.json(spots)
//     } catch (error) {
//         console.log(error);
//         res.status(402).json(error);
//     }
// })

// app.get('/listing/', async (req, res) => {
//     const { id, lat, lon } = req.query
//     try {
//         const spotData = await Spots.findOne({ _id: id }).lean()
//         const { name, phone } = await Users.findOne({ _id: spotData.owner })
//         let response = { ...spotData, name, phone }
//         if (lat != 0 && lon != 0) {
//             const origin = [lon, lat]
//             const dest = [spotData.location.lon, spotData.location.lat]
//             console.log('requesting route');
//             const { data } = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.ORS_API_KEY}&start=${origin}&end=${dest}`)
//             const { duration, distance } = data.features[0].properties.segments[0]
//             const coordinates = data.features[0].geometry.coordinates
//             response = { ...response, duration, distance, coordinates }
//         }
//         res.json(response)
//     } catch (error) {
//         res.status(422).json(error.message)
//     }
// })

// app.post('/book', useAuth,  async (req, res) => {
//     const { spot, start, end, amount } = req.body;
//     const { jwtResponse } = req;
//     try {
//         if (!spot || !start || !end || start >= end) {
//             throw ("Invalid request");
//         }
//         if (start > new Date().setDate(new Date().getDate() + 6) || start < new Date()) {
//             throw ("Invalid request");
//         }
//         const spotExists = await Spots.findOne({ _id: spot });
//         if (spotExists) {
//             const { slots } = spotExists;
//             const available = await checkAvailability(spot, slots, start, end);
//             if (available) {
//                 const bookingInfo = await Bookings.create({
//                     spot,
//                     createdAt: new Date(),
//                     client: jwtResponse._id,
//                     status: "active",
//                     start,
//                     end,
//                     amount,
//                 })
//                 res.json(bookingInfo)
//             } else {
//                 throw ("Spot unavailable at requested time.");
//             }
//         } else {
//             throw ("Spot does not exist.");
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(422).json(error)
//     }
// })

// app.get('/myspots', useAuth, async (req, res) => {
//     ;
//     const { jwtResponse } = req;
//     try {
//         const spots = await Spots.find({ owner: jwtResponse._id });
//         res.json(spots)
//     } catch (error) {
//         console.log(error);
//         res.status(422).json(error.message)
//     }
// })

// app.get('/reservations', useAuth, async (req, res) => {
//     const { jwtResponse } = req;
//     try {
//         const reservations = await Bookings.find({ client: jwtResponse._id }).lean();
//         console.log("reservations: ", reservations.length);
//         const resInfo = await Promise.all(reservations.map(async reservation => {
//             let spotInfo = await Spots.findOne({ _id: reservation.spot }).lean();
//             console.log("logging spotinfo", spotInfo);
//             return {
//                 ...reservation,
//                 address: spotInfo.address,
//                 description: spotInfo.description,
//                 phone: spotInfo.phone,
//                 cost: spotInfo.price,
//             }
//         }));
//         res.json(resInfo)
//     } catch (error) {
//         console.log(error);
//         res.status(422).json(error.message)
//     }
// })

