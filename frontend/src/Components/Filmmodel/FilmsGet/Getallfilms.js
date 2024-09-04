import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Getallfilms.css'; // Import your CSS

function Getallfilms() {
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3); // Number of slides to show at once

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5001/api/films/all", {
          headers: {
            "x-api-key": token,
          },
        });
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
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + slidesToShow) % films.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - slidesToShow + films.length) % films.length
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="films-container">
      <h2 className="films-title">All Films</h2>
      <div className="carousel">
        <button className="carousel-control prev" onClick={prevSlide}>
          &#10094;
        </button>
        <div className="carousel-inner">
          <div
            className="carousel-slides"
            style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
          >
            {films.map((film) => (
              <div
                key={film._id}
                className="film"
                onClick={() => {
                  localStorage.setItem("filmid", film._id);
                  navigate('/Viewfilmbyid');
                }}
              >
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
          </div>
        </div>
        <button className="carousel-control next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default Getallfilms;
