import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewAdminprofile.css";

function ViewAdminprofile() {
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
          // Server responded with a status code outside of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
          setError(
            `Failed to fetch user data: ${
              error.response.data.msg || error.response.statusText
            }`
          );
        } else if (error.request) {
          // Request was made but no response received
          console.error(
            "Request made but no response received:",
            error.request
          );
          setError(
            "No response from server. Please check your network connection."
          );
        } else {
          // Something else caused the error
          console.error("Error setting up request:", error.message);
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
      <div className="admin-profile-container">
        <h2 className="profile-title">Admin Profile</h2>
        <p className="profile-item">
          <strong>Username:</strong> {user.username}
        </p>
        <p className="profile-item">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="profile-item">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="profile-item">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="profile-item">
          <strong>password:</strong> {user.password}
        </p>
        <p className="profile-item">
          <strong>Role:</strong> {user.role}
        </p>
      </div>
  );
}

export default ViewAdminprofile;
