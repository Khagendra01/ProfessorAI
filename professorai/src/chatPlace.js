import React, { useState } from 'react';
import './styles/ChatApp.css';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Add the user message to the state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, user: 'user' },
    ]);

    try {
      // Make an API call to OpenAI to get the response
      const response = await getAssistantResponse(input);

      // Add the assistant's response to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, user: 'assistant' },
      ]);

      // Clear the input field
      setInput('');
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
    }
  };

  const getAssistantResponse = async (userMessage) => {
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage }),
      });

      const data = await response.json();

      if (data && data.response) {
        return data.response;
      } else {
        throw new Error('Invalid response from OpenAI');
      }
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
