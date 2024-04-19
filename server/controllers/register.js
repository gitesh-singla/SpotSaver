const bcrypt = require('bcrypt')
const Users = require('../models/Users')
const errorLogger = require('../utils/errorLogger')
const bcryptSalt = bcrypt.genSaltSync(10)

const register = async (req, res) => {
    const { name, email, phone, password } = req.body
    try {
        const userExists = await Users.findOne({ email: email })
        if (!userExists) {
            const newUser = await Users.create({
                name,
                email,
                phone,
                password: bcrypt.hashSync(password, bcryptSalt),
            })
            console.log(newUser);
            res.json(newUser)
        } else {
            res.status(422).json('User already Registered')
        }
    } catch (error) {
        console.log(error);
        const errorLog = `At route ${req.url} ${error}`;
        errorLogger(errorLog);
        res.status(422).json(error)
    }
}

module.exports = register;