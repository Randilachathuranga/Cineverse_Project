import React, { useState } from "react";
import axios from "axios";
import { useAuth } from '../../../AuthContext'; // Import useAuth
import { useNavigate } from "react-router-dom";
import './Userlogin.css'; // Import the CSS file

function Userlogin() {
  const { login } = useAuth(); // Get login function from context
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

      if (response.data.token && response.data._id && response.data.role) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userId", response.data._id);
        login(response.data.role); // Update role in context

        navigate("/Userhome");
      } else {
        setError("Login failed: Missing token, user ID, or role in response.");
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
    <div className="user-login-container">
      <div className="user-login-content">
        <h2 className="user-login-title">Login</h2>
        {error && <div className="user-login-error">{error}</div>}
        <form className="user-login-form" onSubmit={handleSubmit}>
          <div className="user-login-form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="user-login-form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="user-login-submit-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Userlogin;
