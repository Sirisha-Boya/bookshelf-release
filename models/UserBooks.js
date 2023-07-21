const mongoose = require("mongoose");

const AddBook = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  book_id: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  progress: {
    type: Number,
    default: 0,
  },
  created_on: {
    type: Date,
  },
  created_by: {
    type: String,
  },
  updated_on: {
    type: Date,
  },
  updated_by: {
    type: String,
  },
});

const UserBooks = mongoose.model("user-books", AddBook);

module.exports = UserBooks;
