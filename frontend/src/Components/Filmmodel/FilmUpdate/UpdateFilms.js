import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UpdateFilms.css";

function UpdateFilms() {
  const navigate = useNavigate();

  const handleFilmClick = (id) => {
    localStorage.setItem("filmid", id); // Save film ID to localStorage
    navigate("/UpdatedeleteForm"); // Navigate to Viewfilmby_id page
  };

  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log("Token:", token);

        const response = await axios.get(
          "http://localhost:5001/api/films/all",
          {
            headers: {
              "x-api-key": token,
            },
          }
        );
        if (response.data && Array.isArray(response.data.films)) {
          setFilms(response.data.films);
        } else {
          setError("Error: Unexpected data structure from API");
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
        console.error("Error fetching films data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-film-container">
      <h1>All Films for Updates</h1>
      <div className="film-container">
        {films.map((film) => (
          <div
            key={film._id}
            className="film-card"
            onClick={() => handleFilmClick(film._id)} // Set film ID and navigate on click
          >
            <h2>{film.title}</h2>
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
            <button className="film-button" onClick={() => handleFilmClick(film._id)}>Update or delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpdateFilms;
