const Users = require("../models/Users");
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_KEY


const editUser = async (req, res) => {
    const { name, phone } = req.body;
    const {jwtResponse} = req;

    try {
        const editedUser = await Users.findOneAndUpdate({ _id: jwtResponse._id }, { $set: { name: name, phone: phone } }, { new: true });

        jwt.sign(
            { email: editedUser.email, _id: editedUser._id, name: editedUser.name },
            jwtKey,
            {},
            (error, token) => {
                if (error) throw error;
                const { email, _id } = editedUser;
                res.cookie("authToken", token).json({ name, email, _id, phone });
            }
        );
    } catch (error) {
        console.log(error, "in editUser");
        res.status(400).send(error);
    }
}

module.exports = editUser;