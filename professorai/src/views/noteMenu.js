import React, { useState } from "react";

import "../styles/noteMenu.css";
import Navbar from "../components/navbar";
import DisplayCourse from "../components/displayCourse";
import DisplayNote from "../components/displayNote";

function Note() {
  
  const [display, setDisplay] = useState(true);
  const handleCourseClicked = () => {
    setDisplay(false);
  };

  return (
    <div className="note-main">
      <Navbar />

      
      {display && ( <> <p>note menu</p>
        <DisplayCourse
          displayType={"noteList"}
          onCourseClicked={handleCourseClicked}
        /> </>
      )}

      {!display && <DisplayNote />}
    </div>
  );
}

export default Note;
