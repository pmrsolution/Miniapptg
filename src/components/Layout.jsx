import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { ChatProvider, useChatContext } from '../context/ChatContext';
import SearchPanel from './SearchPanel';
import useSearchPanel from '../hooks/useSearchPanel';

function ResponsiveLayout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { selectedChatId, setSelectedChatId } = useChatContext();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isWide = windowWidth > 900;

  if (isWide) {
    // Desktop: sidebar + chat-area
    return (
      <div className="tgweb-layout-wide">
        <div className="app-wrapper">
          <Sidebar selectedChatId={selectedChatId} />
          <div className="chat-area">
            <Chat />
          </div>
        </div>
      </div>
    );
  } else {
    // Mobile/narrow: только sidebar или только chat-area
    return (
      <div className="tgweb-layout-narrow">
        {selectedChatId ? (
          <div className="chat-area">
            {/* Кнопка назад */}
            <button
              className="chat-header-btn chat-header-back"
              style={{position:'absolute',left:8,top:8,zIndex:10}}
              onClick={() => setSelectedChatId(null)}
              title="Назад"
            >
              &larr;
            </button>
            <Chat />
          </div>
        ) : (
          <Sidebar selectedChatId={selectedChatId} />
        )}
      </div>
    );
  }
}

export default function Layout() {
  const searchPanel = useSearchPanel();
  const { selectedChatId, setSelectedChatId } = useChatContext();

  const handleResultClick = (item) => {
    if (item.chat_id) setSelectedChatId(item.chat_id);
    searchPanel.onClose();
    setTimeout(() => {
      const el = document.querySelector(`[data-message-id="${item.created_at || item.time}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  return (
    <ChatProvider>
      <ResponsiveLayout />
      <SearchPanel
        open={searchPanel.open}
        onClose={searchPanel.onClose}
        onTabChange={searchPanel.onTabChange}
        activeTab={searchPanel.activeTab}
        query={searchPanel.query}
        setQuery={searchPanel.setQuery}
        results={searchPanel.results}
        isLoading={searchPanel.isLoading}
        error={searchPanel.error}
        highlightedId={searchPanel.highlightedId}
        setHighlightedId={searchPanel.setHighlightedId}
        searchInChat={q => searchPanel.searchInChat(selectedChatId)}
        searchGlobal={searchPanel.searchGlobal}
        navigateResults={searchPanel.navigateResults}
        chatId={selectedChatId}
        onResultClick={handleResultClick}
      />
    </ChatProvider>
  );
} 