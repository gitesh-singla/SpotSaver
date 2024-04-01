const {Schema, default: mongoose} = require('mongoose');

const spotSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, required: true,  ref: 'users' },
    price: {type: Number, min: 1, required: true},
    phone: {type: String, match: /^\d+$/, required: true},
    address: {type: String, match: /[a-zA-Z]/, required: true},
    location: {
        lat: {type: Number, required: true},
        lon: {type: Number, required: true}
    },
    city: {type: String, match: /[a-zA-Z]/, required: true},
    type: {type: String, enum: ['small', 'big', 'heavy'], required: true},
    slots: {type: Number, min: 1, required: true},
    status: {type: String, enum: ['active', 'disabled'], required: true},
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