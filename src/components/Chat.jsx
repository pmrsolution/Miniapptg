import React from 'react';
import Messages from './Messages';
import { useChatContext } from '../context/ChatContext';

export default function Chat() {
  const { selectedChatId } = useChatContext();
  return (
    <div style={{display:'flex',flexDirection:'column',flex:1,height:'100dvh'}}>
      <div style={{background:'#ffa',padding:8}}>CHAT BODY</div>
      {selectedChatId ? (
        <Messages chatId={selectedChatId} />
      ) : (
        <div style={{padding:32, fontSize:24, color:'#888'}}>Select a chat</div>
      )}
    </div>
  );
} 