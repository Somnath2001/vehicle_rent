const express = require("express");
const router = express.Router();
const {
  getVehicles,
  createBookings,
  getBookings,
  updateBooking,
} = require("../controller/cars");

router.get("/vehicles", getVehicles);

// router.get("/vehicles/:type", getVehicles);

router.post("/bookings", createBookings);

router.get("/bookings", getBookings);

router.put("/bookings/:id", updateBooking);

module.exports = router;
