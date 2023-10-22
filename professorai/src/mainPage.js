import React from "react";

import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const goToChat = () => {
    navigate("/chatPlace");
  };

  return (
    <div className="centered-buttons">
      <button onClick={goToChat} className="big-button">
        Ask the AI
      </button>
      <br></br>
      <button className="big-button">Practice the quiz</button>
      <br></br>
      <button className="big-button">Get your feedback</button>
      <br></br>
    </div>
  );
}

export default MainPage;
