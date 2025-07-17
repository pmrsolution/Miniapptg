import React, { useState, useEffect } from 'react';
import { FaSearch, FaExpand } from 'react-icons/fa';
import { Avatar } from './Avatar';

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <button className="btn" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} title="Сменить тему">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

export default function ChatHeader({
  selectedChat,
  showChatSearch,
  setShowChatSearch,
  isFullscreen,
  handleFullscreen,
  showDebugMenu,
  setShowDebugMenu,
  onBack
}) {
  if (!selectedChat) return null;
  return (
    <>
      <button className="btn back-btn" onClick={onBack} title="Назад">&larr;</button>
      <Avatar letter={selectedChat.first_name?.[0]?.toUpperCase() || '?'} />
      <span className="name">{selectedChat.first_name || 'Диалог с пользователем'}</span>
      <div style={{ flex: 1 }} />
      <button className="btn" onClick={() => setShowChatSearch(s => !s)} title="Поиск"><FaSearch /></button>
      <button className="btn" onClick={handleFullscreen} title={isFullscreen ? 'Свернуть' : 'На весь экран'}><FaExpand /></button>
      <button className="btn settings-btn" onClick={() => setShowDebugMenu(!showDebugMenu)} title="Меню отладки">⚙️</button>
      <ThemeToggle />
    </>
  );
} 