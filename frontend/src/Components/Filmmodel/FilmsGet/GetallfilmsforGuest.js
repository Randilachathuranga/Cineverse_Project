import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function GetallfilmsforGuest() {
  const navigate = useNavigate();

  const handleFilmClick = (id) => {
    localStorage.setItem("filmid", id); // Save film ID to localStorage
    navigate('/ViewfimlbyidforGuest'); // Navigate to Viewfilmby_id page
  };

  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {

        const response = await axios.get("http://localhost:5001/api/films/Guest/all");
        if (response.data && Array.isArray(response.data.films)) {
          setFilms(response.data.films);
        } else {
          setError("Error: Unexpected data structure from API");
        }
      } catch (error) {
        if (error.response) {
          setError(`Error: ${error.response.status} ${error.response.statusText}`);
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

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div>
      <h1>All Films</h1>

      <div style={styles.container}>
        {films.map((film) => {
          return (
            <div
              key={film._id}
              style={styles.filmCard}
              onClick={() => handleFilmClick(film._id)} // Set film ID and navigate on click
            >
              <h2>{film.title}</h2>
              {/* <p>{film.description}</p> */}
              <p>{film.genre}</p>
              {film.image && (
                <img
                  src={`http://localhost:5001/${film.image}`}
                  alt={film.title}
                  style={styles.image}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f4f4f4",
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  loading: {
    textAlign: "center",
    fontSize: "20px",
    color: "#007bff",
  },
  error: {
    textAlign: "center",
    fontSize: "18px",
    color: "red",
  },
  filmCard: {
    width: "300px",
    padding: "15px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    overflow: "hidden",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
};

export default GetallfilmsforGuest;