import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import "./Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats } = location.state || {};

  const storedUserId = localStorage.getItem("userId");
  const storedScheduleId = localStorage.getItem("scheduleId");
  const storedAuthToken = localStorage.getItem("authToken");
  const userEmail = localStorage.getItem("email");

  console.log("Stored email:", userEmail);

  const ticketPrice = 600;
  const totalPrice = selectedSeats.length * ticketPrice;
  const currentDate = new Date().toLocaleString(); 

  const handlePayment = async () => {
    try {
      const seatIds = selectedSeats.map((seat) => parseInt(seat, 10));

      // Create seats document
      const seatResponse = await axios.post(
        "http://localhost:5001/api/seats/add",
        {
          user_id: storedUserId,
          schedule_id: storedScheduleId,
          seat_id: seatIds,
        },
        {
          headers: {
            "x-api-key": storedAuthToken,
          },
        }
      );

      if (seatResponse.data.user_id && seatResponse.data._id) {
        localStorage.setItem("seatid_of_seatdoc", seatResponse.data._id);
      }

      const storedSeatIds = localStorage.getItem("seatid_of_seatdoc");

      // Create a booking document
      const bookingResponse = await axios.post(
        "http://localhost:5001/api/bookings/add",
        {
          user_id: storedUserId,
          seats: storedSeatIds,
          schedule_id: storedScheduleId,
          booking_date: new Date().toISOString(),
          status: "booked",
        },
        {
          headers: {
            "x-api-key": storedAuthToken,
          },
        }
      );

      // Send QR code to the user's email
      await axios.post(
        "http://localhost:5001/api/send-qrcode",
        {
          userEmail: userEmail,  
          bookingData: bookingResponse.data,
        },
        {
          headers: {
            "x-api-key": storedAuthToken,
          },
        }
      );

      navigate("/Checkout");
    } catch (error) {
      console.error("Error during payment:", error.response || error.message);

      const errorMessage = error.response
        ? `Payment failed. Server responded with status ${
            error.response.status
          }: ${error.response.data.message || error.response.statusText}`
        : `Payment failed. ${error.message}`;

      alert(errorMessage);
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment Summary</h2>
      <p className="payment-detail">
        <strong>Total Price:</strong> ${totalPrice}
      </p>
      <p className="payment-detail">
        <strong>Booking Date:</strong> {currentDate}
      </p>

      <p className="payment-seats-title">Your selected seats:</p>
      <ul className="payment-seats-list">
        {selectedSeats && selectedSeats.length > 0 ? (
          selectedSeats.map((seat) => (
            <li key={seat} className="payment-seat-item">{seat}</li>
          ))
        ) : (
          <li className="payment-seat-item">No seats selected</li>
        )}
      </ul>

      <button className="payment-button" onClick={handlePayment}>Pay Here</button>
    </div>
  );
}

export default Payment;
