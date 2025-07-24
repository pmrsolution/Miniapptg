import React from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import WebAppGuard from './components/WebAppGuard';

console.log('🚀 App.js executed');
export default function App() {
  console.log('🎯 App component rendered');
  return <h1 style={{position:'fixed',top:0,left:0,zIndex:9999,background:'red',color:'#fff',padding:'16px'}}>App alive</h1>;
} 