import React from 'react';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'lime',
          fontSize: 24,
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        LIME TEST 100vh
      </div>
      {/* <WebAppGuard><ChatProvider>... etc.</ChatProvider></WebAppGuard> */}
    </ThemeProvider>
  );
} 