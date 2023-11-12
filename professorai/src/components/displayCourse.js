import React from "react";

import "../styles/displayCourse.css";
import { useNavigate } from "react-router-dom";

const courseData = [
  {
    id: 1,
    title: "General",
    description: "Note",
  },
  {
    id: 2,
    title: "Chemistry",
    description: "Chemistry Fundamentals",
  },
  // Add more courses as needed
];

function DisplayCourse(props) {
  //const navigate = useNavigate();

  const courseClicked = () => {
    props.onCourseClicked();
  };

  return (
    <>
      <div className="course-list">
        {courseData.map((course) => (
          <div onClick={() => courseClicked()} className="course-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default DisplayCourse;
