const Spots = require("../models/Spots");

const deleteSpot = async (req, res) => {
    const {jwtResponse} = req;
    const {spotID} = req.query;

    try {
        const spot = await Spots.findById(spotID);
        if(!spot) throw ("Spot not found");
        if(spot.owner != jwtResponse._id) throw ("Invalid Owner");
        await Spots.deleteOne({_id: spotID});
        
        res.send("Spot Deleted");
    } catch(error){
        console.log(error, "in editSpot");
        res.status(400).send(error);
    }
}

module.exports = deleteSpot;