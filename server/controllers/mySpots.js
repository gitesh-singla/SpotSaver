const Spots = require("../models/Spots");

const mySpots = async (req, res) => {
    const { jwtResponse } = req;
    try {
        const spots = await Spots.find({ owner: jwtResponse._id });
        res.json(spots)
    } catch (error) {
        console.log(error);
        res.status(422).json(error.message)
    }
}

module.exports = mySpots;