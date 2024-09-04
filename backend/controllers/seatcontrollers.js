const Seat = require('../models/Seat'); // Adjust the path as necessary

// Create a new seat reservation for user
exports.createSeatReservation = async (req, res) => {
    try {
        const { user_id, schedule_id, seat_id } = req.body;
        const newSeat = new Seat({
            user_id,
            schedule_id,
            seat_id
        });
        const savedSeat = await newSeat.save();
        res.status(201).json(savedSeat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create seat reservation' });
    }
};

// Get all seat reservations for a specific schedule for booking page (user)
exports.getAllSeatReservations_forbooking = async (req, res) => {
    try {
        const { id } = req.params;
        const seats = await Seat.find({ schedule_id: id }).populate('user_id schedule_id');
        res.status(200).json(seats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve seat reservations' });
    }
};


// Get a specific seat reservation by seat ID for 
exports.getSeatReservationById = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id).populate('user_id schedule_id');
        if (!seat) {
            return res.status(404).json({ error: 'Seat reservation not found' });
        }
        res.status(200).json(seat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve seat reservation' });
    }
};



// Delete a seat reservation by ID
// Delete all seat reservations for a given schedule_id for admin
exports.deleteSeatReservationsByScheduleId = async (req, res) => {
    try {
      const { schedule_id } = req.params;
  
      // Validate schedule_id
      if (!schedule_id) {
        return res.status(400).json({ message: 'Schedule ID is required' });
      }
  
      // Delete all seat reservations for the specified schedule_id
      const result = await Seat.deleteMany({ schedule_id });
  
      // Check if any documents were deleted
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'No seat reservations found for the provided schedule ID' });
      }
  
      // Respond with success
      res.status(200).json({ message: 'All seat reservations for the schedule have been deleted' });
    } catch (error) {
      // Handle any errors that occurred during the deletion process
      console.error('Error deleting seat reservations:', error);
      res.status(500).json({ message: 'An error occurred while deleting seat reservations' });
    }
  };

//cancel seats using seat id for booking cancellation
exports.seatsCancel = async (req, res) => {
    try {
        // Extract seat ID from URL parameters
        const seatId = req.params.id;

        // Find and delete the seat from the database
        const result = await Seat.findByIdAndDelete(seatId);

        // Check if the seat was found and deleted
        if (!result) {
            return res.status(404).json({ message: 'Seat not found' });
        }

        // Successfully deleted
        res.status(200).json({ message: 'Seat canceled successfully', data: result });
    } catch (error) {
        // Handle any errors
        console.error('Error deleting seat:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
