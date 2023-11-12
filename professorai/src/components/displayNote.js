import { React, useState } from "react";

import "../styles/displayNote.css";
import {  useNavigate } from "react-router-dom";
import DrawExp from "./draw";

//list of the note recorder by manxe
const notesList = [
  {
    id: 1,
    title: "John Doe",
    date: "Date",
  },
  {
    id: 2,
    title: "Jane Smith",
    date: "Don't forget our meeting tomorrow at 10 AM.",
  },
  // Add more note objects as needed
];

function DisplayNote(props) {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [display, setDisplay] = useState(true);

  const navigate = useNavigate();

  const addNote = () => {
    if (noteInput.trim() !== "") {
      setNotes([...notes, noteInput]);
      setNoteInput("");
    }
  };

  return (
    <>
    <h1>note list</h1>
      { display ? notesList.map((note) => (
        <div onClick={() => { setDisplay(false)}} key={note.id} className="note-item">
          <div className="note-title">{note.title}</div>
          <div className="note-date">{note.date}</div>
        </div>
      )) :     <>
      <div className="note-form">
        <input
          type="text"
          className="note-input"
          placeholder="Enter your note..."
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        />
        <button className="note-submit" onClick={addNote}>
          Add Note
        </button>
      </div>
      <DrawExp />
    </> }

    </>
  );
}

export default DisplayNote;
