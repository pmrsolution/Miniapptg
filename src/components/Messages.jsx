import React from 'react';

export default function Messages({ chatId }) {
  // Мок-данные для демо
  const mockMessages = [
    { id: 1, text: 'Hello!', from: 'user', created_at: '2024-06-08T14:29:05' },
    { id: 2, text: 'Hi, how can I help you?', from: 'admin', created_at: '2024-06-08T14:29:30' },
    { id: 3, text: 'I have a question.', from: 'user', created_at: '2024-06-08T15:05:55' },
    { id: 4, text: 'Sure, ask me!', from: 'admin', created_at: '2024-06-08T15:08:02' },
  ];
  const messages = mockMessages;
  return (
    <div style={{flex:1, minHeight:0, overflowY:'auto', padding:16, background:'#fff'}}>
      {messages.map(msg => (
        <div key={msg.id} style={{
          marginBottom: 12,
          alignSelf: msg.from === 'user' ? 'flex-start' : 'flex-end',
          background: msg.from === 'user' ? '#e0f7fa' : '#ffe0b2',
          color: '#222',
          borderRadius: 12,
          padding: '10px 16px',
          maxWidth: '70%',
          fontSize: 16,
          boxShadow: '0 1px 4px #0001'
        }}>
          <div>{msg.text}</div>
          <div style={{fontSize:12, color:'#888', marginTop:4}}>{new Date(msg.created_at).toLocaleTimeString()}</div>
        </div>
      ))}
    </div>
  );
} 