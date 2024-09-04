const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // Import path module

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded bodies

const mongoURI = process.env.MONGODB_URI;

//Connect MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// // Import routes
const users = require("./routes/users");
const admins = require("./routes/admins");
const bookings = require("./routes/bookings");
const films = require("./routes/films");
const schedules = require("./routes/schedules");
const seats = require("./routes/seats");


// Use routes
app.use("/api/users", users);
app.use("/api/admins", admins);
app.use("/api/bookings", bookings);
app.use("/api/films", films);
app.use("/api/schedules", schedules);
app.use('/api/seats', seats);

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
