import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateAdmin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    name: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedAuthToken = localStorage.getItem("authToken");
        const storedUserId = localStorage.getItem("userId");
        setAuthToken(storedAuthToken);
        setUserId(storedUserId);

        if (!storedAuthToken || !storedUserId) {
          setError("User ID or Token is missing.");
          return;
        }

        const response = await axios.get(
          `http://localhost:5001/api/users/${storedUserId}`,
          {
            headers: {
              "x-api-key": storedAuthToken,
            },
          }
        );

        // Set user data in state
        setUser(response.data);
      } catch (error) {
        setError("Failed to fetch user data.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5001/api/users/${userId}`,
        user,
        {
          headers: {
            "x-api-key": authToken,
          },
        }
      );
      setSuccess("Profile updated successfully!");
      navigate("/AdminHome");
    } catch (error) {
      setError("Failed to update profile.");
    }
  };

  return (
    <div>
      <div style={styles.container}>
        <h2>Update Profile</h2>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password" // Correct type for password input
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter new password" // Added placeholder for clarity
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default UpdateAdmin;
