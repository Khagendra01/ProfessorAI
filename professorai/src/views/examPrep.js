import React from 'react';
import '../styles/exam.css';
import Navbar from '../components/navbar';
import DisplayCourse from '../components/displayCourse';


function ExamPrep() {

  return (
    <div className='exam-main'>
      <Navbar />
      <p>exam prep</p>
    <DisplayCourse />
    </div>
  );
}

export default ExamPrep;
