import "./Payment.css";

import { useLocation, useNavigate } from "react-router-dom";

import React from "react";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats } = location.state || {};

  const userEmail = localStorage.getItem("email");

  console.log("Stored email:", userEmail);

  const ticketPrice = 1200;
  const totalPrice = selectedSeats.length * ticketPrice;
  const currentDate = new Date().toLocaleString(); 

  const handlePayment = async () => {
      navigate("/Checkout",{ state: { selectedSeats } });
  }
  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment Summary</h2>
      <p className="payment-detail">
        <strong>Total Price:</strong> Rs.{totalPrice}
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
