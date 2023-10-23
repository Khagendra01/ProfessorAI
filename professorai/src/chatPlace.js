import React, { useState } from 'react';

import axios from 'axios';

const apiKey = 'cbdc6d35b06840ba94e325df8cc00a63';
const endpoint = 'https://professorai.cognitiveservices.azure.com/';

const chatGPTRequest = async (inputText) => {
  try {
    const response = await axios.post(
      `${endpoint}/YOUR_SPECIFIC_ENDPOINT`, // Replace with the actual endpoint
      {
        prompt: inputText,
      },
      {
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};



function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const [result, setResult] = useState('aa');

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    console.log(chatGPTRequest({text: input}))
    setMessages([...messages, { text: input, user: 'user' }]);
    //setMessages([...messages, "Hi, I am AI"]);
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
          <h1>{result}</h1>
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
