import React from "react";

import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const goTo = ( x ) => {
    if(x === 1)
    {
      navigate("/chatPlace");
    }else if(x === 2)
    {
      navigate("/quiz");
    }
    navigate("/feedback");
  };

  return (
    <div className="centered-buttons">
      <button onClick={goTo(1)} className="big-button">
        Ask the AI
      </button>
      <br></br>
      <button onClick={goTo(2)} className="big-button">Practice the quiz</button>
      <br></br>
      <button onClick={goTo(3)} className="big-button">Get your feedback</button>
      <br></br>
    </div>
  );
}

export default MainPage;
