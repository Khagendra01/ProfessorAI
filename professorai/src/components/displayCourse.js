import React, { useContext, useEffect } from "react";

import "./styles/displayCourse.css";
import { useNavigate } from "react-router-dom";
import { SubjectContext } from "../wrapper/addSubject";
import { AuthContext } from "../App";

function DisplayCourse(props) {
  const { user } = useContext(AuthContext);
  const { subjects, getData } = useContext(SubjectContext);

  useEffect(() => {
    if (user !== undefined) getData();
  }, [user]);

  const getCardStyles = (displayType) => {
    switch (displayType) {
      case "Note Menu":
        return {
          backgroundColor: "lightblue",
          color: "black",
        };
      case "Quiz Menu":
        return {
          backgroundColor: "lightgreen",
          color: "black",
        };
      case "Exam Preparation":
        return {
          backgroundColor: "lightcoral",
          color: "white",
        };
      default:
        return {
          backgroundColor: "gray",
          color: "black",
        };
    }
  };

  const courseClicked = (id, title) => {
    props.onCourseClicked(id, title);
  };

  return (
    <>
      <h1 className="menu-title"> {props.displayType} </h1>
      <div className="course-list">
        {subjects.map((course) => (
          <div
            onClick={() => courseClicked(course.id, course.name)}
            className="course-card"
            style={getCardStyles(props.displayType)}
          >
            <h2 style={{ textTransform: "capitalize" }}>{course.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default DisplayCourse;
