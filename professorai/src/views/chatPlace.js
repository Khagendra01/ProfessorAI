import React, { useEffect, useState } from "react";


import "./styles/ChatApp.css";
import Navbar from '../components/navbar';

import ChatSidebar from "../components/ChatSideBar";

import { sendMessage } from "../api/chatApi";
import Load from '../assets/loader.gif';

export const Loader = () =>{
  return (
    <img src = {Load} alt = "loader"/>
  )
}
function ChatApp() {
  const [messageRequest, setMessageRequest] = useState( { sessionID: null, title: "New-Chat", lastMessage: null, cacheMessages: [], messages: [{ role: "assistant", content: "Hello, How can I help you today? My name is ProfessorAI." }], totalToken: 0} );

  const[sendState, setSendState] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [currentChat, setCurrentChat] = useState("New-Chat");

  const [chatHistory, setChatHistory] = useState([
    { title: "Default Chat", messages: [] },
    // Add other chat history entries as needed
  ]);

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

    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString();

    setMessageRequest(prevState => ({
      ...prevState,
      lastMessage: { role: "user", content: input, dateTime: formattedDateTime }
    }));

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
       await sendMessage(messageRequest).then((response)=>{
        setSendState(false);
        setTimeout(()=>{setMessageRequest(response);
        setInput("");
        setIsSending(false);},2000);
       })
    } catch (error) {
      setSendState(false);
      setIsSending(false);
      console.error("Error sending message to OpenAI:", error);
    }
  }

  const handleNewChat = () => {
    // Add logic to handle starting a new chat
    const newChatTitle = prompt("Enter a new chat title:") || "New Chat";
    const newChat = { title: newChatTitle, messages: [] };
    setChatHistory([...chatHistory, newChat]);
    setCurrentChat(newChatTitle);
  };

  

  return (
    <>
      <div className="chat-main">
        <Navbar />
        <ChatSidebar chats={chatHistory} setCurrentChat={setCurrentChat} handleNewChat={handleNewChat} />
        <div className="chat-app">
          <div className="chat-container">
          
            <div className="chat-messages">
              {messageRequest.messages.map((message, index) => (
                <div key={index}>
                <p className={message.role === "user"? "user-p" : "assistant-p" }>{message.dateTime},{(message.role === "user"? "Student" : "Professor AI")}:</p>
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
