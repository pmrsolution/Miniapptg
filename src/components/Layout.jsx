import React from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';

export default function Layout() {
  return (
    <div className="main-content">
      <Sidebar />
      <Chat />
    </div>
  );
} 