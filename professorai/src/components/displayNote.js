import { React, useState } from "react";

import "./styles/displayNote.css";
import { useNavigate } from "react-router-dom";
import DrawExp from "./draw";
import { TinyMCEEditor } from "tinymce";

//list of the note recorder by manxe
const notesList = [
  {
    id: 0,
    title: "Add a new note",
    date: "+",
  },
  {
    id: 1,
    title: "John Doe",
    date: "Date",
  },
  {
    id: 2,
    title: "Jane Smith",
    date: "01/01/24",
  },
  // Add more note objects as needed
];

function DisplayNote(props) {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [display, setDisplay] = useState(true);

  //const navigate = useNavigate();

  const addNote = () => {
    if (noteInput.trim() !== "") {
      setNotes([...notes, noteInput]);
      setNoteInput("");
    }
  };
  const [content, setContent] = useState("");

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <>
      <h1>note list</h1>
      <div className="note-list">
        {display &&
          notesList.map((note) => (
            <div
              onClick={() => {
                setDisplay(false);
              }}
              key={note.id}
              className="note-item"
            >
              <div className="note-title">{note.title}</div>
              <div className="note-date">{note.date}</div>
            </div>
          ))}
      </div>
      {!display && (
        <>
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
        </>
      )}
    </>
  );
}

export default DisplayNote;
