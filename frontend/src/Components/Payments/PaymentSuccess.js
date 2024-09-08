import React from "react";

function PaymentSuccess() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f0f0f0', // Light background color for better contrast
  };

  const headingStyle = {
    fontSize: '2rem', // Responsive font size for heading
    color: '#030420', // Dark color for text
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Payment Success</h1>
      <p>Your payment was processed successfully. Thank you for your purchase!</p>
    </div>
  );
}

export default PaymentSuccess;
