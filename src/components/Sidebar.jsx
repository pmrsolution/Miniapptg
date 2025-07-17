import React from 'react';
import { useChatContext } from '../context/ChatContext';

export default function Sidebar() {
  const { chats, selectedChatId, setSelectedChatId, isLoading } = useChatContext();
  return (
    <aside className="sidebar">
      <div className="sidebar-header">Чаты</div>
      <div className="chat-list">
        {isLoading && <div className="chat-loading">Загрузка...</div>}
        {chats.map(chat => (
          <div
            key={chat.chat_id}
            className={`chat-item${selectedChatId === chat.chat_id ? ' selected' : ''}`}
            onClick={() => setSelectedChatId(chat.chat_id)}
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