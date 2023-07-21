const mongoose = require("mongoose");

const Books = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: Array,
  },
  description: {
    type: String,
  },
  publisher: {
    type: String,
  },
  publishedDate: {
    type: Date,
  },
  pageCount: {
    type: Number,
  },
  categories: {
    type: Array,
  },
  thumbnail: {
    type: String,
  },
  averageRating: {
    type: Number,
  },
  ratingsCount: {
    type: Number,
  },
  maturityRating: {
    type: String,
  },
  language: {
    type: String,
  },
  viewability: {
    type: String,
  },
  accessViewStatus: {
    type: String,
  },
  webReaderLink: {
    type: String,
  },
  previewLink: {
    type: String,
  },
  isEbook: {
    type: Boolean,
  },
  buyLink: {
    type: String,
  },
});

const BookList = mongoose.model("books", Books);

module.exports = BookList;
