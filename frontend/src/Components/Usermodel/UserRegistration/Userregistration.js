import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Userregistration.css';  // Import the CSS file
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';

function Userregistration() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    phone: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/register",
        formData
      );
      
      if (response.data.success) {
        localStorage.setItem('email', formData.email); // Store email from form data
        localStorage.setItem('userId', response.data.userId);
        // Reset form data
        setFormData({
          username: "",
          password: "",
          email: "",
          name: "",
          phone: "",
          role: "user",
        });
        navigate("/Userlogin"); // Redirect to Userlogin
      } else {
        setError("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response) {
        setError(
          "Error: " +
            (error.response.data.error || "An unexpected error occurred.")
        );
      } else if (error.request) {
        setError("Error: No response received from the server.");
      } else {
        setError("Error: " + error.message);
      }
    }
  };

  return (
    <div className="user-registration-container">
      <div className="user-registration-content">
        <h2 className="user-registration-title">Register</h2>
        {error && <div className="user-registration-error">{error}</div>}
        <form onSubmit={handleSubmit} className="user-registration-form">
          <div className="user-registration-form-group">
          <label><PersonIcon/></label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="user-registration-input"
            />
          </div>
          <div className="user-registration-form-group">
          <label><KeyIcon/></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="user-registration-input"
            />
          </div>
          <div className="user-registration-form-group">
          <label><EmailIcon/></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="user-registration-input"
            />
          </div>
          <div className="user-registration-form-group">
          <label><PersonIcon/></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="user-registration-input"
            />
          </div>
          <div className="user-registration-form-group">
          <label><PhoneIcon/></label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="user-registration-input"
            />
          </div>
          <div className="user-registration-submit">
          <button type="submit" className="user-registration-submit-button">
            Register
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Userregistration;
