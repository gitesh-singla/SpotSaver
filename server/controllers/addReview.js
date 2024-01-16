const Ratings = require("../models/Ratings");
const Spots = require("../models/Spots");
const Bookings = require("../models/Bookings");

const addReview = async (req, res) => {
    const { jwtResponse } = req;
    const { rating, review, spot_id, reservation_id } = req.body;
    try {
        const spot = await Spots.findById(spot_id);

        if (!spot) throw ("Spot not found");
        if (!rating || !spot_id || !reservation_id) throw ("Missing information.");
        if (rating < 1 || rating > 5 || typeof rating != "number") throw ("Invalid information.");

        const reservation = await Bookings.findOne({ _id: reservation_id });
        const alreadyReviewed = reservation.reviewed;

        if (alreadyReviewed) throw ("already reviewed")
        if (reservation.client != jwtResponse._id) throw ("Invalid user")
        await addRating(spot, rating);

        await Ratings.create({
            user: jwtResponse._id,
            spot: spot_id,
            booking: reservation_id,
            name: jwtResponse.name,
            rating,
            review,
            createdAt: new Date()
        });

        reservation.reviewed = true;
        await reservation.save();

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

// const updateRating = async (spot, rating, previousRating) => {
//     const oldRating = spot.rating;
//     const oldCount = spot.ratingCount;
//     const totalRating = oldRating * oldCount - previousRating + rating;
//     const newRating = totalRating / oldCount;
//     await Spots.updateOne({ _id: spot._id }, { $set: { rating: newRating.toFixed(1) } })
// }

module.exports = addReview;