import React, { useState, useEffect } from "react";
import "../styles/Quiz.css"; // Import the CSS file for styling
import Navbar from "./navbar";

import { sendMessage } from "../api/chatApi";

function Quiz() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionText: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      questionText: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      correctAnswer: "Mars",
    },
    {
      id: 3,
      questionText: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
    {
      id: 4,
      questionText: "What club/team is messi going to retire?",
      options: ["fcb", "In Miami", "psg", "al hilal"],
      correctAnswer: "al hilal",
    },
  ]);

  var message = [ {role: "user", content: "Generate 10 multiple-choice questions on the topic of calculus with 4 options and indicate the correct answer." }]

  const[sendState, setSendState] = React.useState(false);

  useEffect(()=>{
    if(sendState) send();
  }, [sendState])

  const send = async() => {
    try {
      // Get the assistant's response from Azure OpenAI
       await sendMessage(message).then((response)=>{
        setSendState(false);
        setQuestions((prevQuestions) => [...prevQuestions, response]);
       });
    } catch (error) {
      console.error("Error", error);
    }
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-main-container">
      <Navbar />
      <div className="quiz-container">
        {showResult ? (
          <div className="quiz-result">
            <h2>Quiz Results</h2>
            <p>{`You scored ${score} out of ${questions.length}.`}</p>
          </div>
        ) : (
          <div className="quiz-question">
            <h2>{`Question ${currentQuestion + 1}`}</h2>
            <p>{questions[currentQuestion].questionText}</p>
            <ul>
              {questions[currentQuestion].options.map((option, index) => (
                <li key={index} onClick={() => handleAnswerClick(option)}>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
