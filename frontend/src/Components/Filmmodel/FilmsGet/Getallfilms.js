import './Getallfilms.css'; // Import your CSS

import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Getallfilms() {
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="films-container">
      <h2 className="films-title">All Films</h2>
      <Slider {...settings}>
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
      </Slider>
    </div>
  );
}

export default Getallfilms;
