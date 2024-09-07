const Payment = require("../models/Payment");
const Stripe = require("stripe");
const stripe = Stripe("sk_test_51PwJDWJYBSF1viQyLoUJ2zxyfRqNEZGZl62hN1A7KJ0KrmmysjBisSp2bHk2q6220Y6GyG5xW3EBAfQR0wXKwvda00oor2fH5O");

// Create Payment Intent and store initial payment record
// exports.createPaymentIntent = async (req, res) => {
//   const { amount, userId, bookingId } = req.body;

//   try {
//     // Create a Stripe Payment Intent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount, // Amount in cents
//       currency: "usd",
//       payment_method_types: ["card"],
//     });

//     // Create a new Payment record in MongoDB
//     const payment = new Payment({
//       user_id: userId,
//       amount: amount,
//       status: "pending", // Initial status: pending
//       transaction_id: paymentIntent.id,
//       booking_id: bookingId,
//     });

//     await payment.save(); // Save the payment record to MongoDB

//     res.status(200).send({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// Update Payment Status after payment
// exports.updatePaymentStatus = async (req, res) => {
//   const { paymentIntentId, status } = req.body;

//   try {
//     // Update the payment status in MongoDB
//     const payment = await Payment.findOneAndUpdate(
//       { transaction_id: paymentIntentId },
//       { status: status },
//       { new: true }
//     );

//     if (!payment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }

//     res.status(200).json({ message: "Payment status updated successfully", payment });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Retrieve Payment Details
// exports.getPaymentDetails = async (req, res) => {
//   const { paymentId } = req.params;

//   try {
//     const payment = await Payment.findById(paymentId).populate("user_id booking_id");

//     if (!payment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }

//     res.status(200).json(payment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Backend Controller
exports.createPaymentIntent = async (req, res) => {
  const { amount, userId, bookingId } = req.body;

  try {
    // Create a Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Create a new Payment record in MongoDB
    const payment = new Payment({
      user_id: userId,
      amount: amount,
      status: "pending", // Initial status: pending
      transaction_id: paymentIntent.id,
      booking_id: bookingId,
    });

    await payment.save(); // Save the payment record to MongoDB

    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error.message); // Log the error for debugging
    res.status(500).json({ error: error.message }); // Respond with error details
  }
};

