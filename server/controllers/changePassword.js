const Users = require("../models/Users");
const bcrypt = require('bcrypt');
const bcryptSalt = bcrypt.genSaltSync(10)

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const {jwtResponse} = req;

    try {
        const userExists = await Users.findById(jwtResponse._id);

        if (userExists) {
            const passwordValid = bcrypt.compareSync(oldPassword, userExists.password);

            if (passwordValid) {
                userExists.password = bcrypt.hashSync(newPassword, bcryptSalt);
                await userExists.save();
                res.cookie('authToken', '').send("password changed");
            } else {
                throw ("incorrect password");
            }
        } else {
            throw ("user not found");
        }
    } catch (error) {
        console.log(error, "in changePassword");
        res.status(400).send(error);
    }
}

module.exports = changePassword;