const Users = require("../models/Users");
const bcrypt = require('bcrypt');
const bcryptSalt = bcrypt.genSaltSync(10)

const changePassword = async (req, res) => {
    const { jwtResponse, oldPassword, newPassword } = req.body;

    try {
        const userExists = await Users.findById(jwtResponse._id);

        if (userExists) {
            const passwordValid = bcrypt.compareSync(oldPassword, userExists.password);

            if (passwordValid) {
                userExists.password = bcrypt.hashSync(newPassword, bcryptSalt);
                userExists.save();
                res.cookie('authToken', '').send("password changed");
            } else {
                throw ("incorrect");
            }
        } else {
            throw ("user not found");
        }
    } catch (error) {
        console.log(error, "in changePassword");
        res.status(422).send(error.message);
    }
}

module.exports = changePassword;