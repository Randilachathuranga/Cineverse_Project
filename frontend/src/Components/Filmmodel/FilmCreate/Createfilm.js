import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Createfilm.css";

function Createfilm() {
  const navigate = useNavigate(); // Hook for navigation

  const [filmData, setFilmData] = useState({
    title: "",
    description: "",
    genre: "",
    duration: "",
    release_date: "",
    rating: "",
    image: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFilmData({ ...filmData, image: e.target.files[0] });
    } else {
      setFilmData({ ...filmData, [e.target.name]: e.target.value });
    }
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!token) {
      setMessage("Token not found. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("title", filmData.title);
    formData.append("description", filmData.description);
    formData.append("genre", filmData.genre);
    formData.append("duration", filmData.duration);
    formData.append("release_date", filmData.release_date);
    formData.append("rating", filmData.rating);
    formData.append("image", filmData.image);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/films/CreateFilm",
        formData,
        {
          headers: {
            "x-api-key": token,
            // No Content-Type header needed for FormData
          },
        }
      );
      localStorage.setItem("filmid", response.data._id);
      if (response.status === 201) {
        setMessage("Film created successfully!");
        navigate("/AdminHome");
      } else {
        setMessage("Failed to create film. Status code: " + response.status);
      }
    } catch (error) {
      console.error("Error details:", error);
      if (error.response) {
        setMessage("Error Response Data: " + JSON.stringify(error.response.data));
      } else if (error.request) {
        setMessage("Error Request Data: " + JSON.stringify(error.request));
      } else {
        setMessage("Error Message: " + error.message);
      }
    }
  };

  return (
    <div className="create-film-container">
      <h2 className="create-film-header">Create a New Film</h2>
      {message && <p className="message">{message}</p>}
      <form className="create-film-form" onSubmit={handleSubmit}>
        <div className="create-film-div">
          <label className="title-label label">Title:</label>
          <input className="title-input input"
            type="text"
            name="title"
            value={filmData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="create-film-div">
          <label className="description-label label">Description:</label>
          <textarea className="description-input input"
            name="description"
            value={filmData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="create-film-div">
          <label className="genre-label label">Genre (comma separated):</label>
          <input className="genre-input input"
            type="text"
            name="genre"
            value={filmData.genre}
            onChange={handleChange}
            placeholder="e.g. Action, Comedy"
          />
        </div>
        <div className="create-film-div">
          <label className="duration-label label">Duration (Hour):</label>
          <input className="duration-input input"
            type="number"
            name="duration"
            value={filmData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="create-film-div">
          <label className="rd-label label">Release Date:</label>
          <input className="rd-input input"
            type="date"
            name="release_date"
            value={filmData.release_date}
            onChange={handleChange}
          />
        </div>
        <div className="create-film-div">
          <label className="rating-label label">Rating:</label>
          <input className="rating-input input"
            type="text"
            name="rating"
            value={filmData.rating}
            onChange={handleChange}
          />
        </div>
        <div className="create-film-div">
          <label className="img-label label">Film Image:</label>
          <input className="img-input input"
            type="file"
            name="image"
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-btn" type="submit">Create Film</button>
      </form>
    </div>
  );
}

export default Createfilm;
