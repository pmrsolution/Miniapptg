import React from 'react';
import { Avatar } from './Avatar';

// Временная заглушка сообщений для визуального теста
const messages = [
  { id: 1, from: 'user', text: '1518', first_name: 'Я', time: '15:18:26', date: '11 июля 2025 г.' },
  { id: 2, from: 'bot', text: '1518', first_name: 'Бот', time: '15:18:18', date: '11 июля 2025 г.' },
  { id: 3, from: 'user', text: '17 59', first_name: 'Я', time: '17:59:46', date: '11 июля 2025 г.' },
  { id: 4, from: 'bot', text: 'Й7 59', first_name: 'Бот', time: '17:59:38', date: '11 июля 2025 г.' },
];

export default function Messages() {
  let lastDate = '';
  return (
    <div className="messages-wrapper">
      <div className="messages">
        {messages.map((msg, idx) => {
          const showDate = msg.date !== lastDate;
          lastDate = msg.date;
          return (
            <React.Fragment key={msg.id}>
              {showDate && (
                <div className="date-separator"><span>{msg.date}</span></div>
              )}
              <div className={`message-bubble ${msg.from}`}> 
                <div className="message-avatar">
                  <Avatar letter={msg.first_name[0]} />
                </div>
                <div className="message-content">
                  {msg.text}
                  <div className="message-time">{msg.time}</div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
} 