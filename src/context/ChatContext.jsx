import React from 'react';

export function ChatProvider({ children }) {
  console.log('[ChatProvider] entry');
  return (
    <>
      <div id="chat-provider-active" style={{position:'fixed',top:0,right:0,width:1,height:1,background:'red'}} />
      {children}
    </>
  );
}

export function useChatContext() {
  return {};
} 