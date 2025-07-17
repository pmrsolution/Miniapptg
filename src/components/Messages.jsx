import React from 'react';
import { Avatar } from './Avatar';

// Временная заглушка сообщений для визуального теста
const messages = [
  { id: 1, from: 'user', text: 'Привет!', first_name: 'Alice' },
  { id: 2, from: 'bot', text: 'Здравствуйте! Чем могу помочь?', first_name: 'Bot' },
  { id: 3, from: 'user', text: 'Мне нужна помощь с заказом.', first_name: 'Alice' },
  { id: 4, from: 'bot', text: 'Конечно, уточните номер заказа.', first_name: 'Bot' },
];

export default function Messages() {
  return (
    <div className="messages-wrapper">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message-bubble ${msg.from}`}>
            <div className="message-avatar">
              <Avatar letter={msg.first_name?.[0]} />
            </div>
            <div className="message-content">{msg.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 