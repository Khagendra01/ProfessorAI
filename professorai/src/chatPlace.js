import React, { useState } from 'react';
import './styles/ChatApp.css'; // Import the CSS file for styling

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const [result, setResult] = useState('Assistant');

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, user: 'user' }]);
    setInput('');
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
