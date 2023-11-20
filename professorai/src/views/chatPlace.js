import React, { useEffect, useState } from "react";
import "./styles/ChatApp.css";
import Navbar from '../components/navbar';
import { sendMessage } from "../api/chatApi";
import Load from '../assets/loader.gif';

export const Loader = () =>{
  return (
    <img src = {Load} alt = "loader"/>
  )
}
function ChatApp() {
  const [messages, setMessages] = useState([ { role: "assistant", content: "Hello, How can I help you today? My name is ProfessorAI" } ]);
  const[sendState, setSendState] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(()=>{
    if(sendState) {
      send();
    }
  }, [sendState])

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    // Add the user message to the state

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: input },
    ]);
    setInput("")
    setSendState(true);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const send = async() => {
    setIsSending(true);
    try {
      // Get the assistant's response from Azure OpenAI
       await sendMessage(messages).then((response)=>{
        setSendState(false);
        setTimeout(()=>{setMessages((prevMessages) => [...prevMessages, response]);
        setInput("");
        setIsSending(false);},2000);
       })
    } catch (error) {
      setSendState(false);
      setIsSending(false);
      console.error("Error sending message to OpenAI:", error);
    }
  }

  return (
    <>
      <div className="chat-main">
        <Navbar />
        <div className="chat-app">
          <div className="chat-container">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index}>
                <p className={message.role === "user"? "user-p" : "assistant-p" }>{message.role}:</p>
                <div                 
                  className={`message ${
                    message.role === "user" ? "user" : "assistant"
                  }`}
                >
                   {message.content}
                </div>
                </div>
              ))}
              {isSending && <Loader/>}
            </div>
            <div className="chat-input">
              <input
                type="text"
                className="auth-input"
                placeholder="Type your message..."
                value={input}
                onChange={handleInput}
                onKeyPress={handleKeyPress}
                
              />
              <div className="send-btn" >
              <button onClick={handleSendMessage}>Send</button>
              
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatApp;
