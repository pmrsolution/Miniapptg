import React from 'react';
import useChats from '../hooks/useChats';
import { useUser } from './UserContext';

export function ChatProvider({ children }) {
  console.log('[A] useUser pre');
  const u = useUser();
  console.log('[A] useUser ok');
  console.log('[B] useChats pre');
  const c = useChats(u?.chat_id);
  console.log('[B] useChats ok');
  try {
    JSON.stringify([u, c]);
  } catch (e) {
    console.error('[JSON leak]', e);
    document.body.innerHTML = `<pre style='color:red'>${e}</pre>`;
  }
  return <>{children}</>;
}

export function useChatContext() {
  return {};
} 