const Users = require("../models/Users");
const Spots = require("../models/Spots");
const coordinatesToCity = require("../utils/coordsToCity");
const path = require("path")
const fsPromises = require('fs').promises


const addListing = async (req, res) => {
    const data = req.body
    const { jwtResponse } = req;
    try {
        const { _id, phone } = await Users.findById(jwtResponse._id)
        data.location = JSON.parse(data.location);
        if(data.startTiming >= data.endTiming) throw ("Invaild Active Times");
        const images = req.files.map((file) => file.filename);
        const city = await coordinatesToCity(data.location.lat, data.location.lon)
        if (!city) throw ('city not determined')
        await Spots.create({
            ...data,
            city,
            owner: _id,
            createdAt: new Date(),
            phone,
            images,
        })
        res.json("Listing Added")
    } catch (error) {
        console.log(error);
        try {
            cleanupFiles(req);
          } catch (cleanupError) {
            console.error('Error during file cleanup:', cleanupError);
          }
      
          res.status(500).json(error);
    }
}

const cleanupFiles =  async (req) => {
    // Retrieve the list of files to delete
    imagesToDelete = req.files.map((file) => file.filename);
    // Delete the files asynchronously
    await Promise.all(
      imagesToDelete.map(async (fileName) => {
        // Adjust this code based on where your files are stored (memory or disk)
        // For example, if using disk storage, you might have files stored in the 'uploads' directory
        const filePath = path.join(__dirname, '..', 'uploads', 'spot-images', fileName);
        await fsPromises.unlink(filePath);
      })
    );
}

module.exports = addListing;