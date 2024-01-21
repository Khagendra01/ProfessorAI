import React, { useState, useEffect } from "react";
import "./styles/Quiz.css"; // Import the CSS file for styling

import { sendQuiz } from "../api/quizApi";

function Quiz( { topic } ) {
  const [questions, setQuestions] = useState([{id: 0, questionText: "Question", options: ["a", "b", "c", "d"], correctAnswer: "Answer"}]);

  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [balancer, setBalancer] = useState(true);
  var quizQuerry = [ {role: "user", content: `Generate 10 multiple-choice questions on the topic of ${topic} with 4 options and indicate the correct answer. Give me in the format \"1. Question\na) Option1\nb) Option2\nc) Option3\nd) Option4\nAnswer: a) Option1.\n\n\"` }]
  
  if(topic === "ai part i"){
    quizQuerry = [ {role: "user", content: `From this text, "
    What does ‘Q’ in Q-learning mean? – Quality
RL with eligibility Traces ______________ : Keep a Fifo Queue
If a machine can change its course of action based on the external environment on its own, the machine is called ___________________________ . Intelligentxim
What is the agent job in n-armed bandit problem? : Maximize Reward over time
Actions in Markov Decision Process have : Both A and B
What was the algorithm used by Deep Blue? (Select all that apply.) : 
: Alpha-beta pruning
: Minimax Algorithm
What is the formula for error driven learning? 
: Q(st ,at ) += α[ rt+1 - Q(st ,at ) ]
Between a given number of actions, once an AI chooses a specific action and receives a reward, provided with a learning rate, we would want it to learn and update our probability for how much that action gives reward. We update that by adding ______ to the existing probability:
: the learning rate * (the reward amount - the existing probability)
What is reinforcement learning?
: Both option 1 and option 2
Which of the following is true about reinforcement learning? 
: All of the above
What can be used to store Q-value (floating point value), for every state, and its corresponding action in that state.    
: Hashmap
What is the formula for Q-learning?
: Q(st ,at ) += α[ rt+1 + 𝛾·max Q(st+1,a) - Q(st ,at ) ]
Reinforcement learning is ...
: Award based learning
Which of the given language is not commonly used for AI? : Perl
In a combinatorial explosion, if you have 10 possible actions per move, and a game is 10 moves long, the game-tree complexity is? : 10^10
Searching all paths all the way down, rather than picking and choosing which paths to search and how far, is called a    ___ : Brute-Force Search
What would be the value of A in this figure?
: 7
The Minimax algorithm uses a strategy for search similar to ________ .  : Depth First Search
What does error-driven learning involve?  : All of the above
T or F : A minimax algorithm is better than reinforcement learning.
: False, because minimax algorithms assume that the opponent will take the best action every time
What will be the output of a search algorithm?
: find shortest path from Initial State to Goal State
What step should be done after planning?
: After planning: Take action with highest value

   "
 
   
   ,Generate  multiple-choice questions with 4 options and indicate the correct answer. Give me in the format \"1. Question\na) Option1\nb) Option2\nc) Option3\nd) Option4\nAnswer: a) Option1.\n\n\"` }]
   }

   if(topic === "ai part ii"){
    quizQuerry = [ {role: "user", content: `From this text, "
    What search is optimal when we want to choose the best possible path?
: Brute-force search
Which is an ethical issue in AI development?
: All of the above
What is AI Winter?
: A quiet period for AI development and research because of droughts of funding.
Who is known as the father of Artificial Intelligence?
: John McCarthy
What is the goal of General AI?
: Human-level Intelligence
A technique that was developed to determine whether a machine could or could not demonstrate the artificial intelligence known as the___
: Turing Test
How can you tell whether a machine is intelligent or not based on the turing test?
: A machine is intelligent if you cannot tell whether it is a machine or a human during a conversation
What is the name of the AI that beat Gary Kasparov, the world champion in chess?
: Deep Blue
What is the Confusion Matrix is used for?
:To get the decision boundary line slope of the supervised learning algorithm
What inspired the perceptron?
: Neurons in human brain
Fill in the blank: "Random weights create random ___"
: Decision boundaries
Which geometrical figure did Frank Rosenblatt use to teach the AI to classify images based on it?
: Triangle
Which is the correct Delta Learning rule equation:
: wi = wi + η[ t - o ]xi
Which of these is true about perceptron?
: A single perceptron can draw a single boundary in your feature- space
Which is NOT an example of supervised learning?
: You keep pressing buttons over and over until you find the correct one which tells you that you won
For the test_train_split function what is the order of the testing and training sets?
: xTrain, xTest, yTrain, yTest
If two classes cannot be separated linearly, can perceptor theorem be applied?
: No
Supervised learning is different from reinforcement learning because, in supervised learning:
: The AI is trained with a data with which the solution is known
What is supervised learning used for? 
: Labeling data

What is true about data in limitations of a perceptron?
: Data must be linearly separable

   "
 
   
   ,Generate  multiple-choice questions with 4 options and indicate the correct answer. Give me in the format \"1. Question\na) Option1\nb) Option2\nc) Option3\nd) Option4\nAnswer: a) Option1.\n\n\"` }]
   }

   if(topic === "ai part iii"){
    quizQuerry = [ {role: "user", content: `From this text, "
    Which of these are activation functions?
: All of the above(step function & linear, ReLu, Leaky ReLu)
Which of the following is true?
(i)On average, neural networks have higher computational rates than conventional computers.
(ii) Neural networks learn by example.
(iii) Neural networks mimic the way the human brain works.
: (i) is true
How many hidden layers do deep neural networks have?
: More than 1
What is used to adjust input weights? 
: A and B( The error between perceptron output, sum of input activations)
What is currently the best function for deep learning?
:ReLu Function
Which of the following is not a Machine Learning Strategy in a Neural Network?
:Supreme Learning
Which of the following is not a part of neural network?
:Processing Layer
How does every neuron in the output layer learn?
:Delta rule
What is Deep Learning? 
: A subfield of Machine Learning concerned with using deep neural networks.
Which of the following is a popular python neural network libraries?
: All answers are correct(Tensorflow/Keras, Pyrenn, Ffnet)
What is the Delta rule?
: The error between perceptron output and target output is used to adjust input weights.
What is Backpropagation?
: The error each successive layer is passed back to the prior layer.

   "
 
   
   ,Generate  multiple-choice questions with 4 options and indicate the correct answer. Give me in the format \"1. Question\na) Option1\nb) Option2\nc) Option3\nd) Option4\nAnswer: a) Option1.\n\n\"` }]
   }

   if(topic === "ai part iv"){
    quizQuerry = [ {role: "user", content: `From this text, "
    What kind of clustering algorithm works by drawing n amount of random points, finding the average location of all points near it, and redrawing the points over and over until they do not shift anymore?
    : K-means clustering
    What is a centroid?
    : The imaginary or real location representing the center of the cluster
    
    Which of these is not a clustering algorithm?
    : BSCAN
    Which of these is not an example of unsupervised learning?
    : Linking
    Which of the following steps is not part of K-means clustering? 
    : Learning the patterns of what type of data points are in each cluster
    Which of the following is a Clustering Algorithm?
    : All of the options( K-means, mean-shift clustering, BIRCH)
    What does RNN stands for?  : Recurrent Neural Network
In a recurrent neural net, the output from the_________________is used as the input back to the hidden layer. : Hidden Layer
What does NGD stand for? : Normalized Google Distance
What do RNNs do? 
: Use the output from a hidden layer as the input back into the hidden layer
In which of the following scenarios, NLP should not be used?
: Finding the most efficient path in a maze
1.What is the drawback of the Exhaustive Search(Full grid search)?
a.Large step sizes make finding solutions slow.
b.Every additional parameter increases the time to solution exponentially.(answ)
c.Creating efficient mesh grid is impossible
d.Uses the larger memory space compared to other algorithms.



2. Which python library should the developer use to import Dual Annealing(dual_annealing) algorithm?
a.hill.optimize
b.hill.climbing
C.scipy.optimize(answ)
D.scipy.climbing



3.Dual Annealing is a version of Simulated Annealing that combines the global stochastic search with a second phase that includes another global search with larger step size
a.True
b.False (answ)

4.What is NOT true about Simulated Annealing:
a.As you get more greedy, your tolerance for worse parameter values increases(answer)
b.It is a type of stochastic hill-climbing
c.there is a balance between exploration and exploration
d.if you’re still in exploratory mood you can move onto worse parameters
   "
 
   
   ,Generate  multiple-choice questions with 4 options and indicate the correct answer. Give me in the format \"1. Question\na) Option1\nb) Option2\nc) Option3\nd) Option4\nAnswer: a) Option1.\n\n\"` }]
   }

  useEffect( () => {
    fetchQuestions();
  },[])
  const fetchQuestions = async () => {
    try {
      const response = await sendQuiz(quizQuerry);
      setQuestions(response);
      setLoading(false);
      setBalancer(false);
    } catch (error) {
      console.error("Error", error);

    }
  };
  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      alert("correct");
    }else{
      alert("incorrect")
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
