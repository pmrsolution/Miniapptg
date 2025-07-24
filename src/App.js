import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import WebAppGuard from './components/WebAppGuard';
import { ChatProvider } from './context/ChatContext';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

export default function App() {
  return (
    <ThemeProvider>
      <WebAppGuard>
        <ChatProvider>
          <div style={{
            position: 'fixed',
            inset: 0,
            height: '6px',
            background: 'lime',
            zIndex: 1000
          }} />
          <Sidebar />
          <Chat />
        </ChatProvider>
      </WebAppGuard>
    </ThemeProvider>
  );
} 