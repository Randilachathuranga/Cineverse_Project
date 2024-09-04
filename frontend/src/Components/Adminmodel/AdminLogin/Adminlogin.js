import React, { useState } from "react";

import axios from "axios";
import { useAuth } from '../../../AuthContext'; // Adjust path if needed
import { useNavigate } from "react-router-dom";

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
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
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
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Adminlogin;
