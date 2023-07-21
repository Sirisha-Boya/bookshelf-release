const express = require("express");
const router = express.Router();

const NewUser = require("../models/NewUser");

router.post("/register", async (req, res) => {
  const { username, userid, email, password } = req.body;
  try {
    // Create a new user object
    const newUser = new NewUser({ username, userid, email, password });

    // Save the user to the database
    await newUser.save();

    res
      .status(200)
      .json({ message: "User registered successfully", status: 200 });
  } catch (error) {
    if (error.code === 11000 && error.name === "MongoServerError") {
      // Duplicate key error occurred
      const errorMessage = `The email address '${email}' already registered. Please login!.`;
      res.status(200).json({ error: errorMessage });
    } else {
      // Handle other errors
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await NewUser.find();

    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user based on the provided email
    const user = await NewUser.findOne({ email });
    console.log("email", user.email);
    console.log("user", user);
    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        message: "Account doesn't exist! Please register!",
        status: 404,
      });
    }

    // Validate the password
    //const isPasswordValid = user.password === password;

    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", status: 401 });
    }
    const userDetails = {
      id: user.userid,
      name: user.username,
      email: user.email,
    };
      res.json({ message: "Login successful", status: 200, data: userDetails });
   
    // User login successful
    // You can generate and send a token for authentication or handle the login response in your desired way
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
});

router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user data
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
