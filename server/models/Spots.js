const {Schema, default: mongoose} = require('mongoose');

const spotSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, required: true,  ref: 'users' },
    price: {type: Number, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    location: {
        lat: {type: Number, required: true},
        lon: {type: Number, required: true}
    },
    city: {type: String, required: true},
    type: {type: String, required: true},
    slots: {type: Number, required: true},
    status: {type: String, required: true},
    startTiming: {type: Date, required: true},
    endTiming: {type: Date, required: true},
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date},
    images: {type: [String], required: true},
    currentBookings: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'bookings' }], required: true},
    description: String,
    ratingCount: {type: Number, required: true},
    rating: {type: Number, required: true}
});

const SpotModel = mongoose.model('spots', spotSchema);

module.exports = SpotModel;