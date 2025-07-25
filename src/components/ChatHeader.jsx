import React from 'react';
import { FaSearch, FaExpand } from 'react-icons/fa';
import { Avatar } from './Avatar';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="chat-header-btn" onClick={toggleTheme} title="Сменить тему">
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
    <div className="chat-header-tgweb">
      <button className="chat-header-btn chat-header-back" onClick={onBack} title="Назад">&larr;</button>
      <div className="chat-header-avatar">{selectedChat.first_name?.[0]?.toUpperCase() || '?'}</div>
      <span className="chat-header-title">{selectedChat.first_name || 'Диалог с пользователем'}</span>
      <span className="chat-header-time">{selectedChat.last_time ? new Date(selectedChat.last_time).toLocaleTimeString() : ''}</span>
      <div className="chat-header-actions">
        <button className="chat-header-btn" onClick={() => setShowChatSearch(s => !s)} title="Поиск"><FaSearch /></button>
        <button className="chat-header-btn" onClick={handleFullscreen} title={isFullscreen ? 'Свернуть' : 'На весь экран'}><FaExpand /></button>
        <button className="chat-header-btn settings-btn" onClick={() => setShowDebugMenu(!showDebugMenu)} title="Меню отладки">⚙️</button>
        <ThemeToggle />
      </div>
    </div>
  );
} 