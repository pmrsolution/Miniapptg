import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';

// Временная заглушка выбранного чата
const selectedChat = { chat_id: '1', first_name: 'Alice' };

export default function Chat() {
  return (
    <div className="chat-area">
      <div className="chat-header-bar">
        <div className="chat-header-title">{selectedChat.first_name}</div>
      </div>
      <Messages />
      <MessageInput />
    </div>
  );
} 