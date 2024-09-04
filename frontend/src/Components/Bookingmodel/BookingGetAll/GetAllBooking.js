import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GetAllBooking.css'; // Import the CSS file

function GetBookingBySchedule() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const scheduleId = localStorage.getItem('scheduleId');
    const storedAuthToken = localStorage.getItem('authToken');

    axios.get(`http://localhost:5001/api/bookings/${scheduleId}`, {
      headers: {
        'x-api-key': storedAuthToken,
      },
    })
    .then(response => {
      if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        setError('Unexpected response format');
      }
    })
    .catch(error => {
      setError('Failed to fetch bookings or there are no bookings for this schedule ID');
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="booking-container">Loading...</div>;
  }

  if (error) {
    return <div className="booking-container">{error}</div>;
  }

  return (
    <div className="booking-container">
      <h2>Booking Details for Schedule</h2>
      {bookings.length > 0 ? (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking._id}>
              <p><strong>Name:</strong> {booking.user_id.name}</p>
              <p><strong>User Id:</strong> {booking.user_id._id}</p>
              <p><strong>Email:</strong> {booking.user_id.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found for this schedule ID.</p>
      )}
    </div>
  );
}

export default GetBookingBySchedule;
