const Bookings = require("../models/Bookings");
const errorLogger = require("../utils/errorLogger");

const cancelReservation = async (req, res) => {
    const { bookingID } = req.query;
    const { jwtResponse } = req;

    try {
        const booking = await Bookings.findById(bookingID);

        if (booking.status != "active") throw ("Cannot be cancelled. Booking already cancelled/completed.");
        if  (booking.client != jwtResponse._id ) throw ("Invalid User");
        booking.status = "cancelled";
        await booking.save();
        
        res.send("Booking Cancelled");
    } catch (error) {
        console.log(error, "in cancelReservation");
        const errorLog = `At route ${req.url} ${error}`;
        errorLogger(errorLog);
        res.status(400).send(error);
    }
}

module.exports = cancelReservation;