const Spots = require("../models/Spots");
const Bookings = require("../models/Bookings");
const checkAvailability = require("../utils/checkAvailability");
const errorLogger = require("../utils/errorLogger");


const book = async (req, res) => {
    const { spot, start, end, amount } = req.body;
    const { jwtResponse } = req;
    try {
        if (!spot || !start || !end || new Date(start) >= new Date(end)) {
            throw ("Invalid request");
        }
        if (new Date(start) > new Date().setDate(new Date().getDate() + 6) || new Date(start) < new Date()) {
            throw ("Invalid request");
        }
        const spotExists = await Spots.findOne({ _id: spot });
        if (spotExists) {
            const { slots, status, price } = spotExists;
            const calculatedAmount = price * Math.abs(new Date(end).getHours() - new Date(start).getHours());
            if (calculatedAmount != amount) throw "Invalid amount, request tampered";
            const available = await checkAvailability(spot, slots, status, start, end);
            if (available) {
                await Bookings.create({
                    spot,
                    createdAt: new Date(),
                    client: jwtResponse._id,
                    status: "active",
                    start,
                    end,
                    amount,
                    reviewed: false,
                })
                res.send("Success")
            } else {
                throw ("Spot unavailable at requested time.");
            }
        } else {
            throw ("Spot does not exist.");
        }
    } catch (error) {
        console.log(error);
        const errorLog = `At route ${req.url} ${error}`;
        errorLogger(errorLog);
        res.status(422).json(error)
    }
}

module.exports = book;