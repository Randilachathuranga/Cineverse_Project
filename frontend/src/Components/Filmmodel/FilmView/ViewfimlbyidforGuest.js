import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ViewfimlbyidforGuest.css'; 

function ViewfilmbyidforGuest() {
  const [film, setFilm] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleBooking = () => {
    navigate("/Userlogin"); 
  };
  
  useEffect(() => {
    const fetchFilmAndSchedules = async () => {
      try {
        const filmid = localStorage.getItem("filmid");
        const token = localStorage.getItem("authToken");

        if (!filmid) {
          throw new Error("Film ID not found in localStorage");
        }

        // Fetch the film details
        const filmResponse = await axios.get(
          `http://localhost:5001/api/films/Guest/${filmid}`
        );

        console.log("Film API Response:", filmResponse.data);

        if (filmResponse.data) {
          setFilm(filmResponse.data);
        } else {
          throw new Error("Error: Unexpected data structure from film API");
        }

        // Fetch the schedules associated with the film
        const scheduleResponse = await axios.get(
          `http://localhost:5001/api/schedules/film/${filmid}`
        );

        console.log("Schedule API Response:", scheduleResponse.data.showTime);

        if (scheduleResponse.data) {
          setSchedules(scheduleResponse.data); 
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
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!film) return <div>No film data available</div>;

  return (
    <div>
      <div className="film-container">
        <h1>{film.title}</h1>
        <p>
          <strong>Description:</strong> {film.description}
        </p>
        <p>
          <strong>Genre:</strong> {film.genre.join(", ")}
        </p>
        <p>
          <strong>Duration:</strong> {film.duration} hours
        </p>
        {film.release_date && (
          <p>
            <strong>Release Date:</strong>{" "}
            {new Date(film.release_date).toLocaleDateString()}
          </p>
        )}
        {film.rating && (
          <p>
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

        <h2>Schedules</h2>
        {schedules.length > 0 ? (
          <ul className="schedule-list">
            {schedules.map((schedule) => (
              <li key={schedule._id}>
                Show Time: {new Date(schedule.showTime).toLocaleString()}
                <button className="schedule-button" onClick={handleBooking}>Book</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No schedules available for this film.</p>
        )}
      </div>
    </div>
  );
}

export default ViewfilmbyidforGuest;
