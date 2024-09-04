import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './GetAllBookingsbyUser.css'; // Import the external CSS file

function GetAllBookingsbyUser() {
  const [bookings, setBookings] = useState([]);
  const [seatsDetails, setSeatsDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClickCancelbooking = (booking) => {
    localStorage.setItem("bookingId", booking._id);
    localStorage.setItem("seatIds", JSON.stringify(booking.seats));
    localStorage.setItem("bookingdate", booking.booking_date);
    localStorage.setItem("showtime", booking.schedule_id?.showTime || "N/A");
    navigate("/bookingcancel");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const storedAuthToken = localStorage.getItem("authToken");

    if (!userId || !storedAuthToken) {
      setError("User ID or Auth Token is missing");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5001/api/bookings/mybooking/${userId}`, {
        headers: {
          "x-api-key": storedAuthToken,
        },
      })
      .then((response) => {
        setBookings(response.data);
        const seatIds = response.data.flatMap((booking) => booking.seats || []);
        if (seatIds.length > 0) {
          const seatRequests = seatIds.map((seatId) =>
            axios
              .get(`http://localhost:5001/api/seats/myseats/${seatId}`, {
                headers: {
                  "x-api-key": storedAuthToken,
                },
              })
              .catch((error) => {
                console.error(`Error fetching seat ${seatId}:`, error);
                return { data: null };
              })
          );
          return Promise.all(seatRequests);
        } else {
          return [];
        }
      })
      .then((responses) => {
        if (responses) {
          const allSeatsDetails = responses.flatMap(
            (response) => response.data || []
          );
          setSeatsDetails(allSeatsDetails);
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
        setError("Failed to fetch data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const pricePerSeat = 1200;

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">My Booking Details</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings">You have no bookings yet.</p>
      ) : (
        <ul className="bookings-list">
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-item">
              <p>Film: {booking.schedule_id?.film_id?.title || "N/A"}</p>
              <p>User ID: {booking.user_id}</p>
              <p>
                Booking Time and Date:{" "}
                {new Date(booking.booking_date).toLocaleString()}
              </p>
              <p>
                Show Time:{" "}
                {new Date(booking.schedule_id?.showTime).toLocaleString() ||
                  "N/A"}
              </p>
              <ul className="seats-list">
                {booking.seats.map((seatId) => {
                  const seatDetail = seatsDetails.find(
                    (seat) => seat._id === seatId
                  );

                  const totalSeats = seatDetail ? seatDetail.seat_id.length : 0;
                  const totalPrice = totalSeats * pricePerSeat;

                  return seatDetail ? (
                    <li key={seatId} className="seat-item">
                      Seats: {seatDetail.seat_id.join(", ")}
                      <p>Total Price: {totalPrice} Rs</p>
                    </li>
                  ) : (
                    <li key={seatId} className="seat-item">
                      Seat ID: {seatId}, Details: Loading...
                    </li>
                  );
                })}
              </ul>
              <button
                className="cancel-button"
                onClick={() => handleClickCancelbooking(booking)}
              >
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GetAllBookingsbyUser;
