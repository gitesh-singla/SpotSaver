const Spots = require("../models/Spots");
const calculateDistance = require("../utils/calculateDistance");
const checkAvailability = require("../utils/checkAvailability");
const errorLogger = require("../utils/errorLogger");

const getListings = async (req, res) => {
    try {
        const { lon, lat, city, startTime, endTime } = req.query;
        if (startTime >= endTime) throw ("Invalid Time Range.");
        const allSpots = await Spots.find({ city: city }).lean()
        let spots = await Promise.all(allSpots.map(async spot => {
            const available = await checkAvailability(spot._id, spot.slots, spot.status,  startTime, endTime);
            return {
                ...spot,
                distance: calculateDistance(lat, lon, spot.location.lat, spot.location.lon).toFixed(2),
                available,
            }
        }));
        spots = spots.filter(spot => spot.available)
        res.json(spots)
    } catch (error) {
        console.log(error);
        const errorLog = `At route ${req.url} ${error}`;
        errorLogger(errorLog);
        res.status(402).json(error);
    }
}

module.exports = getListings;