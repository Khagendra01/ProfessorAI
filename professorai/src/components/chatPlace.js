import React, { useState } from 'react';
import '../styles/ChatApp.css';


const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = "" ;
const azureApiKey = "" ;

const prompt = ["When was Microsoft founded?"];

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

  const getAssistantResponse = async () => {
    try {
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
      const deploymentId = "gpt-35-turbo-instruct";
      const result = await client.getCompletions(deploymentId, prompt);

      for (const choice of result.choices) {
        console.log(choice.text);
        setMessages((prevMessages) =>[...prevMessages, choice.text]);
      }

    } catch (error) {
      console.error('Error getting assistant response from OpenAI:', error);
      return 'An error occurred while communicating with the assistant.';
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
