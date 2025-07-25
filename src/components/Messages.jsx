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
    <div className="messages-wrapper">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message-bubble ${msg.from === 'user' ? 'user' : 'bot'}`}>
            <div className="message-avatar">{msg.from === 'user' ? 'Я' : 'Бот'}</div>
            <div className="message-content">
              <div>{msg.text}</div>
              <div className="message-time">{new Date(msg.created_at).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 