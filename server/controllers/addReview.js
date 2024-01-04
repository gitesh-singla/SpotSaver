const Ratings = require("../models/Ratings");
const Spots = require("../models/Spots");

const addReview = async (req, res) => {
    const { jwtResponse } = req;
    const { rating, review, spot_id } = req.body;
    try {
        const spot = await Spots.findById(spot_id);

        if (!spot) throw ("Spot not found");
        if (!rating || !spot_id) throw ("Missing information.");
        if (rating < 1 || rating > 5 || typeof rating != "number") throw ("Invalid information.");

        const alreadyReviewed = await Ratings.findOne({ spot: spot_id });
        if (alreadyReviewed) {
            await Ratings.deleteOne({ user: jwtResponse._id });
            const previousRating = alreadyReviewed.rating;
            await updateRating(spot, rating, previousRating);
        } else await addRating(spot, rating);

        await Ratings.create({
            user: jwtResponse._id,
            spot: spot_id,
            name: jwtResponse.name,
            rating,
            review,
            createdAt: new Date()
        });
        res.json("Review added.");
    } catch (error) {
        console.log(error, "in addreview");
        res.status(400).json(error);
    }
}

const addRating = async (spot, rating) => {
    const oldRating = spot.rating;
    const oldCount = spot.ratingCount;
    const totalRating = oldRating * oldCount + rating;
    const newCount = oldCount + 1;
    const newRating = totalRating / newCount;
    await Spots.updateOne({ _id: spot._id }, { $set: { rating: newRating, ratingCount: newCount.toFixed(1) } })

}

const updateRating = async (spot, rating, previousRating) => {
    const oldRating = spot.rating;
    const oldCount = spot.ratingCount;
    const totalRating = oldRating * oldCount - previousRating + rating;
    const newRating = totalRating / oldCount;
    await Spots.updateOne({ _id: spot._id }, { $set: { rating: newRating.toFixed(1) } })
}
module.exports = addReview;