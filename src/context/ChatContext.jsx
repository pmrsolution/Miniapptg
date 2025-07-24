import React, { createContext, useContext, useState } from 'react';
import useChats from '../hooks/useChats';
import { useUser } from './UserContext';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const { chat_id } = useUser() || {};
  const { data: chats = [], isLoading } = useChats(chat_id);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const selectedChat = chats.find(c => c.chat_id === selectedChatId) || null;

  return (
    <ChatContext.Provider value={{
      chats,
      isLoading,
      selectedChatId,
      setSelectedChatId,
      selectedChat,
      chat_id
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  return useContext(ChatContext);
} 