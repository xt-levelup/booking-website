const express = require("express");

const router = express.Router();

const bookingControllers = require("../controllers/booking");

// Lấy thông tin các hotels
router.get("/get-hotels", bookingControllers.getHotels);

// Lấy thông tin các rooms
router.get("/get-rooms", bookingControllers.getRooms);

// Post thông tin search
router.post("/post-search", bookingControllers.postSearch);

//Post reserve
router.post("/reserve", bookingControllers.reserve);

module.exports = router;
