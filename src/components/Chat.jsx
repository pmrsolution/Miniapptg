import React from 'react';
import Messages from './Messages';
import { useChatContext } from '../context/ChatContext';

export default function Chat() {
  const { selectedChatId } = useChatContext();
  return (
    <div style={{flex:1, minHeight:0, background:'#f9f9f9', display:'flex', flexDirection:'column', height:'100vh'}}>
      <div style={{background:'#ffa',padding:16,fontWeight:600,fontSize:20}}>Chat</div>
      <div style={{flex:1, minHeight:0, display:'flex', flexDirection:'column'}}>
        {selectedChatId ? (
          <Messages chatId={selectedChatId} />
        ) : (
          <div style={{padding:32, fontSize:24, color:'#888'}}>Select a chat</div>
        )}
      </div>
    </div>
  );
} 