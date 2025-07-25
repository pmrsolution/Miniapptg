import React from 'react';
import Messages from './Messages';
import { useChatContext } from '../context/ChatContext';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';

export default function Chat() {
  const { selectedChatId } = useChatContext();
  return (
    <>
      {selectedChatId ? (
        <>
          <ChatHeader selectedChat={{ first_name: 'Chat', last_time: new Date().toISOString() }} />
          <Messages chatId={selectedChatId} />
          <MessageInput chatId={selectedChatId} />
        </>
      ) : (
        <div className="no-chat-selected">Выберите чат для просмотра сообщений</div>
      )}
    </>
  );
} 