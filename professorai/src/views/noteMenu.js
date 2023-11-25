import React, { useState } from "react";

import "./styles/noteMenu.css";
import Navbar from "../components/navbar";
import DisplayCourse from "../components/displayCourse";
import DisplayNote from "../components/Notes/displayNote";
import { useLocation } from "react-router-dom";

function Note() {
  const [display, setDisplay] = useState(true);
  const [courseId, setCourseId] = useState();


  const handleCourseClicked = ( id ) => {
    setDisplay(false);
    setCourseId(id);
  };

  return (
    <div className="note-main">
      <Navbar />

      {display && (
        <>
          {" "}     
          <DisplayCourse
            displayType={"Note Menu"}
            onCourseClicked={handleCourseClicked}
          />{" "}
        </>
      )}

      {!display && <DisplayNote courseId={courseId}/>}
    </div>
  );
}

export default Note;
