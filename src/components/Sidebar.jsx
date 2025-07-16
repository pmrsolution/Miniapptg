import React, { useState } from 'react';
import { chatsStub } from '../data/chatsStub'; // замените на реальный запрос
import { Avatar } from './Avatar';

export default function Sidebar({ selectedChat, setSelectedChat }) {
  const [search, setSearch] = useState('');
  const list = chatsStub.filter(ch => ch.first_name.toLowerCase().includes(search.toLowerCase()));
  return (
    <aside className="sidebar">
      <input
        placeholder="Поиск…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="chat-list">
        {list.map(ch => (
          <button
            key={ch.chat_id}
            className={`chat-item ${selectedChat === ch.chat_id ? 'selected' : ''}`}
            onClick={() => setSelectedChat(ch.chat_id)}
          >
            <Avatar letter={ch.first_name?.[0]} />
            <span>{ch.first_name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
} 