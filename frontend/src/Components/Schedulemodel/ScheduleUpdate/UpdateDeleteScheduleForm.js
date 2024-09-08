import React, { useEffect, useState } from "react";
import "./UpdateDeleteScheduleForm.css";

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
    return <div>Loading...</div>;
  }

  return (
      <div className="container">
        <h2 className="ud-h2">Update or Delete Schedule</h2>
        {error && <div className="error">Error: {error}</div>}
        <form className="u-form">
          <label className="u-label">
            Show Time:
            <input className="dtl"
              type="datetime-local"
              name="showTime"
              value={formatDateTimeLocal(schedule.showTime)}
              onChange={handleChange}
            />
          </label>
          <div className="buttonContainer">
            <button className="btn btn-update"
              type="button"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button className="btn btn-delete"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
  );
}
export default UpdateDeleteScheduleForm;
