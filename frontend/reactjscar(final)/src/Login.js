import axios from "axios";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import your CSS file
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [profile, setProfile] = useState(null);
  const [usertype, setUsertype] = useState("User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  // Check for existing session on component mount
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setProfile({ email: storedEmail });
      navigate("/userDashboard"); // Redirect to dashboard
    }
  }, [navigate]);

  // Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`);
        setProfile(userInfo.data);
        await handleGoogleLogin(userInfo.data.email);
      } catch (error) {
        console.log('Login Failed:', error);
      }
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  // Handle Google Login
  const handleGoogleLogin = async (email) => {
    try {
      const res = await axios.post("http://localhost:8080/checkUser", { email });
      sessionStorage.setItem("email", email); // Store email in session
      alert(res.data.exists ? "Login successful" : "Registration Successful");
      navigate("/userDashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Google login error:", err);
      alert("Failed to login or register.");
    }
  };

  // Logout function
  const logOut = () => {
    googleLogout();
    setProfile(null);
    sessionStorage.removeItem("email"); // Clear session storage on logout
  };

  // Handle normal login
  async function handleLogin(e) {
    e.preventDefault();
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
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Always show password for manual login, only show for manual registration */}
            {!isRegistering || (isRegistering && usertype === "User") ? (
              <div className="form-group mb-3">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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

          <div>
            {profile ? (
              <div>
                {/* Profile related components can be added here */}
              </div>
            ) : (
              <button onClick={googleLogin} className="btn btn-light w-100 mt-2">
                <FcGoogle /> Sign in with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
