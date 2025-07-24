import React from 'react';
import { useChatContext } from '../context/ChatContext';

export default function Sidebar() {
  const { chats, setSelectedChatId } = useChatContext();
  console.log('[Sidebar] filteredChats', chats);
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