const { Schema, default: mongoose, mongo } = require("mongoose");

const bookingSchema = new Schema({
    spot: {type: mongoose.Schema.Types.ObjectId, ref: 'spots', required: true},
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    createdAt: {type: Date, required: true},
    status: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    amount: {type: Number, required: true},
    reviewed: {type: Boolean, required: true},
});

const BookingModel = mongoose.model('bookings', bookingSchema);

module.exports = BookingModel;