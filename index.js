const express = require("express");
const cors = require("cors");
const connectDB = require("./dbConfig");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const CONSTANTS = require("./Constants.json");
const path = require("path");

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Mount routes
app.use("/", userRoutes);
app.use("/", bookRoutes);

const buildPath = path.join(__dirname, "./build");
app.use(express.static(buildPath));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(CONSTANTS.PORT, () => {
  console.log(`Server is running on port ${CONSTANTS.PORT}`);
});
