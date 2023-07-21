const express = require("express");
const router = express.Router();

const NewUser = require("../models/NewUser");
const UserBooks = require("../models/UserBooks");
const BookList = require("../models/BookList");

router.post("/addbook/:userid/:bookid", async (req, res) => {
  const { userid, bookid } = req.params;

  try {
    // Check if the user exists
    //let user_id = userid;
    const userExists = await NewUser.find({ userid: userid });
    if (!userExists) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }

    // Check if the book exists
    //let id = book_id;
    const bookExists = await BookList.find({ book_id: bookid });
    if (!bookExists) {
      return res.status(404).json({ message: "Book not found", status: 404 });
    }

    // Create a new reading list entry
    const readingListEntry = new UserBooks({
      user_id: userid,
      book_id: bookid,
      progress: 0,
      status: 0,
      created_on: new Date(),
      created_by: userid,
    });
    console.log("obj", readingListEntry);

    // Save the reading list entry
    await readingListEntry.save();

    res
      .status(200)
      .json({ message: "Book added to Bookshelf successfully", status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
});

router.put("/updateBookProgress/:userid/:bookid", async (req, res) => {
  const userId = req.params.userid;
  const bookId = req.params.bookid;
  const { bookprogress, status } = req.body;
  try {
    // Check if the book exists
    const user = await NewUser.findOne({ userid: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const book = await UserBooks.findOne({ book_id: bookId });
    console.log("bookexists?", book);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    } else {
      // Update the progress
      book.progress = bookprogress;
      book.status = status;

      // Save the changes to the database or storage
      await book.save();
      return res.json({
        message: "Book status updated!",
        status: 200,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to update book progress" });
  }
});

router.get("/books", async (req, res) => {
  try {
    const books = await BookList.find();

    res.json(books);
    //console.log("books", books);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
});

router.get("/bookshelfbooksstatus/:userId/:bookStatus", async (req, res) => {
  const userId = req.params.userId;
  const bookStatus = req.params.bookStatus;

  try {
    // Retrieve all book IDs added by the user from the addbook collection
    const userBooks = await UserBooks.find({
      user_id: userId,
      status: bookStatus,
    });
    const bookProgress = userBooks.map((book) => ({
      bookId: book.book_id,
      progress: book.progress,
    }));
    console.log("book progress", bookProgress);
    // Extract book IDs from the userBooks
    const bookIds = userBooks.map((book) => book.book_id);
    console.log("api bookIds", bookIds);
    // Retrieve book information based on the book IDs from the booklist collection
    const books = await BookList.find({ id: bookIds });
    console.log("books", books);
    if (books.length > 0) {
      res.json({ books, bookProgress });
    } else if (books.length === 0) {
      res.status(404).json({ message: "No Books found!", status: 404 });
    } else {
      res.json({ message: "Unknown error!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving books.",
      status: 500,
    });
  }
});

// router.get("/bookshelfBooks/:bookid/:userid", (req, res) => {
//   const bookId = req.params.bookid;
//   const userId = req.params.userid;
//   const book = UserBooks.find({ book_id: bookId });

//   if (!book) {
//     return res.status(404).json({ message: "Book not found", status: 404 });
//   }
//   const user = NewUser.find({ user_id: userId });

//   if (!user) {
//     return res.status(404).json({ message: "User not found", status: 404 });
//   }

//    res.json({ book, status: 200 });
// });

module.exports = router;
