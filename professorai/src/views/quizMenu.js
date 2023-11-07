import React from 'react';
import '../styles/quizMenu.css';
import Navbar from '../components/navbar';
import DisplayCourse from '../components/displayCourse';


function QuizMenu() {

  return (
    <div className='quiz-main'>
      <Navbar />
      <p>Quiz Menu</p>
    <DisplayCourse />
    </div>
  );
}

export default QuizMenu;
