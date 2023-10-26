import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css"; // Import the CSS file for styling

function MainPage() {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="main-page">
      <h1 className="main-title">Welcome to Our App</h1>
      <div className="button-container">
        <button onClick={() => handleNavigation("/chatPlace")} className="big-button">
          Ask the AI
        </button>
        <button onClick={() => handleNavigation("/quiz")} className="big-button">
          Practice the Quiz
        </button>
        <button onClick={() => handleNavigation("/feedback")} className="big-button">
          Get Your Feedback
        </button>
      </div>
    </div>
  );
}

export default MainPage;
