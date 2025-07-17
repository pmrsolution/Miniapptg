import React from 'react';
import { useChatContext } from '../context/ChatContext';
import { Avatar } from './Avatar';

export default function Sidebar() {
  const { chats, selectedChatId, setSelectedChatId, isLoading } = useChatContext();
  return (
    <div className="sidebar">
      <input
        className="chat-search"
        placeholder="Поиск..."
      />
      <div>
        {isLoading && <div className="chat-loading">Загрузка...</div>}
        {chats.length === 0 && !isLoading && <div className="chat-empty">Нет чатов</div>}
        {chats.map(chat => (
          <div
            key={chat.chat_id}
            className={`chat-item${selectedChatId === chat.chat_id ? ' active' : ''}`}
            onClick={() => setSelectedChatId(chat.chat_id)}
          >
            <Avatar letter={chat.first_name?.[0]?.toUpperCase() || '?'} />
            <div className="info">
              <div className="name">{chat.first_name || 'Без имени'}</div>
              <div className="snippet">{chat.last_message || ''}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 