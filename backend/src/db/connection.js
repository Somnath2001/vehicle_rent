const mongoose = require("mongoose");

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection to db successful");
  })
  .catch((error) => {
    console.log(error);
  });
