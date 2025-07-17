import React, { useState } from 'react';

const chats = [
  { chat_id: '1', first_name: 'Alice', last_message: 'Привет!', photo_url: '' },
  { chat_id: '2', first_name: 'Bob', last_message: 'Как дела?', photo_url: '' },
  { chat_id: '3', first_name: 'Charlie', last_message: 'Добро пожаловать!', photo_url: '' }
];

export default function Sidebar() {
  const [activeId, setActiveId] = useState('1');
  return (
    <aside className="sidebar">
      <div className="sidebar-header">Chats</div>
      <div className="chat-list">
        {chats.map(chat => (
          <div
            key={chat.chat_id}
            className={`chat-item${activeId === chat.chat_id ? ' selected' : ''}`}
            onClick={() => setActiveId(chat.chat_id)}
          >
            <div className="chat-avatar">
              {chat.first_name ? chat.first_name[0] : '?'}
            </div>
            <div className="chat-info">
              <div className="chat-name">{chat.first_name}</div>
              <div className="chat-last-message">{chat.last_message}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
} 