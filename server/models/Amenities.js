const {Schema, default: mongoose} = require ('mongoose');

const amenitiesSchema = new Schema({
    name: {type: String, match: /[a-zA-Z]/, required: true},
    type: {type: String, enum: ["food", "daycare", "gas", 'hotel'], required: true},
    location: {
        lat: {type: Number, required: true},
        lon: {type: Number, required: true}
    },
    city: {type: String, match: /[a-zA-Z]/, required: true},
})

const Amenities = mongoose.model('amenities', amenitiesSchema);

module.exports = Amenities;