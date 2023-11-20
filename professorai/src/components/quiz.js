import React, { useState, useEffect } from "react";
import "./styles/Quiz.css"; // Import the CSS file for styling

import { sendQuiz } from "../api/chatApi";

function Quiz() {
  const [questions, setQuestions] = useState([{id: 0, questionText: "Question", options: ["a", "b", "c", "d"], correctAnswer: "Answer"}]);

  const [loading, setLoading] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [balancer, setBalancer] = useState(true);

  var quizQuerry = [ {role: "user", content: "Generate 10 multiple-choice questions on the topic of calculus with 4 options and indicate the correct answer. Give me in the format \"1. Question\na) Option1\nb) Option2\nc) Option3\nd) Option4\nAnswer: a) Option1.\n\n\"" }]



  const fetchQuestions = async () => {
    try {
      const response = await sendQuiz(quizQuerry);
      setQuestions(response);
      setLoading(false);
    } catch (error) {
      console.error("Error", error);

    }
  };
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
      <div className="quiz-container">
        { loading && <p>loading...</p> }
        { !loading && balancer && <button onClick={() => {fetchQuestions(); setLoading(true); setBalancer(false)}}>start</button> }
        {showResult ? (
          <div className="quiz-result">
            <h2>Quiz Results</h2>
            <p>{`You scored ${score} out of ${questions.length}.`}</p>
          </div>
        ) :   !loading && !balancer &&( 
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
  );
}

export default Quiz;
