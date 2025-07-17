import React from 'react';
import { FaSearch, FaExpand } from 'react-icons/fa';

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
        <div style={{ position: 'relative' }}>
          <button className="chat-header-btn" onClick={() => setShowDebugMenu(!showDebugMenu)} title="Меню отладки" style={{background: showDebugMenu ? '#34495e' : '#95a5a6', color: '#fff'}}>⚙️</button>
          {showDebugMenu && (
            <div style={{position:'absolute',top:'100%',right:0,background:'#fff',border:'1px solid #ddd',borderRadius:'8px',boxShadow:'0 4px 12px rgba(0,0,0,0.15)',zIndex:1000,minWidth:'200px',padding:'8px'}}>
              <button style={{width:'100%',padding:'8px 12px',border:'none',background:'#3498db',color:'#fff',borderRadius:'4px',margin:'2px 0',cursor:'pointer',fontSize:'14px'}}>🔧 Тест API</button>
              <button style={{width:'100%',padding:'8px 12px',border:'none',background:'#e74c3c',color:'#fff',borderRadius:'4px',margin:'2px 0',cursor:'pointer',fontSize:'14px'}}>🔍 Тест поиска</button>
              <button style={{width:'100%',padding:'8px 12px',border:'none',background:'#9b59b6',color:'#fff',borderRadius:'4px',margin:'2px 0',cursor:'pointer',fontSize:'14px'}}>🌐 Тест URL</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 