import React, { useState, useEffect, useRef } from 'react';
import { useChatContext } from '../context/ChatContext';
import { MOCK_CHATS } from '../mocks';

export default function Sidebar({ selectedChatId }) {
  const { chats: realChats, setSelectedChatId, isLoading, error } = useChatContext();
  const chats = isLoading || error || !realChats?.length ? MOCK_CHATS : realChats;
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  // Сброс поиска по Esc
  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === 'Escape') setSearch('');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Фильтрация чатов
  const filtered = search.trim().length < 2
    ? chats
    : chats.filter(c =>
        (c.title || '').toLowerCase().includes(search.trim().toLowerCase()) ||
        (c.lastMessage || c.last_message || '').toLowerCase().includes(search.trim().toLowerCase())
      );

  return (
    <div className="sidebar">
      <div className="sidebar-search-row">
        <input
          ref={inputRef}
          className="sidebar-search-input"
          type="search"
          placeholder="Поиск..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button
            type="button"
            className="chat-search-btn"
            onClick={() => setSearch('')}
            title="Очистить поиск"
            style={{marginLeft:4}}
          >✕</button>
        )}
      </div>
      <div className="chat-list">
        {filtered.map(c => (
          <div
            key={c.chat_id}
            className={`chat-item${selectedChatId === c.chat_id ? ' selected' : ''}`}
            onClick={() => setSelectedChatId(c.chat_id)}
          >
            <div className="chat-avatar">{c.title?.[0]?.toUpperCase() || '?'}</div>
            <div className="chat-info">
              <div className="chat-name">{c.title}</div>
              <div className="chat-last-message">{c.lastMessage || c.last_message || ''}</div>
              <div className="chat-time">{c.lastTime || c.last_time ? new Date(c.lastTime || c.last_time).toLocaleTimeString() : ''}</div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{padding:16, color:'#888',fontSize:15}}>Нет чатов</div>
        )}
      </div>
    </div>
  );
} 