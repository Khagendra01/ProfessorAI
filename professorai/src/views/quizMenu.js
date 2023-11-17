import { React, useState } from "react";
import "./styles/quizMenu.css";
import Navbar from "../components/navbar";
import DisplayCourse from "../components/displayCourse";
import Quiz from "../components/quiz";

function QuizMenu() {
  const [display, setDisplay] = useState(true);

  const handleCourseClicked = () => {
    setDisplay(false);
  };

  return (
    <div className="quiz-main">
      <Navbar />

      {display && (
        <>
          {" "}
          <p>note menu</p>
          <DisplayCourse
            displayType={"noteList"}
            onCourseClicked={handleCourseClicked}
          />{" "}
        </>
      )}

      {!display && <Quiz />}
    </div>
  );
}

export default QuizMenu;
