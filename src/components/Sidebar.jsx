import React from 'react';
import { useChatContext } from '../context/ChatContext';
import { MOCK_CHATS } from '../mocks';

export default function Sidebar() {
  const { chats: realChats, setSelectedChatId, isLoading, error } = useChatContext();
  const chats = isLoading || error || !realChats?.length ? MOCK_CHATS : realChats;
  return (
    <div style={{
      width: 240,
      minWidth: 180,
      maxWidth: 320,
      background: '#fff',
      borderRight: '1px solid #eee',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      padding: 8
    }}>
      {chats.map(c => (
        <div
          key={c.chat_id}
          style={{
            padding: 12,
            marginBottom: 8,
            background: '#cdf',
            color: '#222',
            cursor: 'pointer',
            borderRadius: 8,
            fontWeight: 500,
            fontSize: 18
          }}
          onClick={() => setSelectedChatId(c.chat_id)}
        >
          {c.title}
          <div style={{fontSize:14, color:'#666'}}>{c.lastMessage}</div>
        </div>
      ))}
    </div>
  );
} 