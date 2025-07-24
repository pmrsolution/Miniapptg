import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import WebAppGuard from './components/WebAppGuard';
import { ChatProvider } from './context/ChatContext';

export default function App() {
  return (
    <ThemeProvider>
      <WebAppGuard>
        <ChatProvider>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'turquoise',
              color: 'black',
              fontSize: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            LEVEL-1-SKELETON
          </div>
        </ChatProvider>
      </WebAppGuard>
    </ThemeProvider>
  );
} 