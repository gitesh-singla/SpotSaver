const cron = require("node-cron");
const Bookings = require("../models/Bookings");

const reservationStatusScheduler = cron.schedule('*/5 * * * *', async () => {
    const currentTime = new Date();
    try {
        await Bookings.updateMany({start: { $lte: currentTime}, status: 'active'}, {$set: {status: "completed"}})
    } catch(error){
        console.log(error, "in reservationStatusScheduler");
    }
});
reservationStatusScheduler.stop()

module.exports = reservationStatusScheduler;
