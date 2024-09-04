import './Viewprofile.css'; // Import the CSS file

import React, { useEffect, useState } from "react";

import axios from "axios";

function Viewprofile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        const storedAuthToken = localStorage.getItem("authToken");

        if (!storedUserId || !storedAuthToken) {
          setError("User ID or Token is missing.");
          console.error("User ID or Token is missing from localStorage.");
          return;
        }

        setUserId(storedUserId);
        setAuthToken(storedAuthToken);

        console.log("User ID:", storedUserId);
        console.log("Token:", storedAuthToken);

        const response = await axios.get(
          `http://localhost:5001/api/users/${storedUserId}`,
          {
            headers: {
              "x-api-key": storedAuthToken, // Change from 'Authorization' to 'x-api-key'
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);

        if (error.response) {
          setError(
            `Failed to fetch user data: ${
              error.response.data.msg || error.response.statusText
            }`
          );
        } else if (error.request) {
          setError(
            "No response from server. Please check your network connection."
          );
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contact-container">
      <div className="content-overlay">
        <div className="container">
          <h2 className="contact-title">User Profile</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="info-item">
                <strong className="info-title">Username:</strong>
                <p className="info-text">{user.username}</p>
              </div>
              <div className="info-item">
                <strong className="info-title">Email:</strong>
                <p className="info-text">{user.email}</p>
              </div>
              <div className="info-item">
                <strong className="info-title">Name:</strong>
                <p className="info-text">{user.name}</p>
              </div>
              <div className="info-item">
                <strong className="info-title">Phone:</strong>
                <p className="info-text">{user.phone}</p>
              </div>
              <div className="info-item">
                <strong className="info-title">Password:</strong>
                <p className="info-text">{user.password}</p>
              </div>
              <div className="info-item">
                <strong className="info-title">Role:</strong>
                <p className="info-text">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewprofile;
