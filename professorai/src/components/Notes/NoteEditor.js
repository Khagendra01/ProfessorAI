import React, { useState } from "react";
import DrawingCanvas from "./draw";
import { useNavigate, useParams } from "react-router-dom";
import { getNote, removeNote } from "../../api/noteApi";

import Navbar from "../navbar";

import "./styles/noteEditor.css";

function NoteEditor() {

  const navigate = useNavigate();

  const { courseId, id } = useParams();
  const [noteValue, setNoteValue] = useState("");
  const [canvasValue, setCanvasValue] = useState(null);

  React.useEffect(() => {
    if (id !== "create-new") {
      getNote(id)
        .then((response) => {
          setNoteValue(response.noteValue);
          setCanvasValue(response.noteCanvas);
        })
        .catch((error) => {
          alert("Something went wrong");
        });
    }
  }, []);

  const deleteIt = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      if (id === "create-new") {
        setNoteValue("");
        setCanvasValue(null);
      } else {
        removeNote(id)
          .then(() => {
            alert("Note Deleted Succesfully")
            navigate("/noteMenu")
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    }
  };

  return (
    <div className="note-main">
      <Navbar />
      <button
        onClick={() => {
          deleteIt();
        }}
        className="delete"
      >
        {" "}
        Delete{" "}
      </button>
      <div className="note-form">
        <textarea
          className="note-input"
          placeholder="Enter your note..."
          rows={10} // Set the number of rows as per your requirement
          cols={10} // Set the number of columns as per your requirement
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
        />

        <DrawingCanvas
          noteValue={noteValue}
          courseId={courseId}
          canvasValue={canvasValue}
        />
      </div>
    </div>
  );
}

export default NoteEditor;
