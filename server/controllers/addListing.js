const Users = require("../models/Users");
const Spots = require("../models/Spots");

const addListing = async (req, res) => {
    const data = req.body
    const { jwtResponse } = req;
    try {
        const { _id, phone } = await Users.findById(jwtResponse._id)
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
}

module.exports = addListing;