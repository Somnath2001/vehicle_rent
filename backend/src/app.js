require("dotenv").config();
require("./db/connection");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const carRoute = require("./route/cars");
const session = require("express-session");
const morgan = require("morgan");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
app.use(
  cors({
    // origin: process.env.ACCESS_ORIGIN,
    // credentials: true,
  })
);
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", carRoute);

app.get("/", (req, res) => {
  res.status(200).send("Server is running 🙂");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
