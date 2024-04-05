const Spots = require("../models/Spots");
const Amenities = require("../models/Amenities");

const getAmenities = async (req, res) => {
    try {
        const { id } = req.query;

        const spot = await Spots.findOne({ _id: id });

        const { city } = spot;

        const amenitiesNearby = await Amenities.find({ city: city });

        res.json(amenitiesNearby);

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = getAmenities;