import React from 'react';

import './styles/chatSideBar.css'

const ChatSideBar = ({ chats, setCurrentChat, handleNewChat }) => {
    return (
      <div className="chat-sidebar">
        <h2>Chat History</h2>
        <ul>
          {chats.map((chat, index) => (
            <li key={index} onClick={() => setCurrentChat(chat.title)}>
              {chat.title}
            </li>
          ))}
        </ul>
        <button onClick={handleNewChat}>New Chat</button>
      </div>
    );
  };

export default ChatSideBar;