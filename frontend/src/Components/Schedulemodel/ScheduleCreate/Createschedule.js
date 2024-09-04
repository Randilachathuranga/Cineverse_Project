import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Createschedule.css";

const Createschedule = () => {
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState("");
  const [showTime, setShowTime] = useState("");
  const token = localStorage.getItem("authToken");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        if (!token) {
          throw new Error("No auth token found");
        }

        const response = await axios.get(
          "http://localhost:5001/api/films/all",
          {
            headers: {
              "x-api-key": token,
            },
          }
        );

        if (Array.isArray(response.data.films)) {
          setFilms(response.data.films);
        } else {
          setError("Unexpected data structure from API");
        }
      } catch (error) {
        if (error.response) {
          setError(
            `Error: ${error.response.status} ${error.response.statusText}`
          );
        } else if (error.request) {
          setError("Error: No response from server");
        } else {
          setError(`Error: ${error.message}`);
        }
      }
    };

    fetchFilms();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "x-api-key": token,
        },
      };

      const data = {
        film_id: selectedFilm,
        showTime,
      };

      await axios.post(
        "http://localhost:5001/api/schedules/create",
        data,
        config
      );
      alert("Schedule created successfully!");
      navigate("/AdminHome");
    } catch (error) {
      console.error("Error creating schedule:", error);
    }
  };

  return (
    <div className="create-schedule-container">
      <h1 className="create-schedule-heading">Create Schedule</h1>
      {error && <p className="create-schedule-error">{error}</p>}
      <form onSubmit={handleSubmit} className="create-schedule-form">
        <div className="create-schedule-form-group">
          <label htmlFor="film" className="create-schedule-label">Select Film:</label>
          <select
            id="film"
            value={selectedFilm}
            onChange={(e) => setSelectedFilm(e.target.value)}
            required
            className="create-schedule-select"
          >
            <option value="">Choose a film</option>
            {films.map((film) => (
              <option key={film._id} value={film._id}>
                {film.title}
              </option>
            ))}
          </select>
        </div>
        <div className="create-schedule-form-group">
          <label htmlFor="showTime" className="create-schedule-label">Show Time:</label>
          <input
            type="datetime-local"
            id="showTime"
            value={showTime}
            onChange={(e) => setShowTime(e.target.value)}
            required
            className="create-schedule-input"
          />
        </div>
        <button type="submit" className="create-schedule-button">Create Schedule</button>
      </form>
    </div>
  );
};

export default Createschedule;
