import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from '../components/navbar';


import "./styles/MainPage.css"; // Import the CSS file for styling
import { AuthContext } from "../App";


function MainPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="main-container">
    {/* Navbar */}
    <Navbar />
  
    {/* Main content */}
    <div className="main-page">
      <h1 className="main-title">Hey {user.firstName}, Welcome to Our App</h1>
      <div className="button-container">
        <button onClick={() => handleNavigation("/chatPlace")} className="big-button">
          Talk to my AI
        </button>
        <button onClick={() => handleNavigation("/noteMenu")} className="big-button">
          Take a Note
        </button>
        <button onClick={() => handleNavigation("/examPrep")} className="big-button">
          Prepare for the exam
        </button>
        <button onClick={() => handleNavigation("/quizMenu")} className="big-button">
          Practice the Quiz
        </button>
        <button onClick={() => handleNavigation("/feedback")} className="big-button">
          Get Your Feedback
        </button>
        <button onClick={() => handleNavigation("/learnNew")} className="big-button">
          Learn Something New
        </button>
      </div>
    </div>
  </div>
  
  );
}

export default MainPage;
