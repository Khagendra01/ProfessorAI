import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/register.css";
import { login } from "../api/authApi";
import { AuthContext } from "../App";

function SignInPrompt() {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const text = location.state;

  const handleLoginInfoChange = (name, value) => {
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSignIn = async () => {
    setLoading(true); // Start loading

    try {
      const res = await login(loginInfo);
      setUser(res);
      localStorage.setItem("accessToken", res.accessToken);
      // Redirect to the dashboard page after signing in
      navigate("/profile"); // Navigate to the '/mainPage' route
    } catch (error) {
      alert(`Sorry ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="App">
      <div className="registration-form">
        {text && <p>{text}</p>}
        <h1 className="sign-in-title">Sign In</h1>
        <div className="form-group">
          <label htmlFor="firstName">Username</label>
          <input
            type="text"
            className="auth-input"
            placeholder="Enter your username"
            name="username"
            value={loginInfo.username}
            onChange={(e) =>
              handleLoginInfoChange(e.target.name, e.target.value)
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Password</label>
          <input
            type="password"
            className="auth-input"
            placeholder="Enter your password"
            name="password"
            value={loginInfo.password}
            onChange={(e) =>
              handleLoginInfoChange(e.target.name, e.target.value)
            }
          />
        </div>
        <div className="sign-in-button">
          <button onClick={handleSignIn}>
            {loading ? (
              <i className="fa fa-spinner fa-spin" /> // Use a rotating loading icon
            ) : (
              "Sign In"
            )}
          </button>
        </div>
        <div className="register-button">
          <button onClick={() => navigate("/register")}>
            Create a new account
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInPrompt;
