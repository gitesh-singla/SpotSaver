const Spots = require("../models/Spots");

const editSpot = async (req, res) => {
    const {jwtResponse} = req;
    const {spotID} = req.query;
    const {price ,slots, startTiming, endTiming, status} = req.body;

    try {
        const spot = await Spots.findById(spotID);
        if(!spot) throw ("Spot not found");
        if(spot.owner != jwtResponse._id) throw ("Invalid Owner");
        if(startTiming >= endTiming) throw ("Invalid Data");

        spot.price = price;
        spot.slots = slots;
        spot.status = status;
        spot.startTiming = startTiming;
        spot.endTiming = endTiming;
        spot.updatedAt = new Date();
        await spot.save();

        res.send("Spot Updated.");
    } catch(error){
        console.log(error, "in editSpot");
        res.status(400).send(error);
    }
}

module.exports = editSpot;