import React, { createContext, useContext, useState } from 'react';
import useChats from '../hooks/useChats';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const { data: chats = [], isLoading } = useChats();
  const [selectedChatId, setSelectedChatId] = useState(null);

  const selectedChat = chats.find(c => c.chat_id === selectedChatId) || null;

  return (
    <ChatContext.Provider value={{
      chats,
      isLoading,
      selectedChatId,
      setSelectedChatId,
      selectedChat
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  return useContext(ChatContext);
} 