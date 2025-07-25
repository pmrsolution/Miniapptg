import React, { useRef, useEffect } from 'react';

export default function Messages({ chatId }) {
  // Мок-данные для демо
  const mockMessages = [
    { id: 1, text: 'Hello!', from: 'user', created_at: '2024-06-08T14:29:05' },
    { id: 2, text: 'Hi, how can I help you?', from: 'admin', created_at: '2024-06-08T14:29:30' },
    { id: 3, text: 'I have a question.', from: 'user', created_at: '2024-06-08T15:05:55' },
    { id: 4, text: 'Sure, ask me!', from: 'admin', created_at: '2024-06-08T15:08:02' },
  ];
  const messages = mockMessages;
  const wrapperRef = useRef(null);

  // Восстановление позиции скролла при смене чата
  useEffect(() => {
    if (!chatId || !wrapperRef.current) return;
    const key = `scroll_${chatId}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const { scrollTop, timestamp } = JSON.parse(saved);
        // Восстанавливаем только если данные не старше 24ч
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          wrapperRef.current.scrollTop = scrollTop;
          return;
        }
      } catch {}
    }
    // Если сообщений мало — скроллим вниз
    if (messages.length < 15) {
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
    }
  }, [chatId, messages.length]);

  // Сохраняем позицию скролла при уходе
  useEffect(() => {
    if (!chatId || !wrapperRef.current) return;
    const key = `scroll_${chatId}`;
    const save = () => {
      localStorage.setItem(key, JSON.stringify({
        scrollTop: wrapperRef.current.scrollTop,
        timestamp: Date.now()
      }));
    };
    wrapperRef.current.addEventListener('scroll', save);
    return () => wrapperRef.current.removeEventListener('scroll', save);
  }, [chatId]);

  return (
    <div className="messages-wrapper" ref={wrapperRef}>
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} data-message-id={msg.created_at || msg.time} className={`message-bubble ${msg.from === 'user' ? 'user' : 'bot'}`}>
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