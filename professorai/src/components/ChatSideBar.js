import React from 'react';

import './styles/chatSideBar.css'

const ChatSideBar = ({ chats, handleNewChat }) => {
    return (
      <div className="chat-sidebar">
        <h2>Chat History</h2>
        <button onClick={handleNewChat}>New Chat</button>
        <ul>
          {chats.map((chat, index) => (
            <li key={index} onClick={() => { } }>
              {chat.title}
            </li>
          ))}
        </ul>      
      </div>
    );
  };

export default ChatSideBar;