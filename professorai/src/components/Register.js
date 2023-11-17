// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/SignInPrompt.css"; // Import the CSS file for styling
// import { register } from "../api/authApi";
// import { AuthContext } from "../App";

// function RegisterPrompt() {
//   const [registerInfo, setregisterInfo] = useState({ firstname: "", lastname: "", emailaddress: "", password: "" });
//   const { setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleregisterInfoChange = (name, value) => {
//     setregisterInfo({ ...registerInfo, [name]: value });
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const handleSignIn = async () => {
//     await register(registerInfo)
//       .then((res) => {
//         setUser(res);
//         localStorage.setItem("accessToken", res.accessToken);
//         alert(`Welcome ${res.firstName} to our app. Thank you for being here`);
//         // Redirect to the dashboard page after signing in
//         navigate("/mainPage"); // Navigate to the '/mainPage' route
//       })
//       .catch((error) => {
//         alert(`Sorry ${error.message}`);
//       });
//   };

//   return (
//     <div className="sign-in-prompt-container">
//       <h1 className="sign-in-title">Sign In</h1>
//       <p>Firstname</p>
//       <input
//         type="text"
//         className="username-input"
//         placeholder="Enter your FirstName"
//         name="firstname"
//         value={registerInfo.firstname}
//         onChange={(e) => handleregisterInfoChange(e.target.name, e.target.value)}
//       />
//       <p>Lastname</p>
//       <input
//         type="text"
//         className="username-input"
//         placeholder="Enter your FirstName"
//         name="lastname"
//         value={registerInfo.lastname}
//         onChange={(e) => handleregisterInfoChange(e.target.name, e.target.value)}
//       />
//       <p>Email</p>
//       <input
//         type="text"
//         className="username-input"
//         placeholder="Enter your email"
//         name="emailaddress"
//         value={registerInfo.email}
//         onChange={(e) => handleregisterInfoChange(e.target.name, e.target.value)}
//       />
//       <p>Password</p>
//       <input
//         type="password"
//         className="username-input"
//         placeholder="Enter your password"
//         name="password"
//         value={registerInfo.password}
//         onChange={(e) => handleregisterInfoChange(e.target.name, e.target.value)}
//       />

//       <button onClick={handleSignIn} className="sign-in-button">
//         Register
//       </button><br></br>
//       <button className="register-button" onClick={() => handleNavigation("/login")}> Already a user?, Log In</button>

//     </div>
//   );
// }

// export default RegisterPrompt;

import React, { useState } from 'react';
import './styles/register.css';
import { register } from "../api/authApi";
import { useNavigate } from 'react-router-dom';

const  Register = () => {
  const [registerInfo, setregisterInfo] = useState({ firstName: "", lastName: "", emailAddress: "", password: "" });
  const navigate = useNavigate();

  const handleregisterInfoChange = (name, value) => {
    setregisterInfo({ ...registerInfo, [name]: value });
  };


  const handleRegister = async () => {
    await register(registerInfo)
      .then((res) => {
          navigate("/login", {state: "Thank you for signing up. Please sign in"})
      })
      .catch((error) => {
        alert(`Sorry ${error.message}`);
      });
  };

  return (
    <div className="App">
      <div className="registration-form">
        <h2>Registration Form</h2>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={registerInfo.firstName}
            onChange={(e) => handleregisterInfoChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={registerInfo.lastName}
            onChange={(e) => handleregisterInfoChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="emailAddress"
            value={registerInfo.email}
            onChange={(e) => handleregisterInfoChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={registerInfo.password}
            onChange={(e) => handleregisterInfoChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className='register-btn'>
        <button onClick = {handleRegister}>Register</button>
        </div>
        <div className="register-button">
        <button onClick={() => navigate("/login")} > Already a user?, Log in</button>
      </div>
      </div>
    </div>
  );
}

export default Register;

