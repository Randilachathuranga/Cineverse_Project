import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdatedeleteForm() {
  const navigate = useNavigate();
  const [film, setFilm] = useState({
    title: "",
    description: "",
    genre: "",
    duration: "",
    release_date: "",
    rating: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const filmid = localStorage.getItem("filmid");
        const token = localStorage.getItem("authToken");

        if (!filmid || !token) {
          throw new Error("Film ID or authentication token not found.");
        }

        const response = await axios.get(
          `http://localhost:5001/api/films/${filmid}`,
          {
            headers: {
              "x-api-key": token,
            },
          }
        );

        if (response.data) {
          setFilm(response.data);
        } else {
          throw new Error("Unexpected data structure from API");
        }
      } catch (error) {
        console.error("Error fetching film details:", error);
        setError(error.message);
      }
    };

    fetchFilmDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilm((prevFilm) => ({
      ...prevFilm,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const filmid = localStorage.getItem("filmid");
      const token = localStorage.getItem("authToken");

      if (!filmid || !token) {
        throw new Error("Film ID or authentication token not found.");
      }

      const response = await axios.put(
        `http://localhost:5001/api/films/${filmid}`,
        film,
        {
          headers: {
            "x-api-key": token,
          },
        }
      );

      if (response.status === 200) {
        alert("Film updated successfully!");
        navigate("/UpdateFilms"); // Navigate back to the list of films
      } else {
        throw new Error("Failed to update film");
      }
    } catch (error) {
      console.error("Error updating film:", error);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const filmid = localStorage.getItem("filmid");
      const token = localStorage.getItem("authToken");
  
      if (!filmid || !token) {
        throw new Error("Film ID or authentication token not found.");
      }
  
      console.log("Film ID:", filmid);
  
      // First, fetch all schedules associated with the film
      const schedulesResponse = await axios.get(
        `http://localhost:5001/api/schedules/film/${filmid}`,
        {
          headers: {
            "x-api-key": token,
          },
        }
      );
  
      const schedules = schedulesResponse.data;
  
      if (schedules.length > 0) {
        console.log(`Found ${schedules.length} schedule(s) associated with the film.`);
  
        for (const schedule of schedules) {
          // Step 1: Delete all seats for the schedule
      try {
        const seatsResponse = await axios.delete(
          `http://localhost:5001/api/seats/${schedules}`
        );

        if (seatsResponse.status === 200) {
          console.log(
            `Seats for schedule with ID ${schedules} deleted successfully!`
          );
        } else {
          console.error(
            `Failed to delete seats for schedule with ID ${schedules}.`
          );
          throw new Error(
            `Failed to delete seats for schedule with ID ${schedules}.`
          );
        }
      } catch (error) {
        console.error(
          `An error occurred while deleting seats: ${error.message}`
        );
        throw error; // Re-throw the error to handle it further up the call stack if needed
      }

      // Step 2: Delete all bookings for the schedule
      try {
        const bookingsResponse = await axios.delete(
          `http://localhost:5001/api/bookings/${schedules}`
        );

        if (bookingsResponse.status === 200) {
          console.log(
            `Bookings for schedule with ID ${schedules} deleted successfully!`
          );
        } else {
          console.error(
            `Failed to delete bookings for schedule with ID ${schedules}.`
          );
          throw new Error(
            `Failed to delete bookings for schedule with ID ${schedules}.`
          );
        }
      } catch (error) {
        console.error(
          `An error occurred while deleting bookings: ${error.message}`
        );
        throw error; // Re-throw the error to handle it further up the call stack if needed
      }

      // Step 3: Delete the schedule itself
          const scheduleResponse = await axios.delete(
            `http://localhost:5001/api/schedules/${schedule._id}`,
            {
              headers: {
                "x-api-key": token,
              },
            }
          );
  
          if (scheduleResponse.status === 200) {
            console.log(`Schedule with ID ${schedule._id} deleted successfully!`);
          } else {
            console.error(`Failed to delete schedule with ID ${schedule._id}.`);
            throw new Error(`Failed to delete schedule with ID ${schedule._id}.`);
          }
        }
      } else {
        console.warn("No schedules found for this film. Skipping schedule deletion.");
      }
  
      // After deleting all schedules, delete the film
      const response = await axios.delete(
        `http://localhost:5001/api/films/${filmid}`,
        {
          headers: {
            "x-api-key": token,
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Film deleted successfully!");
        alert("Film and all associated schedules deleted successfully!");
        navigate("/UpdateFilms"); // Navigate back to the list of films
      } else {
        throw new Error("Failed to delete film.");
      }
    } catch (error) {
      console.error("Error deleting film or schedules:", error);
      setError(error.message);
    }
  };
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div style={styles.container}>
        <h2>Update or Delete Film</h2>
        <form style={styles.form}>
          <label style={styles.label}>
            Title:
            <input
              type="text"
              name="title"
              value={film.title}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Description:
            <textarea
              name="description"
              value={film.description}
              onChange={handleChange}
              style={styles.textarea}
            />
          </label>
          <label style={styles.label}>
            Genre (comma-separated):
            <input
              type="text"
              name="genre"
              value={film.genre}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Duration (hours):
            <input
              type="number"
              name="duration"
              value={film.duration}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Release Date:
            <input
              type="date"
              name="release_date"
              value={
                film.release_date
                  ? new Date(film.release_date).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Rating:
            <input
              type="text"
              name="rating"
              value={film.rating}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <div style={styles.buttonContainer}>
            <button
              type="button"
              onClick={handleUpdate}
              style={styles.updateButton}
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  updateButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UpdatedeleteForm;
