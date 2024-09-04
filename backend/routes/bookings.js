const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingcontroller');
const auth = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Create a new booking (protected by authentication)
// Assuming any authenticated user can create a booking
router.post('/add',auth, authorize(['user']), bookingController.createBooking);

// Get all bookings (protected by authentication and authorization)
// Depending on the requirement, you may want to restrict access
router.get('/mybooking/:userId', auth, authorize(['user']), bookingController.getBookings);

// Get booking by schedule ID (protected by authentication)
router.get('/:id', auth, authorize(['admin']), bookingController.getBookingByScheduleId);


// Delete booking by ID (protected by authentication)
// Ensures that only the user who created the booking can delete it
router.delete('/:schedule_id',bookingController.deleteBookingsByScheduleId);


// //cancel booking from user using booking id
router.delete('/cancel/:_id',bookingController.CancelBooking);


module.exports = router;
