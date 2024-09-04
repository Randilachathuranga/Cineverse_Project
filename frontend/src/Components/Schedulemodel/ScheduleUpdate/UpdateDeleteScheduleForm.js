import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateDeleteScheduleForm() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState({
    film_id: "",
    showTime: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScheduleDetails = async () => {
      try {
        const scheduleId = localStorage.getItem("scheduleId");
        const token = localStorage.getItem("authToken");

        if (!scheduleId || !token) {
          throw new Error("Schedule ID or authentication token not found.");
        }

        console.log(`Fetching schedule details for ID: ${scheduleId}`);

        const response = await axios.get(
          `http://localhost:5001/api/schedules/${scheduleId}`
        );

        console.log("API Response:", response);

        if (response.data) {
          setSchedule(response.data);
        } else {
          throw new Error("Unexpected data structure from API");
        }
      } catch (error) {
        console.error("Error fetching schedule details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [name]: value,
    }));
  };

  // update shcedule
  const handleUpdate = async () => {
    try {
      const scheduleId = localStorage.getItem("scheduleId");
      const token = localStorage.getItem("authToken");

      if (!scheduleId || !token) {
        throw new Error("Schedule ID or authentication token not found.");
      }

      const response = await axios.put(
        `http://localhost:5001/api/schedules/${scheduleId}`,
        schedule,
        {
          headers: {
            "x-api-key": token,
          },
        }
      );

      if (response.status === 200) {
        alert("Schedule updated successfully!");
        navigate("/ViewShedulesupdatedelete");
      } else {
        throw new Error(`Failed to update schedule: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
      setError(error.message);
    }
  };

  // Delete schedule function
  const handleDelete = async () => {
    try {
      const scheduleId = localStorage.getItem("scheduleId");
      const token = localStorage.getItem("authToken");

      if (!scheduleId || !token) {
        throw new Error("Schedule ID or authentication token not found.");
      }

      // Step 1: Delete all seats for the schedule
      try {
        const seatsResponse = await axios.delete(
          `http://localhost:5001/api/seats/${scheduleId}`
        );

        if (seatsResponse.status === 200) {
          console.log(
            `Seats for schedule with ID ${scheduleId} deleted successfully!`
          );
        } else {
          console.error(
            `Failed to delete seats for schedule with ID ${scheduleId}.`
          );
          throw new Error(
            `Failed to delete seats for schedule with ID ${scheduleId}.`
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
          `http://localhost:5001/api/bookings/${scheduleId}`
        );

        if (bookingsResponse.status === 200) {
          console.log(
            `Bookings for schedule with ID ${scheduleId} deleted successfully!`
          );
        } else {
          console.error(
            `Failed to delete bookings for schedule with ID ${scheduleId}.`
          );
          throw new Error(
            `Failed to delete bookings for schedule with ID ${scheduleId}.`
          );
        }
      } catch (error) {
        console.error(
          `An error occurred while deleting bookings: ${error.message}`
        );
        throw error; // Re-throw the error to handle it further up the call stack if needed
      }

      // Step 3: Delete the schedule itself
      try {
        const scheduleResponse = await axios.delete(
          `http://localhost:5001/api/schedules/${scheduleId}`,
          {
            headers: {
              "x-api-key": token,
            },
          }
        );

        if (scheduleResponse.status === 200) {
          alert("Schedule deleted successfully!");
          navigate("/ViewShedulesupdatedelete"); // Redirect to another page after deletion
        } else {
          throw new Error(
            `Failed to delete schedule: ${scheduleResponse.statusText}`
          );
        }
      } catch (error) {
        console.error(
          `An error occurred while deleting the schedule: ${error.message}`
        );
        throw error; // Re-throw the error to handle it further up the call stack if needed
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
      setError(error.message);
    }
  };

  const formatDateTimeLocal = (dateTime) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    const offset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localDateTime = new Date(date.getTime() - offset);
    return localDateTime.toISOString().slice(0, 16); // Convert to YYYY-MM-DDTHH:MM
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div>
      <div style={styles.container}>
        <h2>Update or Delete Schedule</h2>
        {error && <div style={styles.error}>Error: {error}</div>}
        <form style={styles.form}>
          <label style={styles.label}>
            Show Time:
            <input
              type="datetime-local"
              name="showTime"
              value={formatDateTimeLocal(schedule.showTime)}
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
  error: {
    color: "red",
    marginBottom: "20px",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
  },
};

export default UpdateDeleteScheduleForm;
