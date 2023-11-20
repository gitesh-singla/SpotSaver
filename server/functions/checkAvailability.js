const Bookings = require("../models/Bookings");

async function checkAvailability(spot, slots, start, end){
    if(start >= end) return false;
    const booked = await Bookings.find({
        spot: spot,
        start: {$lt: end },
        end: {$gt: start }
    })
    console.log(booked.length, slots);
    if(booked.length >= slots) return false;
    return true;
}

module.exports = checkAvailability;