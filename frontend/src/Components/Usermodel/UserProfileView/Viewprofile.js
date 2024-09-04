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
    <div>
      <div style={styles.container}>
        <h2>User Profile</h2>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Password:</strong> {user.password}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default Viewprofile;
