import React, { useState } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { useChatContext } from '../context/ChatContext';
import ChatHeader from './ChatHeader';

export default function Chat() {
  const { selectedChat, selectedChatId } = useChatContext();
  const [showChatSearch, setShowChatSearch] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDebugMenu, setShowDebugMenu] = useState(false);

  if (!selectedChat) {
    return <div className="chat"><div className="header" /></div>;
  }

  const handleFullscreen = () => setIsFullscreen(f => !f);

  return (
    <div className="chat">
      <div className="header">
        <ChatHeader
          selectedChat={selectedChat}
          showChatSearch={showChatSearch}
          setShowChatSearch={setShowChatSearch}
          isFullscreen={isFullscreen}
          handleFullscreen={handleFullscreen}
          showDebugMenu={showDebugMenu}
          setShowDebugMenu={setShowDebugMenu}
          onBack={() => {}}
        />
      </div>
      <div className="messages-wrapper">
        <Messages chatId={selectedChatId} />
      </div>
      <div className="input-row">
        <MessageInput chatId={selectedChatId} />
      </div>
    </div>
  );
} 