const Users = require('../models/Users');
const errorLogger = require('../utils/errorLogger');

const auth = async (req, res) => {
    const { jwtResponse } = req;
    try {
        const { name, email, _id, phone } = await Users.findById(jwtResponse._id)
        res.json({ name, email, _id, phone });
    } catch (error) {
        console.log(error)
        const errorLog = `At route ${req.url} ${error}`;
        errorLogger(errorLog);
        res.status(422).json(error.message)
    }
}

module.exports = auth;