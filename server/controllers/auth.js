const Users = require('../models/Users')

const auth = async (req, res) => {
    const { jwtResponse } = req;
    try {
        const { name, email, _id, phone } = await Users.findById(jwtResponse._id)
        res.json({ name, email, _id, phone });
    } catch (error) {
        console.log(error)
        res.status(422).json(error.message)
    }
}

module.exports = auth;