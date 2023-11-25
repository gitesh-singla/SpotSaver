const axios = require("axios");
const Spots = require("../models/Spots");
const Users = require("../models/Users");

const getSpot = async (req, res) => {
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
}

module.exports = getSpot;