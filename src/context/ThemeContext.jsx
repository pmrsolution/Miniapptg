import React from 'react';

export function ThemeProvider({ children }) {
  console.log('[ThemeProvider] entry');
  return (
    <>
      <div id="theme-provider-active" style={{position:'fixed',top:0,right:'10px',width:1,height:1,background:'blue'}} />
      {children}
    </>
  );
}

export function useTheme() {
  return {};
} 