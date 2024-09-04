import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        setFormData({
          username: "",
          password: "",
          email: "",
          name: "",
          phone: "",
          role: "user",
        });
        navigate("/Userlogin"); // Redirect to UserHome
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
    } finally {
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <br></br>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <br></br>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
                <br></br>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
                <br></br>

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
                <br></br>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Userregistration;
