import React, { useContext, useState } from 'react';
import DrawingCanvas from './draw';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { addNoteToSubject, getNote } from '../api/noteApi';
import { AuthContext } from '../App';

function NoteEditor() {
    const {user} = useContext(AuthContext);
    const {courseId, id} = useParams();
    const [noteValue, setNoteValue] = useState("");
    const[noteCanvas, setNoteCanvas] = useState("");
    const navigate = useNavigate();

    const handleAddNote = () => {
      console.log(noteCanvas);
      // addNoteToSubject({userId : `${user.id}`,
      //           subjectId: `${courseId}`,
      //           noteValue: `${noteValue}`,
      //           noteCanvas: `${noteCanvas}`
      // }).then(()=>{
      //   navigate("/noteMenu")
      // }).catch((error) => {
      //   alert("Something went wrong");
      // });
        
    }

    const handleAddCanvas = (val) => {
      console.log(val);
      setNoteCanvas(val)
    }
    React.useEffect(()=>{
        if(id !== 'create-new'){
        getNote(id).then((response) => {
                setNoteValue(response.noteValue);
                setNoteCanvas(response.noteCanvas)
              })
              .catch((error) => {
                alert("Something went wrong");
              });
        }
    })
    return (
        <>
        <div className="note-form">
          <input
            type="text"
            className="note-input"
            placeholder="Enter your note..."
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
          />
        </div>
        <DrawingCanvas value = {noteCanvas} onChange = {(val)=> handleAddCanvas(val)}/>
        <button className="note-submit" onClick={handleAddNote}>
            Add Note
          </button>
      </>
    );
}

export default NoteEditor;