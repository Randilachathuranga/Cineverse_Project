const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  payment_date: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "succeeded", "failed"], required: true },
  transaction_id: { type: String, required: true },
});

module.exports = mongoose.model("Payment", paymentSchema);
