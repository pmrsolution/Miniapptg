import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { ChatProvider, useChatContext } from '../context/ChatContext';

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
  return (
    <ChatProvider>
      <ResponsiveLayout />
    </ChatProvider>
  );
} 