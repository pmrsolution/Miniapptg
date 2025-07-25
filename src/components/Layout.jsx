import React from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { ChatProvider } from '../context/ChatContext';

export default function Layout() {
  return (
    <ChatProvider>
      <div className="tgweb-layout-wide">
        <Sidebar />
        <div className="chat-area">
          <Chat />
        </div>
      </div>
    </ChatProvider>
  );
} 