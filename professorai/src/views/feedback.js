import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Feedback.css"; // Import the CSS file for styling
import Navbar from '../components/navbar';


function Feedback() {

  const navigate = useNavigate();



  return (
    <div className="feed-main">
      <Navbar />
      <div className="feedback-container">
        <h1 className="feedback-title">Feedback</h1>
        <p className="feedback-description">
          Here I am planning to show all the previous taken quiz in different type of chart and graph to see how user is performing.
        </p>
        <form>
          <div className="form-group">
            <label htmlFor="feedback" className="form-label">
              This is title
            </label>
          </div>
          <button onClick={() => navigate("/quizMenu")} className="submit-button">
            Practice now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
