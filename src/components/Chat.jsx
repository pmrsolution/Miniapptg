import React from 'react';
import Messages from './Messages';
import { useChatContext } from '../context/ChatContext';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';

export default function Chat() {
  const { selectedChatId, selectedChat } = useChatContext();
  return (
    <>
      {selectedChatId ? (
        <div className="chat-area-column">
          <ChatHeader selectedChat={selectedChat} />
          <Messages chatId={selectedChatId} />
          <MessageInput chatId={selectedChatId} />
        </div>
      ) : (
        <div className="no-chat-selected">Выберите чат для просмотра сообщений</div>
      )}
    </>
  );
} 