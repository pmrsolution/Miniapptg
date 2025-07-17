import React from 'react';
import { useChatContext } from '../context/ChatContext';

export default function Sidebar() {
  const { chats, selectedChatId, setSelectedChatId, isLoading } = useChatContext();
  return (
    <aside className="sidebar">
      <input
        className="chat-search"
        placeholder="Поиск..."
      />
      <div className="chat-list">
        {isLoading && <div className="chat-loading">Загрузка...</div>}
        {chats.length === 0 && !isLoading && <div className="chat-empty">Нет чатов</div>}
        {chats.map(chat => (
          <div
            key={chat.chat_id}
            className={`chat-item${selectedChatId === chat.chat_id ? ' selected' : ''}`}
            onClick={() => setSelectedChatId(chat.chat_id)}
          >
            <div className="chat-avatar">{chat.first_name?.[0]?.toUpperCase() || '?'}</div>
            <div className="chat-info">
              <div className="chat-title">{chat.first_name || 'Без имени'}</div>
              {/* Можно добавить chat.last_message, chat.last_time и т.д. */}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
} 