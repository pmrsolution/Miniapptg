import React, { useState } from 'react';

const chats = [
  { chat_id: '1', first_name: 'Alice', last_message: 'Привет!' },
  { chat_id: '2', first_name: 'Bob', last_message: 'Как дела?' },
  { chat_id: '3', first_name: 'Charlie', last_message: 'Добро пожаловать!' }
];

export default function Sidebar() {
  const [activeId, setActiveId] = useState('1');
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Chats</h2>
      </div>
      {chats.map(c => (
        <div
          key={c.chat_id}
          className={`chat-item ${activeId === c.chat_id ? 'active' : ''}`}
          onClick={() => setActiveId(c.chat_id)}
        >
          <span className="chat-item__name">{c.first_name}</span>
          <span className="chat-item__snippet">{c.last_message}</span>
        </div>
      ))}
    </div>
  );
} 