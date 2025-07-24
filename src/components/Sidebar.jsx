import React from 'react';
import { useChatContext } from '../context/ChatContext';

export default function Sidebar() {
  const { chats: realChats, setSelectedChatId } = useChatContext();
  const mockChats = [
    { chat_id: 1, title: 'Alice', lastMessage: 'Hi!' },
    { chat_id: 2, title: 'Bob', lastMessage: '👋' },
    { chat_id: 3, title: 'Support Bot', lastMessage: 'Need help?' },
  ];
  const chats = Array.isArray(realChats) && realChats.length ? realChats : mockChats;
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