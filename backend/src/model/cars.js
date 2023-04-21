const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  type: { type: String, required: true },
  model: { type: String, required: true },
  available: { type: Boolean, default: true },
});

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  wheels: { type: Number, required: true },
  vehicleType: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
const Booking = mongoose.model("Booking", bookingSchema);

// Seed initial data
const seedData = async () => {
  const vehicles = [
    { type: "car", model: "hatchback", available: true },
    { type: "car", model: "suv", available: true },
    { type: "car", model: "sedan", available: true },
    { type: "bike", model: "cruiser", available: true },
    { type: "bike", model: "sports", available: true },
  ];

  try {
    await Vehicle.deleteMany();
    await Vehicle.insertMany(vehicles);
    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seedData();

module.exports = { Vehicle, Booking };
