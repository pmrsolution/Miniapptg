import React from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <Chat />
    </div>
  );
} 