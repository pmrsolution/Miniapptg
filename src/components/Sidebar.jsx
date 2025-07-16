import React, { useState } from 'react';
import useChats from '../hooks/useChats';
import { Avatar } from './Avatar';

export default function Sidebar({ selectedChat, setSelectedChat }) {
  const [search, setSearch] = useState('');
  const { data: chats = [], isLoading, error } = useChats();
  const list = chats.output || chats || [];
  const filtered = list.filter(ch => ch.first_name?.toLowerCase().includes(search.toLowerCase()));
  return (
    <aside className="sidebar">
      <input
        placeholder="Поиск…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="chat-list">
        {isLoading && <div>Загрузка...</div>}
        {error && <div>Ошибка загрузки чатов</div>}
        {filtered.map(ch => (
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