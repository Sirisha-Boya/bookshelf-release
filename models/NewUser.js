const mongoose = require("mongoose");

const RegisterUser = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
  },
  username: {
    type: String,
  },
});

const NewUser = mongoose.model("users", RegisterUser);

module.exports = NewUser;
