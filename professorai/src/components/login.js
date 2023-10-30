import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignInPrompt.css"; // Import the CSS file for styling
import { login } from "../api/authApi";
import { AuthContext } from "../App";

function SignInPrompt() {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginInfoChange = (name, value) => {
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSignIn = async () => {
    await login(loginInfo)
      .then((res) => {
        setUser(res);
        localStorage.setItem("accessToken", res.accessToken);
        alert(`Welcome ${res.firstName}`);
        // Redirect to the dashboard page after signing in
        navigate("/mainPage"); // Navigate to the '/mainPage' route
      })
      .catch((error) => {
        alert(`Sorry ${error.message}`);
      });
  };

  return (
    <div className="sign-in-prompt-container">
      <h2 className="sign-in-title">Sign In</h2>
      <input
        type="text"
        className="username-input"
        placeholder="Enter your username"
        name="username"
        value={loginInfo.username}
        onChange={(e) => handleLoginInfoChange(e.target.name, e.target.value)}
      />
      <input
        type="password"
        className="username-input"
        placeholder="Enter your password"
        name="password"
        value={loginInfo.password}
        onChange={(e) => handleLoginInfoChange(e.target.name, e.target.value)}
      />

      <button onClick={handleSignIn} className="sign-in-button">
        Sign In
      </button>
    </div>
  );
}

export default SignInPrompt;
