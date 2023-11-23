import { React, useContext, useEffect, useState } from "react";

import "./styles/displayNote.css";
import DrawExp from "./draw";
import { SubjectContext } from "../wrapper/addSubject";
import { AuthContext } from "../App";
import { getNotes } from "../api/noteApi";
import { useNavigate } from "react-router-dom";

//list of the note recorder by manxe

function DisplayNote({ courseId }) {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = async () => {
    getNotes({
      userId: user.id,
      subjectId: courseId,
    }).then((response) => {
        setNotes(response);
        console.log(response)
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };

  return (
    <>
      <h1 >NoteList </h1>
      <div className="note-list">
        <div
          onClick={() => {
            navigate(`/${courseId}/notes/create-new`);
          }}
          className="note-item"
          style={ { backgroundColor: "greenyellow", color: "black"} }
        >
          <div className="note-title">Add a new note</div>
          <div className="note-date">+</div>
        </div>
        {notes.map((note) => (
          <div
            onClick={() => {
              navigate(`/${courseId}/notes/${note.id}`);
            }}
            key={note.id}
            className="note-item"
          >
            <div className="note-title">{note.noteValue}</div>
            <div className="note-date">{"note.date"}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DisplayNote;
