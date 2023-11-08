import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/QuizComp.css';

const QuizComp = () => {
    const [currentTopic, setCurrentTopic] = useState('Physics');
    const [question, setQuestion] = useState('What is the SI unit of Force?');
    const [optionA, setOptionA] = useState(null);
    const [optionB, setOptionB] = useState(null);
    const [optionC, setOptionC] = useState(null);
    const [optionD, setOptionD] = useState(null);
    const [correct, setCorrect] = useState('a');
    const [isVisible, setIsVisible] = useState(0);
    const [newTopic, setNewTopic] = useState('');
    const [error, setError] = useState('');
    const [selectedOption, setSelectedOption] = useState('a');
    const [isLoading, setIsLoading] = useState(false);

    // Prevent the api call on very first render. Sample question is displayed instead.
    const isFirstRun = useRef(true);

    // Generate a new question and options by using the API.
    const showQuestion = () => {
        const apiUrl = 'quiz/getQuestion';

        const requestData = {
            topic: currentTopic
        };

        // Loading state is displayed to user with some blank fields.
        setIsVisible(2);
        // Clear the user's selected option for the question as new question will be generated.
        setSelectedOption(null);

        // This helps to disable all the buttons that are associated with so api call.
        setIsLoading(true);

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    setError('{response.status}');
                    throw new Error('{response.status}');
                }
                return response.json();
            })
            .then(data => {
                setQuestion(data.question);
                setOptionA(data.a);
                setOptionB(data.b);
                setOptionC(data.c);
                setOptionD(data.d);
                setCorrect(data.correct);
                setIsVisible(1);

            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            })

    }

    // Topic input field.
    const handleTopicInputChange = (e) => {
        setNewTopic(e.target.value);
    };

    const setTopicCheck = () => {
        // Before setting the topic, validate the user entered topic.
        // Uses the api call to check if the topic is recognized.

        if (newTopic == null || newTopic.trim() === '') {
            setError('Invalid Topic');
        }
        else {
            const requestTopic = {
                userTopic: newTopic
            };

            setIsLoading(true);

            fetch('quiz/getValidation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestTopic)
            })
                .then(response => {
                    if (!response.ok) {
                        setError('{response.status}');
                        throw new Error('{response.status}');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.valid === "yes") {
                        setCurrentTopic(newTopic);
                        setNewTopic(''); // clear the input field.
                        setError('');
                    } else if (data.valid === "no") {
                        setError("Invalid Topic");
                    }
                })
                .catch(error => {
                    setError(error);
                })
                .finally(() => {
                    // change the state of the isLoading once the API call is completed.
                    setIsLoading(false);
                })
        }

    }

    // Handles the event when 'Enter' key is pressed by the user in the topic input field.
    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter' && isLoading === false) {
            setTopicCheck();
        }
    }

    // Handles the user's selection of topic from displayed topics.
    const handleCategoryClick = (categoryName) => {
        if (!isLoading) {
            setCurrentTopic(categoryName);
        }
    }

    // Generate a new question when the current topic changes.
    useEffect(() => {
        // Prevent the api call on the first render as sample question is displayed.
        if (isFirstRun.current) {
            isFirstRun.current = false;
        } else {
            // This code will be executed after 'currentTopic' is updated.
            showQuestion();
        }

    }, [currentTopic]);

    const handleButtonClick = (selectedOption) => {
        if (selectedOption === correct) {
            // User selected the correct option, changes the background color to green.
            setSelectedOption(selectedOption);
        } else {
            // User selected the wrong option, changes the background color to red.
            setSelectedOption(selectedOption);
        }
    }

    return (
        <div className="quizInterface">
            <h1>{currentTopic}</h1>
            {isVisible === 1? (
                <div className="quizContainer">
                    <div className="question-area">
                        <h2>{question}</h2>
                    </div>
                    <div className="options-area">
                        <button
                            onClick={() => handleButtonClick('a')}
                            style={{ backgroundColor: selectedOption === 'a' ? (correct === 'a' ? 'green' : 'red') : 'initial' }}>
                            {optionA}
                        </button>
                        <button
                            onClick={() => handleButtonClick('b')}
                            style={{ backgroundColor: selectedOption === 'b' ? (correct === 'b' ? 'green' : 'red') : 'initial' }}>
                            {optionB}
                        </button>
                        <button
                            onClick={() => handleButtonClick('c')}
                            style={{ backgroundColor: selectedOption === 'c' ? (correct === 'c' ? 'green' : 'red') : 'initial' }}>
                            {optionC}
                        </button>
                        <button
                            onClick={() => handleButtonClick('d')}
                            style={{ backgroundColor: selectedOption === 'd' ? (correct === 'd' ? 'green' : 'red') : 'initial' }}>
                            {optionD}
                        </button>
                    </div>
                </div>
            ) : isVisible === 0?(
                <div className="quizContainer">
                    <div className="question-area">
                            <h3>{question}</h3>
                    </div>
                    <div className="options-area">
                            <button
                                onClick={() => handleButtonClick('a')}
                                style={{ backgroundColor: selectedOption === 'a' ? (correct === 'a' ? 'green' : 'red') : 'initial' }}>
                                Newton (N)
                            </button>
                            <button
                                onClick={() => handleButtonClick('b')}
                                style={{ backgroundColor: selectedOption === 'b' ? (correct === 'b' ? 'green' : 'red') : 'initial' }}>
                                Joule (J)
                            </button>
                            <button
                                onClick={() => handleButtonClick('c')}
                                style={{ backgroundColor: selectedOption === 'c' ? (correct === 'c' ? 'green' : 'red') : 'initial' }}>
                                Watt (W)
                            </button>
                            <button
                                onClick={() => handleButtonClick('d')}
                                style={{ backgroundColor: selectedOption === 'd' ? (correct === 'd' ? 'green' : 'red') : 'initial' }}>
                                Volt (V)
                            </button>
                    </div>
                </div>
                ) : (
                      <div className="quizContainer">
                          <div className="question-area">
                                <h3>LOADING...</h3>
                            </div>
                            <div className="options-area">
                                <button></button>
                                <button></button>
                                <button></button>
                                <button></button>
                          </div>
                      </div>
            )}

            <div className="generateButtonContainer">
                <button disabled={isLoading} onClick={showQuestion}>Generate New Question</button>
            </div>
            <div className="categories">
                <button disabled={isLoading} onClick={() => handleCategoryClick('Physics')}>Physics</button>
                <button disabled={isLoading} onClick={() => handleCategoryClick('Chemistry')}>Chemistry</button>
                <button disabled={isLoading} onClick={() => handleCategoryClick('Geography')}>Geography</button>
                <button disabled={isLoading} onClick={() => handleCategoryClick('Biology')}>Biology</button>
                <button disabled={isLoading} onClick={() => handleCategoryClick('History')}>History</button>
            </div>
            <div className="topicInput">
                <input
                    type="text"
                    placeholder="Enter a new topic"
                    value={newTopic}
                    onChange={handleTopicInputChange}
                    onKeyUp={handleInputKeyPress}   // Handle Enter Key press
                />
                <button disabled={isLoading} onClick={setTopicCheck}>Set</button>
            </div>
            <div className="errorMessageHolder">
                <p className="error-message">{error}</p>
            </div>
        </div>
    );
}

export default QuizComp;