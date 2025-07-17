import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';

export default function Layout() {
  // selectedChat не используется, так как Chat и Messages сейчас с заглушками
  return (
    <div className="main-content">
      <Sidebar />
      <Chat />
    </div>
  );
} 