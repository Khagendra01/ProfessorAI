import React from 'react';
import '../styles/noteMenu.css';
import Navbar from '../components/navbar';
import DisplayCourse from '../components/displayCourse';


function Note() {

  return (
    <div className='note-main'>
      <Navbar />
    <DisplayCourse />
    </div>
  );
}

export default Note;
