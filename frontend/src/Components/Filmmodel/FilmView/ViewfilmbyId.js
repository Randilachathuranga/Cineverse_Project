import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Viewfilmbyid.css"; // Import the external CSS file
import Button from '@mui/material/Button';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Viewfilmbyid() {
  const [film, setFilm] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleBooking = (scheduleId) => {
    // Store the selected scheduleId in local storage
    localStorage.setItem("scheduleId", scheduleId);
    // Navigate to the CreateBooking page
    navigate("/CreateBooking");
  };

  useEffect(() => {
    const fetchFilmAndSchedules = async () => {
      try {
        const filmid = localStorage.getItem("filmid");
        const token = localStorage.getItem("authToken");

        if (!filmid) {
          throw new Error("Film ID not found in localStorage");
        }

        if (!token) {
          throw new Error("Authentication token not found in localStorage");
        }

        // Fetch the film details
        const filmResponse = await axios.get(
          `http://localhost:5001/api/films/${filmid}`,
          {
            headers: {
              "x-api-key": token,
            },
          }
        );

        console.log("Film API Response:", filmResponse.data);

        if (filmResponse.data) {
          setFilm(filmResponse.data);
        } else {
          throw new Error("Error: Unexpected data structure from film API");
        }

        // Fetch the schedules associated with the film
        const scheduleResponse = await axios.get(
          `http://localhost:5001/api/schedules/film/${filmid}`,
          {
            headers: {
              "x-api-key": token,
            },
          }
        );

        console.log("Schedule API Response:", scheduleResponse.data);

        if (scheduleResponse.data) {
          setSchedules(scheduleResponse.data); // Set the schedules array
        } else {
          throw new Error("Error: Unexpected data structure from schedule API");
        }
      } catch (error) {
        console.error("Error fetching film or schedule data:", error);
        if (error.response) {
          setError(
            `Error: ${error.response.status} ${error.response.statusText}`
          );
        } else if (error.request) {
          setError("Error: No response from server");
        } else {
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFilmAndSchedules();
  }, []); // Runs only once after the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!film) return <div>No film data available</div>;

  return (
    <div className="film-v-container">
      <div className="film-content">
        <h1 className="film-title">{film.title}</h1>
        <p className="film-description">
          <strong>Description:</strong> {film.description}
        </p>
        <p className="film-genre">
          <strong>Genre:</strong> {film.genre.join(", ")}
        </p>
        <p className="film-duration">
          <strong>Duration:</strong> {film.duration} hours
        </p>
        {film.release_date && (
          <p className="film-release-date">
            <strong>Release Date:</strong>{" "}
            {new Date(film.release_date).toLocaleDateString()}
          </p>
        )}
        {film.rating && (
          <p className="film-rating">
            <strong>Rating:</strong> {film.rating}
          </p>
        )}
        {film.image && (
          <img
            src={`http://localhost:5001/${film.image}`}
            alt={film.title}
            className="film-image"
          />
        )}

        <h2 className="schedules-title">Schedules</h2>
        {schedules.length > 0 ? (
          <ul className="schedule-list">
            {schedules.map((schedule) => (
              <li key={schedule._id} className="schedule-item">
                <AccessTimeIcon /> {new Date(schedule.showTime).toLocaleString()}


                <Button className="schedule-book-button"
                  onClick={() => handleBooking(schedule._id)} variant="contained" startIcon={<ConfirmationNumberIcon />}>
                  Book
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-schedules">No schedules available for this film.</p>
        )}
      </div>
    </div>
  );
}

export default Viewfilmbyid;
