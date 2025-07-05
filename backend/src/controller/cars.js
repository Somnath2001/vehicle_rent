const mongoose = require("mongoose");
const { Vehicle, Booking } = require("../model/cars");

exports.getVehicles = async (req, res) => {
  const { type } = req.params;

  try {
    // const vehicles = await Vehicle.find({ type });
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    console.error("Error getting vehicles:", error);
    res.status(500).send("Error getting vehicles");
  }
};

exports.createBookings = async (req, res) => {
  const {
    firstName,
    lastName,
    wheels,
    vehicleType,
    vehicleModel,
    startDate,
    endDate,
  } = req.body;

  // Check if vehicle is available during the booking period
  try {
    const existingBooking = await Booking.findOne({
      vehicleType,
      vehicleModel,
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });

    if (existingBooking) {
      res
        .status(400)
        .send("Vehicle is already booked during the selected dates");
      return;
    }
  } catch (error) {
    console.error("Error checking existing bookings:", error);
    res.status(500).send("Error checking existing bookings");
    return;
  }

  // Create new booking
  const booking = new Booking({
    firstName,
    lastName,
    wheels,
    vehicleType,
    vehicleModel,
    startDate,
    endDate,
  });

  try {
    await booking.save();
    res.send("Booking Successful");
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).send("Error creating booking");
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve bookings." });
  }
};
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking." });
  }
};
