const Spots = require("../models/Spots");
const Amenities = require("../models/Amenities");
const errorLogger = require("../utils/errorLogger");

const getAmenities = async (req, res) => {
    try {
        const { id } = req.query;

        const spot = await Spots.findOne({ _id: id });

        const { city } = spot;

        const amenitiesNearby = await Amenities.find({ city: city });

        res.json(amenitiesNearby);

    } catch (error) {
        console.log(error);
        const errorLog = `At route ${req.url} ${error}`;
        errorLogger(errorLog);
        res.status(400).json(error);
    }
}

module.exports = getAmenities;