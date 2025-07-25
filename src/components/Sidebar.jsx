import React from 'react';
import { useChatContext } from '../context/ChatContext';
import { MOCK_CHATS } from '../mocks';

export default function Sidebar() {
  const { chats: realChats, setSelectedChatId, isLoading, error } = useChatContext();
  const chats = isLoading || error || !realChats?.length ? MOCK_CHATS : realChats;
  return (
    <div className="sidebar">
      {chats.map(c => (
        <div
          key={c.chat_id}
          className="chat-item"
          onClick={() => setSelectedChatId(c.chat_id)}
        >
          {c.title}
          <div style={{fontSize:14, color:'#666'}}>{c.lastMessage}</div>
        </div>
      ))}
    </div>
  );
} 