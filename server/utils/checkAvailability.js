const Bookings = require("../models/Bookings");
const Spots = require("../models/Spots");

async function checkAvailability(spot, slots, start, end) {
    const {startTiming, endTiming} = await Spots.findById(spot);

    if (start >= end) return false;
    let startAdjusted = new Date(startTiming);
    startAdjusted.setHours(new Date(start).getHours());
    let endAdjusted = new Date(startTiming);
    endAdjusted.setHours(new Date(end).getHours());

    if(startAdjusted < startTiming || endAdjusted > endTiming){
        return false;
    }
    const booked = await Bookings.find({
        spot: spot,
        start: { $lt: end },
        end: { $gt: start }
    })
    // console.log(booked.length, slots);
    if (booked.length >= slots) return false;
    return true;
}

module.exports = checkAvailability;