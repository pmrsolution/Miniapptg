import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';

export default function Layout() {
  const [selectedChat, setSelectedChat] = useState(null);
  return (
    <div className="layout">
      <Sidebar selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
      {selectedChat && <Chat chatId={selectedChat} />}
    </div>
  );
} 