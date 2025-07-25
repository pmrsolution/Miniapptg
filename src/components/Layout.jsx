import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { ChatProvider, useChatContext } from '../context/ChatContext';
import SearchPanel from './SearchPanel';
import useSearchPanel from '../hooks/useSearchPanel';

function ResponsiveLayout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { selectedChatId } = useChatContext();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 768;

  // Desktop: sidebar + chat-area в одной flex-строке, chat-area центрирована и ограничена по ширине
  if (isDesktop) {
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
    // Mobile: если выбран чат — только чат, иначе только sidebar
    return (
      <div className="tgweb-layout-narrow">
        {selectedChatId ? (
          <div className="chat-area">
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