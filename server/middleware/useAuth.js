const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_KEY
const User = require('../models/Users')

const useAuth = (req, res, next) => {
    const { authToken } = req.cookies;
    if (authToken) {
        jwt.verify(authToken, jwtKey, {}, async (err, jwtResponse) => {
            try {
                if (err) throw err;
                const userExists = await User.findOne({_id: jwtResponse._id});
                if(!userExists) throw "User does not exist.";
                req.jwtResponse = jwtResponse;
                next();
            } catch (error) {
                console.log(error);
                res.status(422).json(error)
            }
        })
    } else {
        res.status(302).json('not logged in')
    }
}

module.exports = useAuth;