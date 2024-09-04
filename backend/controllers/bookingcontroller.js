const Booking = require("../models/Booking");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { user_id, hall_id, schedule_id, seats, status, booking_date } =
      req.body;

    // Create a new booking
    const booking = new Booking({
      user_id,
      hall_id,
      schedule_id,
      seats,
      status: status || "booked", // Default status if not provided
      booking_date: booking_date || Date.now(), // Default booking_date if not provided
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ msg: "Server error", error });
  }
};

// Get all bookings for a specific user
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user_id: req.params.userId })
      .populate({
        path: "schedule_id",
        populate: {
          path: "film_id", // This should match the reference field in your scheduleSchema
          model: "Film",
        },
      })
      .exec();
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get all bookings by schedule ID
exports.getBookingByScheduleId = async (req, res) => {
  try {
    const scheduleId = req.params.id; // Assuming 'id' is the schedule ID passed in the request
    console.log(`Fetching bookings for schedule ID: ${scheduleId}`);

    // Fetch bookings and populate user_id field
    const bookings = await Booking.find({ schedule_id: scheduleId }).populate('user_id', 'name email'); // Adjust fields as needed

    if (bookings.length === 0) {
      console.log(`No bookings found for Schedule ID: ${scheduleId}`);
      return res.status(404).json({ msg: 'No bookings found' });
    }

    console.log(`Bookings found: ${JSON.stringify(bookings)}`);
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error.message || error);
    res.status(500).json({ msg: 'Server error', error: error.message || error });
  }
};

// Delete booking by ID when pass the shcedule id
exports.deleteBookingsByScheduleId = async (req, res) => {
  try {
    const scheduleId = req.params.schedule_id; // Assuming the schedule ID is passed as a URL parameter

    // Find and delete all bookings with the given schedule_id
    const deletedBookings = await Booking.deleteMany({ schedule_id: scheduleId });

    if (deletedBookings.deletedCount === 0) {
      return res.status(404).json({ message: "No bookings found for the given schedule ID" });
    }

    res.status(200).json({ message: `${deletedBookings.deletedCount} bookings deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the bookings", error });
  }
};


// // cancel booking using booking id
exports.CancelBooking = async (req, res) => {
  try {
      // Extract booking ID from URL parameters
      const bookingId = req.params._id;

      // Find and delete the booking from the database
      const result = await Booking.findByIdAndDelete(bookingId);

      // Check if the booking was found and deleted
      if (!result) {
          return res.status(404).json({ message: 'Booking not found' });
      }

      // Successfully deleted
      res.status(200).json({ message: 'Booking canceled successfully', data: result });
  } catch (error) {
      // Handle any errors
      console.error('Error canceling booking:', error);
      res.status(500).json({ message: 'Server error', error });
  }
};
