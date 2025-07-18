import React from 'react';
import { FaSearch, FaExpand } from 'react-icons/fa';
import { Avatar } from './Avatar';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="btn" onClick={toggleTheme} title="Сменить тему">
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
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
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