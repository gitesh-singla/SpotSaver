const fs = require ("fs");
const {format} = require('date-fns');
const path = require("path");

async function requestLogger (req, res, next) {
    const timestamp = `${format(new Date(), 'dd-MM-yyyy\tHH:mm:ss')}`;
    const logMessage = `${timestamp}\tRequest at ${req.url}\n`;
    
    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            fs.mkdirSync(path.join(__dirname, '..', 'logs'));
        }

        fs.appendFileSync(path.join(__dirname, "..", "logs", "requestLog.txt"), logMessage);
    } catch(error){
        res.status(400).send("Some error occured");
        console.log(error);
    }
    next();
}

module.exports = requestLogger;