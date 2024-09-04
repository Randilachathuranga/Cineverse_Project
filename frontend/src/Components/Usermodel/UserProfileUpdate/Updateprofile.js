import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Updateprofile.css'; // Import the external CSS file

function UpdateProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    name: "",
    phone: "",
    password: "",
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
      await axios.put(
        `http://localhost:5001/api/users/${userId}`,
        user,
        {
          headers: {
            "x-api-key": authToken,
          },
        }
      );
      setSuccess("Profile updated successfully!");
      navigate("/Userhome");
    } catch (error) {
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="update-profile-container">
      <h2 className="update-profile-title">Update Profile</h2>
      {error && <div className="update-profile-error">{error}</div>}
      {success && <div className="update-profile-success">{success}</div>}
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>

        <button type="submit" className="update-profile-button">Update</button>
      </form>
    </div>
  );
}

export default UpdateProfile;
