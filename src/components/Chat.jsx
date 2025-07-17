import React, { useState } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { FaSearch, FaExpand } from 'react-icons/fa';
import { useChatContext } from '../context/ChatContext';
import ChatHeader from './ChatHeader';
import { useSearch } from '../hooks/useSearch';

export default function Chat() {
  const { selectedChat, selectedChatId } = useChatContext();
  const [showChatSearch, setShowChatSearch] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDebugMenu, setShowDebugMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const search = useSearch({ chatId: selectedChatId, query: searchQuery });

  if (!selectedChat) {
    return <div className="chat-area"><div className="no-chat-selected"><p>Выберите чат для просмотра сообщений</p></div></div>;
  }

  const handleFullscreen = () => setIsFullscreen(f => !f);

  return (
    <div className={`chat-area${isFullscreen ? ' fullscreen' : ''}`}>
      <ChatHeader
        selectedChat={selectedChat}
        showChatSearch={showChatSearch}
        setShowChatSearch={setShowChatSearch}
        isFullscreen={isFullscreen}
        handleFullscreen={handleFullscreen}
        showDebugMenu={showDebugMenu}
        setShowDebugMenu={setShowDebugMenu}
        onBack={() => {}}
      />
      {showChatSearch && (
        <div className="chat-search-bar">
          <input
            className="chat-search-input"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Поиск по сообщениям..."
            autoFocus
          />
          {search.isFetching && <span className="search-loading">Идёт поиск...</span>}
          {search.data && search.data.output && (
            <div className="search-results">
              {search.data.output.length === 0 && <div className="search-empty">Ничего не найдено</div>}
              {search.data.output.map((msg, i) => (
                <div key={i} className="search-result-item">
                  <div className="search-result-text">{msg.text}</div>
                  <div className="search-result-time">{msg.created_at ? new Date(msg.created_at).toLocaleString() : ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Messages chatId={selectedChatId} />
      <MessageInput chatId={selectedChatId} />
    </div>
  );
} 