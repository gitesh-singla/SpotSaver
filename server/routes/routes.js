const express = require("express");
const login = require("../controllers/login");
const auth = require("../controllers/auth");
const logout = require("../controllers/logout");
const register = require("../controllers/register");
const addlisting = require("../controllers/addListing");
const getListings = require("../controllers/getListings");
const getSpot = require("../controllers/getSpot");
const book = require("../controllers/book");
const mySpots = require("../controllers/mySpots");
const reservations = require("../controllers/reservations");
const useAuth = require("../middleware/useAuth");
const router = express.Router();


router.post("/login", login);
router.post("/register", register);
router.get("/auth", useAuth, auth);
router.post("/logout", logout);
router.post("/addlisting", useAuth, addlisting);
router.get("/listings", getListings);
router.get("/listing/", getSpot);
router.post("/book", useAuth, book);
router.get("/myspots", useAuth, mySpots);
router.get("/reservations", useAuth, reservations);

module.exports = router;