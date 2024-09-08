import React, { useState } from "react";

import axios from "axios";
import { useAuth } from '../../../AuthContext'; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import "./Adminlogin.css";

function Adminlogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/login",
        credentials
      );

      if (
        response.data.token &&
        response.data._id &&
        response.data.role === "admin"
      ) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("userRole", response.data.role);
        login(response.data.role); // Update role in context

        navigate("/AdminHome");
      } else {
        setError("Login failed: Missing token or user ID in response.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response) {
        setError(
          "Error: " +
            (error.response.data.msg || "An unexpected error occurred.")
        );
      } else if (error.request) {
        setError("Error: No response received from the server.");
      } else {
        setError("Error: " + error.message);
      }
    }
  };

  return (
    <div className="alogin-container">
      <h2 className="al-h2">Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="al-form">
        <div className="inputs">
          <label className="input-l">Username:</label>
          <input className="input"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            
          />
        </div>
        <div className="inputs">
          <label className="input-l">Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="input"
          />
        </div>
        <button type="submit" className="btn-submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Adminlogin;
