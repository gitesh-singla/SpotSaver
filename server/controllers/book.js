const Spots = require("../models/Spots");
const Bookings = require("../models/Bookings");
const checkAvailability = require("../utils/checkAvailability");


const book = async (req, res) => {
    const { spot, start, end, amount } = req.body;
    const { jwtResponse } = req;
    try {
        if (!spot || !start || !end || start >= end) {
            throw ("Invalid request");
        }
        if (start > new Date().setDate(new Date().getDate() + 6) || start < new Date()) {
            throw ("Invalid request");
        }
        const spotExists = await Spots.findOne({ _id: spot });
        if (spotExists) {
            const { slots } = spotExists;
            const available = await checkAvailability(spot, slots, start, end);
            if (available) {
                const bookingInfo = await Bookings.create({
                    spot,
                    createdAt: new Date(),
                    client: jwtResponse._id,
                    status: "active",
                    start,
                    end,
                    amount,
                })
                res.json(bookingInfo)
            } else {
                throw ("Spot unavailable at requested time.");
            }
        } else {
            throw ("Spot does not exist.");
        }
    } catch (error) {
        console.log(error);
        res.status(422).json(error)
    }
}

module.exports = book;