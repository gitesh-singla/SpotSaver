const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_KEY

const useAuth = (req, res, next) => {
    const { authToken } = req.cookies;
    if (authToken) {
        jwt.verify(authToken, jwtKey, {}, async (err, jwtResponse) => {
            try {
                if (err) throw err;
                req.jwtResponse = jwtResponse;
                next();
            } catch (error) {
                console.log(error);
                res.status(422).json(error.message)
            }
        })
    } else {
        res.status(302).json('not logged in')
    }
}

module.exports = useAuth;