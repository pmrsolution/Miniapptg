import React from 'react';
import { useChatContext } from '../context/ChatContext';

export default function Sidebar() {
  const { chats: realChats, setSelectedChatId } = useChatContext();
  const mockChats = [
    { chat_id: 1, title: 'Kimi-Test-Chat-1', lastMessage: 'Hi' },
    { chat_id: 2, title: 'Kimi-Test-Chat-2', lastMessage: '👋' },
    { chat_id: 3, title: 'Kimi-Test-Chat-3', lastMessage: 'Test' },
  ];
  const chats = Array.isArray(realChats) && realChats.length ? realChats : mockChats;
  console.log('[Sidebar] using', chats.length, 'chats');
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
            padding: 8,
            marginBottom: 4,
            background: '#cdf',
            color: '#222',
            cursor: 'pointer',
            borderRadius: 6
          }}
          onClick={() => setSelectedChatId(c.chat_id)}
        >
          {c.title || c.first_name || c.chat_id}
        </div>
      ))}
    </div>
  );
} 