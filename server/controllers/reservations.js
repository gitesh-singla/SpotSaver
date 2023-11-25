const Bookings = require("../models/Bookings");
const Spots = require("../models/Spots");

const reservations = async (req, res) => {
    const { jwtResponse } = req;
    try {
        const reservations = await Bookings.find({ client: jwtResponse._id }).lean();
        const resInfo = await Promise.all(reservations.map(async reservation => {
            let spotInfo = await Spots.findOne({ _id: reservation.spot }).lean();
            return {
                ...reservation,
                address: spotInfo.address,
                description: spotInfo.description,
                phone: spotInfo.phone,
                cost: spotInfo.price,
            }
        }));
        res.json(resInfo)
    } catch (error) {
        console.log(error);
        res.status(422).json(error.message)
    }
}

module.exports = reservations;