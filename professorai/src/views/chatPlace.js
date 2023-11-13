import React, { useEffect, useState } from "react";
import "../styles/ChatApp.css";
import Navbar from '../components/navbar';
import { sendMessage } from "../api/chatApi";
import Load from '../assets/loader.gif';

export const Loader = () =>{
  return (
    <img src = {Load} alt = "loader"/>
  )
}
function ChatApp() {
  const [messages, setMessages] = useState([ ]);
  const[sendState, setSendState] = React.useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = React.useState(false);

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
    setSendState(true);
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
                <>
                {message.role}:
                <div
                  key={index}
                  className={`message ${
                    message.role === "user" ? "user" : "assistant"
                  }`}
                >
                   {message.content}
                </div>
                </>
              ))}
              {isSending && <Loader/>}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={handleInput}
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
