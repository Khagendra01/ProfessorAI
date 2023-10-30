import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignInPrompt.css"; // Import the CSS file for styling
import { register } from "../api/authApi";
import { AuthContext } from "../App";

function RegisterPrompt() {
  const [registerInfo, setregisterInfo] = useState({ firstname: "", lastname: "", emailaddress: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleregisterInfoChange = (name, value) => {
    setregisterInfo({ ...registerInfo, [name]: value });
  };

  const handleSignIn = async () => {
    await register(registerInfo)
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
      <h1 className="sign-in-title">Sign In</h1>
      <p>Firstname</p>
      <input
        type="text"
        className="username-input"
        placeholder="Enter your FirstName"
        name="firstname"
        value={registerInfo.firstname}
        onChange={(e) => handleregisterInfoChange(e.target.name, e.target.value)}
      />
      <p>Lastname</p>
      <input
        type="text"
        className="username-input"
        placeholder="Enter your FirstName"
        name="lastname"
        value={registerInfo.lastname}
        onChange={(e) => handleregisterInfoChange(e.target.name, e.target.value)}
      />
      <p>Email</p>
      <input
        type="text"
        className="username-input"
        placeholder="Enter your email"
        name="emailaddress"
        value={registerInfo.email}
        onChange={(e) => handleregisterInfoChange(e.target.name, e.target.value)}
      />
      <p>Password</p>
      <input
        type="password"
        className="username-input"
        placeholder="Enter your password"
        name="password"
        value={registerInfo.password}
        onChange={(e) => handleregisterInfoChange(e.target.name, e.target.value)}
      />

      <button onClick={handleSignIn} className="sign-in-button">
        Register
      </button>
    </div>
  );
}

export default RegisterPrompt;
