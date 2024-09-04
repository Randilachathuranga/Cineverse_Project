const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatcontrollers'); // Adjust the path as necessary
const auth = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Route to create a new seat reservation
router.post('/add',auth, authorize(['user']), seatController.createSeatReservation);

//get all seat reservations for create booking page
router.get('/allseats/:id' , seatController.getAllSeatReservations_forbooking);

// Route to get a specific seat reservation by ID
router.get('/myseats/:id',auth, authorize(['user']), seatController.getSeatReservationById);

// Route to delete a seat reservation by ID
router.delete('/:schedule_id', seatController.deleteSeatReservationsByScheduleId);

// cancel seats for users when user cancel the booing
router.delete('/allseats/:id',seatController.seatsCancel)



module.exports = router;
