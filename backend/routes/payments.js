const express = require("express");
const paymentController = require("../controllers/paymentcontroller");
const router = express.Router();
const auth = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Route to create a payment intent
router.post("/create-payment-intent", paymentController.createPaymentIntent);

// Route to update the payment status
// router.post("/update-status",auth, authorize(['user']), paymentController.updatePaymentStatus);

// // Route to get payment details
// router.get("/:paymentId",auth, authorize(['user']), paymentController.getPaymentDetails);

module.exports = router;
