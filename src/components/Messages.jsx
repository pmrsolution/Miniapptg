import React, { useEffect } from 'react';
import { useMessages } from '../hooks/useMessages';

export default function Messages({ chatId, search, showChatSearch, setShowChatSearch }) {
  console.log('[Messages] chatId:', chatId, 'search:', search);
  const { data, isLoading, isError, error } = useMessages(chatId, search);
  console.log('[Messages] data:', data, 'loading:', isLoading, 'error:', error);

  return (
    <div style={{height:'100dvh', background:'#0f0', color:'black', fontSize:24}}>
      height=100dvh<br/>
      chatId: {JSON.stringify(chatId)}<br/>
      data: {JSON.stringify(data)}<br/>
      loading: {JSON.stringify(isLoading)}<br/>
      error: {JSON.stringify(error)}
    </div>
  );
} 