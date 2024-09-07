import React from 'react';
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import './PaymentCreate.css';

const stripePromise = loadStripe('pk_test_51PwJDWJYBSF1viQyx0GJZIcaq5R9ZXQ8271o9u4pnj1vZiFmjciqPsq6cUV17I7pEkkGZNoFjCdFKDmBXOzhAWz4003ECiIvFq'); 

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const userId = localStorage.getItem('userId');  
    const bookingId = localStorage.getItem('bookingId');


    try {
      // Create a payment intent on the backend
      const { data } = await axios.post('http://localhost:5001/api/payments/create-payment-intent', {
        amount: 1200 * 100, // Amount in cents
      });

      // Confirm the card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card,
          userId,         
          bookingId 
        },
      });

      if (error) {
        console.error('Payment Error:', error);
        alert(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
        // Perform additional actions on success
        await axios.post('http://localhost:5001/api/payments/update-status', {
          paymentIntentId: paymentIntent.id,
          status: 'succeeded',
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
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
  return (
    <div>
      <h1>Checkout Page</h1>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

export default PaymentCreation;
