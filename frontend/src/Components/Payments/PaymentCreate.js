import './PaymentCreate.css';

import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PwJDWJYBSF1viQyx0GJZIcaq5R9ZXQ8271o9u4pnj1vZiFmjciqPsq6cUV17I7pEkkGZNoFjCdFKDmBXOzhAWz4003ECiIvFq');

const PaymentForm = ({ selectedSeats, totalPrice, userEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const storedUserId = localStorage.getItem('userId');
    const storedScheduleId = localStorage.getItem('scheduleId');
    const storedAuthToken = localStorage.getItem('authToken');

    try {
      // Proceed with payment
      const { data } = await axios.post('http://localhost:5001/api/payments/create-payment-intent', {
        amount: totalPrice * 100, // Convert to cents
        userId: storedUserId,
      });

      // Confirm the card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card,
        },
      });

      if (error) {
        console.error('Payment Error:', error);
        alert(`Payment failed: ${error.message}`);
        return; // Exit if payment fails
      } 

      if (paymentIntent.status === 'succeeded') {
        // Payment succeeded, proceed with creating seats and booking
        try {
          // Create seats document
          const seatIds = selectedSeats.map(seat => parseInt(seat, 10));
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

          // alert('Payment and booking successful!');
          navigate('/PaymentSuccess');
        } catch (error) {
          console.error('Error during booking:', error);
          alert(`Booking failed. ${error.message}`);
        }
      }
    } catch (error) {
      console.error('Error during payment:', error);
      alert(`Payment failed. ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay Now</button>
    </form>
  );
};

function PaymentCreation() {
  const location = useLocation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const userEmail = localStorage.getItem("email") || "user@example.com"; // Retrieve email from local storage

  useEffect(() => {
    if (location.state && location.state.selectedSeats) {
      const { selectedSeats } = location.state;
      const ticketPrice = 1200; 
      const totalPrice = selectedSeats.length * ticketPrice;
      setSelectedSeats(selectedSeats);
      setTotalPrice(totalPrice);
      setCurrentDate(new Date().toLocaleString());
    }
  }, [location.state]);

  return (
    <div>
      <h1>Checkout Page</h1>
      <p><strong>Booking Date:</strong> {currentDate}</p>
      <p><strong>Total Price:</strong> ${totalPrice}</p>
      <ul>
        {selectedSeats.length > 0 ? (
          selectedSeats.map((seat) => (
            <li key={seat}>{seat}</li>
          ))
        ) : (
          <li>No seats selected</li>
        )}
      </ul>
      <Elements stripe={stripePromise}>
        <PaymentForm 
          selectedSeats={selectedSeats} 
          totalPrice={totalPrice} 
          userEmail={userEmail} 
        />
      </Elements>
    </div>
  );
}

export default PaymentCreation;
