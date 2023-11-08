import React, { useState } from "react";

import "../styles/noteMenu.css";
import Navbar from "../components/navbar";
import DisplayCourse from "../components/displayCourse";

//list of the note recorder by manxe
const notesList = [
  {
    id: 1,
    sender: "John Doe",
    body: "Hi there, this is a sample note body text.",
  },
  {
    id: 2,
    sender: "Jane Smith",
    body: "Don't forget our meeting tomorrow at 10 AM.",
  },
  // Add more note objects as needed
];

function Note() {
  //this will be separate components
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  const addNote = () => {
    if (noteInput.trim() !== "") {
      setNotes([...notes, noteInput]);
      setNoteInput("");
    }
  };
  return (
    <div className="note-main">
      <Navbar />
      <p>note menu</p>
      <DisplayCourse />

      {notesList.map((note) => (
        <div key={note.id} className="note-item">
          <div className="note-sender">{note.sender}</div>
          <div className="note-body">{note.body}</div>
        </div>
      ))}
    
        {/* this will be separate too */}
      <div className="note-form">
        <input
          type="text"
          className="note-input"
          placeholder="Enter your note..."
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        />
        <button className="note-submit" onClick={addNote}>Add Note</button>
      </div>
      <div className="note-list">
        {notes.map((note, index) => (
          <div key={index} className="note">
            {note}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Note;
