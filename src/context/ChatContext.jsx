import React, { createContext, useContext, useState } from 'react';
import useChats from '../hooks/useChats';
import { useUser } from './UserContext';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const { chat_id } = useUser() || {};
  const { data: chats = [], isLoading } = useChats(chat_id);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const selectedChat = chats.find(c => c.chat_id === selectedChatId) || null;

  const value = {
    chats,
    isLoading,
    selectedChatId,
    setSelectedChatId,
    selectedChat,
    chat_id
  };

  // 1-shot audit
  try {
    JSON.stringify(value, null, 0); // check default reason
    Object.values(value).forEach(v => JSON.stringify(v)); // check every leaf
  } catch (e) {
    console.error('❌ Value is not serialisable', e);
    return <div style={{color:'#f00',padding:8}}>{e.message}</div>;
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  return useContext(ChatContext);
} 