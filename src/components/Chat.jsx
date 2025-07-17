import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { Avatar } from './Avatar';
import { FaArrowLeft, FaSearch, FaExpand, FaCog } from 'react-icons/fa';

// Временная заглушка выбранного чата
const selectedChat = { chat_id: '1', first_name: 'Alice' };

export default function Chat() {
  return (
    <div className="chat-area">
      <div className="chat-header-bar">
        <button className="chat-back-btn"><FaArrowLeft /></button>
        <span className="chat-header-avatar"><Avatar letter={selectedChat.first_name[0]} /></span>
        <span className="chat-header-title">{selectedChat.first_name}</span>
        <span className="chat-header-time">10:18:53</span>
        <span className="chat-header-actions">
          <FaSearch className="chat-header-search-icon" />
          <FaExpand className="chat-fullscreen-btn" />
          <FaCog className="chat-header-settings" />
        </span>
      </div>
      <Messages />
      <MessageInput />
    </div>
  );
} 