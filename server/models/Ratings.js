const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const ratingSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    spot: {type: mongoose.Schema.Types.ObjectId, ref: 'spots', required: true},
    booking: {type: mongoose.Schema.Types.ObjectId, ref: 'bookings', required: true},
    name: {type: String, required: true},
    review: {type: String},
    rating: {type: Number, required: true},
    createdAt: {type: Date, required: true},
})

const Ratings = mongoose.model('ratings', ratingSchema);

module.exports =  Ratings;