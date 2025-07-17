import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Avatar } from './Avatar';

// Временная заглушка чатов для визуального теста
const chats = [
  { chat_id: '1', first_name: 'Alice', last_message: 'Привет!' },
  { chat_id: '2', first_name: 'Bob', last_message: 'Как дела?' },
  { chat_id: '3', first_name: 'Charlie', last_message: 'Добро пожаловать!' }
];

export default function Sidebar() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('1');
  const filtered = chats.filter(ch => ch.first_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <aside className="sidebar">
      <div className="sidebar-search-row">
        <span className="sidebar-search-icon"><FaSearch /></span>
        <input
          className="sidebar-search-input"
          placeholder="Поиск..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="sidebar-search-clear" onClick={() => setSearch('')}>×</button>
        )}
      </div>
      <div className="chat-list">
        {filtered.map(ch => (
          <div
            key={ch.chat_id}
            className={`chat-item${selected === ch.chat_id ? ' selected' : ''}`}
            onClick={() => setSelected(ch.chat_id)}
          >
            <span className="chat-avatar"><Avatar letter={ch.first_name[0]} /></span>
            <div className="chat-info">
              <div className="chat-name">{ch.first_name}</div>
              <div className="chat-last-message">{ch.last_message}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
} 