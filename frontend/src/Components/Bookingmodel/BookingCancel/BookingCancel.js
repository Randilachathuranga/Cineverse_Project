import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookingCancel() {
  const bookingId = localStorage.getItem("bookingId");
  const seatIds = JSON.parse(localStorage.getItem("seatIds")) || []; // Ensure seatIds is an array
  const bookingDate = new Date(localStorage.getItem("bookingdate"));
  const showtime = new Date(localStorage.getItem("showtime"));
  const storedAuthToken = localStorage.getItem("authToken"); // Ensure the auth token is present
  const navigate = useNavigate();
  

  console.log("bookingId:", bookingId);
  console.log("seatIds:", seatIds);
  console.log("bookingdate:", bookingDate);
  console.log("showtime:", showtime);

  const cancelBooking = async () => {
    if (!bookingId || seatIds.length === 0 || !showtime) {
      console.error("Booking ID, seat IDs, or showtime are missing.");
      alert("Error: Booking details are missing.");
      return;
    }

    const currentDate = new Date();
    const twoDaysBeforeShowtime = new Date(showtime);
    twoDaysBeforeShowtime.setDate(showtime.getDate() - 2);

    if (currentDate > twoDaysBeforeShowtime) {
      console.error("You can't cancel the booking as it's less than two days before the showtime.");
      alert("You can't cancel the booking as it's less than two days before the showtime.");
      navigate("/GetAllBookingsbyUser");
      return;
    }

    try {
      // 01: Cancel seats
      const seatCancellationRequests = seatIds.map((seatId) =>
        axios.delete(`http://localhost:5001/api/seats/allseats/${seatId}`, {
          headers: { "x-api-key": storedAuthToken },
        })
      );
      await Promise.all(seatCancellationRequests);
      console.log("Seats successfully canceled");

      // 02: Cancel the booking
      await axios.delete(`http://localhost:5001/api/bookings/cancel/${bookingId}`, {
        headers: { "x-api-key": storedAuthToken },
      });
      console.log("Booking successfully canceled");

      // Clear local storage or redirect as needed
      localStorage.removeItem("bookingId");
      localStorage.removeItem("seatIds");
      localStorage.removeItem("bookingdate");
      localStorage.removeItem("showtime");
      // Example redirect (uncomment if needed)
      // window.location.href = '/some-route';
      
      alert("Your booking and seats have been successfully canceled.");
      navigate("/GetAllBookingsbyUser");
    } catch (error) {
      console.error("Error canceling booking:", error.response ? error.response.data : error.message);
      alert("Error canceling booking: " + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <div>
      <h2>Booking Cancellation</h2>
      <p>Click the button below to confirm the cancellation of your booking and associated seats.</p>
      <button
        onClick={cancelBooking}
        style={styles.button}
      >
        Confirm Cancellation
      </button>
    </div>
  );
}

const styles = {
  button: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default BookingCancel;
