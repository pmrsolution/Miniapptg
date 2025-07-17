import React from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { ChatProvider } from '../context/ChatContext';

export default function Layout() {
  return (
    <ChatProvider>
      <Sidebar />
      <Chat />
    </ChatProvider>
  );
} 