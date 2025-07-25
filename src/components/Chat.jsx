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
        <div className="chat-area-column" style={{display:'flex', flexDirection:'column', height:'100%', minHeight:0}}>
          <ChatHeader selectedChat={selectedChat} />
          <div style={{flex:1, minHeight:0, display:'flex', flexDirection:'column'}}>
            <Messages chatId={selectedChatId} />
          </div>
          <MessageInput chatId={selectedChatId} />
        </div>
      ) : (
        <div className="no-chat-selected">Выберите чат для просмотра сообщений</div>
      )}
    </>
  );
} 