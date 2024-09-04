import React, { useState } from "react";

import axios from "axios";
import { useAuth } from '../../../AuthContext'; // Import useAuth
import { useNavigate } from "react-router-dom";

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
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "300px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
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
    marginBottom: "15px",
  },
};

export default Userlogin;
