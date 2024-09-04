import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewShedulesupdatedelete.css";

const ViewShedulesupdatedelete = () => {
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleScheduleClick = (id) => {
    localStorage.setItem("scheduleId", id); // Set scheduleId in localStorage
    navigate("/UpdateDeleteScheduleForm");
  };

  const handleScheduleClick_to_showbooking = (id) => {
    localStorage.setItem("scheduleId", id); // Set scheduleId in localStorage
    navigate("/GetAllBooking");
  }

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        if (!token) {
          throw new Error("No auth token found");
        }

        const response = await axios.get(
          "http://localhost:5001/api/schedules/all"
        );

        console.log("Schedules API Response:", response.data);

        if (Array.isArray(response.data)) {
          const groupedSchedules = response.data.reduce((acc, schedule) => {
            const filmId = schedule.film_id._id;
            if (!acc[filmId]) {
              acc[filmId] = {
                film: schedule.film_id,
                schedules: [],
              };
            }
            acc[filmId].schedules.push(schedule);
            return acc;
          }, {});

          setSchedules(Object.values(groupedSchedules));
        } else {
          setError("Unexpected data structure from API");
        }
      } catch (error) {
        if (error.response) {
          setError(`Error: ${error.response.status} ${error.response.statusText}`);
        } else if (error.request) {
          setError("Error: No response from server");
        } else {
          setError(`Error: ${error.message}`);
        }
        console.error("Error fetching schedules data:", error);
      }
    };

    fetchSchedules();
  }, [token]);

  return (
    <div className="view-schedules-container">
      <h1 className="view-schedules-heading">View Schedules</h1>
      {error && <p className="view-schedules-error">{error}</p>}
      <div className="view-schedules-list">
        {schedules.length > 0 ? (
          schedules.map((filmGroup) => (
            <div key={filmGroup.film._id} className="view-schedules-item">
              <h2 className="view-schedules-film-title">{filmGroup.film.title}</h2>
              {filmGroup.film.image && (
                <img
                  src={`http://localhost:5001/${filmGroup.film.image}`}
                  alt={filmGroup.film.title}
                  className="view-schedules-image"
                />
              )}
              {filmGroup.schedules.map((schedule) => (
                <div key={schedule._id} className="view-schedules-detail">
                  <p className="view-schedules-showtime">
                    Show Time: {new Date(schedule.showTime).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleScheduleClick(schedule._id)} // Pass the schedule ID
                    className="view-schedules-button"
                  >Edit</button>
                  <button
                    onClick={() => handleScheduleClick_to_showbooking(schedule._id)} // Pass the schedule ID
                    className="view-schedules-button"
                  >Show Booking Details</button>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="view-schedules-no-schedules">No schedules available</p>
        )}
      </div>
    </div>
  );
};

export default ViewShedulesupdatedelete;
