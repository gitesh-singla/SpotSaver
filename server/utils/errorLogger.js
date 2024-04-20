const fs = require ("fs");
const {format} = require('date-fns');
const path = require("path");

async function errorLogger (message) {
    const timestamp = `${format(new Date(), 'dd-MM-yyyy\tHH:mm:ss')}`;
    const logMessage = `${timestamp}\t${message}\n`;
    
    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            fs.mkdirSync(path.join(__dirname, '..', 'logs'));
        }

        fs.appendFileSync(path.join(__dirname, "..", "logs", "errorLog.txt"), logMessage);
    } catch(error){
        console.log(error);
    }
}

module.exports = errorLogger;