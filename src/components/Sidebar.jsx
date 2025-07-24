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
    <div style={{display:'flex',flexDirection:'column',flex:1,padding:8,background:'#fee'}}>
      {chats.map(c => (
        <div
          key={c.chat_id}
          style={{padding:8,marginBottom:4,background:'#cdf',cursor:'pointer'}}
          onClick={() => setSelectedChatId(c.chat_id)}
        >
          {c.title || c.first_name || c.chat_id}
        </div>
      ))}
    </div>
  );
} 