const Ratings = require("../models/Ratings");

const getReviews = async (req, res) => {
    const { id: spot_id } = req.query;
    try {
        const ratings = await Ratings.find({ spot: spot_id });
        res.json(ratings);
    } catch (error) {
        console.log(error, "in getReviews");
        res.status(400).json(error);
    }
}

module.exports = getReviews;