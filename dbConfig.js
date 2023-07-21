const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();
const CONSTANTS = require("./Constants.json");
const connectDB = async () => {
  try {
    const mongoURI = CONSTANTS.MONGO_URI;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB!!");
  } catch (err) {
    console.error("DB connection error: ", err);
    process.exit(1);
  }
};
module.exports = connectDB;
