const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const router = require("./routes/routes");
const reservationStatusScheduler = require('./utils/reservationStatusScheduler')
const requestLogger = require('./middleware/requestLogger')
const errorLogger = require('./utils/errorLogger')

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.static('uploads'))
app.use(requestLogger);
reservationStatusScheduler.start();

async function runMongo() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        app.listen('4000')
        console.log("listening in 4000")
    } catch (error) {
        console.log(error)
    }
}
runMongo();

app.use('/', router);

app.use((err, req, res, next) => {
    errorLogger(err);
})


