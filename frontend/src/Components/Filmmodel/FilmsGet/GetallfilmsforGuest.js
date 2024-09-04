import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import './GetallfilmsforGuest.css';

function GetallfilmsforGuest() {
  const navigate = useNavigate();
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides at once
    slidesToScroll: 1,
    centerMode: true, // Center the active slides
    centerPadding: '10px', // Add space around the slides
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show 1 slide at a time on small screens
          slidesToScroll: 1,
          centerPadding: '10px', // Adjust for mobile
        },
      },
    ],
  };

  const handleFilmClick = (id) => {
    localStorage.setItem("filmid", id);
    navigate('/ViewfilmbyidforGuest');
  };

  return (
    <div className="films-container">
      <h2 className="films-title">All Films</h2>
      <Slider {...settings}>
        {films.map((film) => (
          <div className="film" key={film._id} onClick={() => handleFilmClick(film._id)}>
            <h3 className="film-title">{film.title}</h3>
            <p className="film-genre">{film.genre}</p>
            {film.image && (
              <img
                className="film-poster"
                src={`http://localhost:5001/${film.image}`}
                alt={film.title}
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  ); 
}

export default GetallfilmsforGuest;
