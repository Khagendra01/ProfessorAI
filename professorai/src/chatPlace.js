import React, { useState, useEffect } from 'react';
import './styles/ChatApp.css';
import openai from 'openai'; // Import the OpenAI SDK

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('Assistant');

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Add the user message to the state
    setMessages([...messages, { text: input, user: 'user' }]);

    // Make an API call to OpenAI to get the response
    const response = await getAssistantResponse(input);

    // Add the assistant's response to the state
    setMessages([...messages, { text: response, user: 'assistant' }]);

    // Clear the input field
    setInput('');
  };

  // Function to get a response from the OpenAI assistant
  const getAssistantResponse = async (userMessage) => {
    const apiKey = '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'; // Replace with your OpenAI API key
    const openaiClient = new openai({ key: apiKey });

    try {
      const response = await openaiClient.completions.create({
        engine: 'text-davinci-002',
        prompt: `User: ${userMessage}\nAssistant:`,
        max_tokens: 150, // You can adjust this as needed
      });

      return response.choices[0].text;
    } catch (error) {
      console.error('OpenAI API error:', error);
      return 'An error occurred while fetching the response.';
    }
  };


  return (
    <div className="chat-app">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.user === 'user' ? 'user' : 'assistant'}`}
            >
              {message.text}
            </div>
          ))}
          <div className="assistant-message">
            <p>{result}</p>
          </div>
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={handleInput}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
