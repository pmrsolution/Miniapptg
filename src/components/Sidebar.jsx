import React from 'react';
import { useChatContext } from '../context/ChatContext';
import { MOCK_CHATS } from '../mocks';

export default function Sidebar() {
  const { chats: realChats, setSelectedChatId, isLoading, error } = useChatContext();
  const chats = isLoading || error || !realChats?.length ? MOCK_CHATS : realChats;
  return (
    <div className="sidebar">
      <div className="chat-list">
        {chats.map(c => (
          <div
            key={c.chat_id}
            className="chat-item"
            onClick={() => setSelectedChatId(c.chat_id)}
          >
            <div className="chat-avatar">{c.title?.[0]?.toUpperCase() || '?'}</div>
            <div className="chat-info">
              <div className="chat-name">{c.title}</div>
              <div className="chat-last-message">{c.lastMessage}</div>
              <div className="chat-time">{c.lastTime}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 