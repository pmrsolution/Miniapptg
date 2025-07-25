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

  // Desktop: sidebar + chat-area в одной flex-строке
  if (isDesktop) {
    return (
      <div className="tgweb-layout-wide" style={{display:'flex', flexDirection:'row', height:'100vh', minHeight:0}}>
        <Sidebar selectedChatId={selectedChatId} />
        <div className="chat-area" style={{flex:1, minWidth:0, minHeight:0, display:'flex', flexDirection:'column'}}>
          <Chat />
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