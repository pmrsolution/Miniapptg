import React from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import WebAppGuard from './components/WebAppGuard';

export default function App() {
  return (
    <WebAppGuard>
      <ThemeProvider>
        <div className="app">
          <ChatProvider>
            <aside className="sidebar">
              <Sidebar />
            </aside>
            <main className="chat">
              <Chat />
            </main>
          </ChatProvider>
        </div>
      </ThemeProvider>
    </WebAppGuard>
  );
} 