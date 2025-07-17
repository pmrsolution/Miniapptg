import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';

const selectedChat = { chat_id: '1', first_name: 'Alice' };

export default function Chat() {
  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="chat-avatar">{selectedChat.first_name[0]}</div>
        <div style={{ marginLeft: 12, fontWeight: 600 }}>{selectedChat.first_name}</div>
        <div style={{ marginLeft: 'auto', color: '#bbb', fontSize: 14 }}>10:18:53</div>
      </div>
      <Messages />
      <MessageInput />
    </div>
  );
} 