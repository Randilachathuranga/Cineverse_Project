const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  schedule_id: {
    type: Schema.Types.ObjectId,
    ref: "Schedule",
    required: true,
  },
  seats: {
    type: [String], // Assuming seats are stored as an array of strings
    required: true,
  },
  booking_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["booked", "cancelled"],
    default: "booked",
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
