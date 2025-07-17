import React from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { ChatProvider } from './context/ChatContext';

export default function App() {
  return (
    <div className="app">
      <ChatProvider>
        <Sidebar />
        <Chat />
      </ChatProvider>
    </div>
  );
} 