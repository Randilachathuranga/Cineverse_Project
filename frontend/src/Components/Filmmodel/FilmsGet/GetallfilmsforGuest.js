import './GetallfilmsforGuest.css'; // Import the CSS file

import React, { useEffect, useState } from "react";

import Slider from "react-slick"; // Import the Slider component from react-slick
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // Settings for the slick slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of films to show at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="films-container">
      <h1 className="films-title">All Films</h1>

      <Slider {...settings}>
        {films.map((film) => (
          <div
            key={film._id}
            className="film"
            onClick={() => handleFilmClick(film._id)} // Set film ID and navigate on click
          >
            <h2 className="film-title">{film.title}</h2>
            <p>{film.genre}</p>
            {film.image && (
              <img
                src={`http://localhost:5001/${film.image}`}
                alt={film.title}
                className="film-poster"
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default GetallfilmsforGuest;
