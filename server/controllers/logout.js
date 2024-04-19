const errorLogger = require("../utils/errorLogger");

const logout = (req, res) => {
    try{
        res.cookie('authToken', '').json('Logged out.');
    } catch(error) {
        const errorLog = `At route ${req.url} ${error}`;
        errorLogger(errorLog);
        res.status(400).send("error");
    }
}

module.exports = logout;