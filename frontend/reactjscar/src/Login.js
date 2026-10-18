import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import your CSS file

export default function Login() {
  const [usertype, setUsertype] = useState("User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // Added state
  const navigate = useNavigate();

  // Check for existing session on component mount
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      navigate("/userDashboard"); // Redirect to dashboard
    }
  }, [navigate]);

  // Handle normal login
  async function handleLogin(e) {
    e.preventDefault();
    setFormSubmitted(true); // Mark form as submitted

    if (password.length !== 8) {
      return; // Do not proceed if the password length is not 8
    }

    const data = { usertype, email, password };
    try {
      const res = await axios.post("http://localhost:8080/login", data);
      if (res.data === "Admin") {
        alert("Login successfully");
        navigate("/adminDashboard");
      } else if (res.data === "User") {
        alert("Login successfully");
        navigate("/userDashboard");
      } else {
        alert("Invalid Credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Failed to login.");
      alert("Failed to login.");
    }
  }

  // Handle registration
  async function handleRegister(event) {
    event.preventDefault();
    const requestBody = { usertype, email, password };

    try {
      const res = await axios.post("http://localhost:8080/registerUser", requestBody);
      if (res.status === 200) {
        alert("Registration Successful");
        setIsRegistering(false);
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert(err.response?.data || "Registration failed");
      setMessage("Failed to register.");
    }
  }

  return (
    <div className="background-container">
      <div className="containerr mt-1">
        <div className="cardd">
          <h2 className="text-center">
            {isRegistering ? "Register" : "Login"}
          </h2>
          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            <div className="form-group mb-1">
              <label htmlFor="userType">User Type:</label>
              <select
                className="form-control"
                id="userType"
                value={usertype}
                onChange={(e) => setUsertype(e.target.value)}
                disabled={isRegistering && usertype === "Admin"}
              >
                <option value="User">User</option>
                {!isRegistering && <option value="Admin">Admin</option>}
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email">Email ID:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {!isRegistering || (isRegistering && usertype === "User") ? (
              <div className="form-group mb-3">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    if (e.target.value.length <= 8) {
                      setPassword(e.target.value); // Update the password if within limits
                    }
                  }}
                  required
                />
                {formSubmitted && password.length !== 8 && (
                  <small className="text-danger">
                    Password must be exactly 8 characters long.
                  </small>
                )}
              </div>
            ) : null}

            <button type="submit" className="btn btn-primaryss w-100">
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>

          <p className="mt-3 text-center">{message}</p>

          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="btn btn-link d-block mx-auto mt-2"
          >
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
