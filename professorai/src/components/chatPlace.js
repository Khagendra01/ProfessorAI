import React, { useEffect, useState } from "react";
import "../styles/ChatApp.css";
import Navbar from "./navbar";
import { sendMessage } from "../api/chatApi";
function ChatApp() {
  const [messages, setMessages] = useState([]);
  const[sendState, setSendState] = React.useState(false);
  const [input, setInput] = useState("");

  useEffect(()=>{
    console.log(messages);
    if(sendState) send();
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
    try {
      // Get the assistant's response from Azure OpenAI
       await sendMessage(messages).then((response)=>{
        setSendState(false);
        setMessages((prevMessages) => [...prevMessages, response]);
        setInput("");
       });
    } catch (error) {
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
                <div
                  key={index}
                  className={`message ${
                    message.role === "user" ? "user" : "assistant"
                  }`}
                >
                  {message.content}
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
      </div>
    </>
  );
}

export default ChatApp;
