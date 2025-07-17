import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { useMessages } from '../hooks/useMessages';

function MessageImage({ fileUrl, fileName }) {
  const [imageError, setImageError] = React.useState(false);
  const [actualImageUrl, setActualImageUrl] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!fileUrl) {
      setLoading(false);
      return;
    }
    if (fileUrl.startsWith('http')) {
      setActualImageUrl(fileUrl);
      setLoading(false);
      return;
    }
    const getImageUrl = async () => {
      try {
        setLoading(true);
        const cleanFileId = fileUrl.trim();
        const getFileResponse = await fetch(`https://api.telegram.org/bot8176156909:AAFppRxHM8-wQgtD-LY3OWku5kiD2v-LHpo/getFile?file_id=${encodeURIComponent(cleanFileId)}`);
        if (!getFileResponse.ok) throw new Error('Не удалось получить file_path');
        const getFileData = await getFileResponse.json();
        if (!getFileData.ok || !getFileData.result.file_path) throw new Error('file_path не найден в ответе');
        const finalUrl = `https://api.telegram.org/file/bot8176156909:AAFppRxHM8-wQgtD-LY3OWku5kiD2v-LHpo/${getFileData.result.file_path}`;
        setActualImageUrl(finalUrl);
        setLoading(false);
      } catch (error) {
        setImageError(true);
        setLoading(false);
      }
    };
    getImageUrl();
  }, [fileUrl]);

  if (loading) {
    return <div className="image-loading"><span>⏳</span><span>Загрузка...</span></div>;
  }
  if (imageError || !actualImageUrl) {
    return <div className="image-error"><span>🖼️</span><span>Изображение недоступно</span><span>{fileName}</span></div>;
  }
  return <img src={actualImageUrl} alt={fileName||'image'} className="message-img" onError={()=>setImageError(true)} onClick={()=>window.open(actualImageUrl,'_blank')} />;
}

export default function Messages({ chatId, search }) {
  const messagesEndRef = useRef(null);
  const wrapperRef = useRef(null);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useMessages(chatId, search);
  const messages = data?.pages?.flatMap(page => page) || [];
  const [highlighted, setHighlighted] = useState([]);

  // Подсветка найденных сообщений исчезает через 1.5 сек
  useEffect(() => {
    if (search && search.length >= 2) {
      const ids = messages
        .filter(msg => msg.text && msg.text.toLowerCase().includes(search.toLowerCase()))
        .map(msg => msg.time || msg.created_at);
      setHighlighted(ids);
      const timer = setTimeout(() => setHighlighted([]), 1500);
      return () => clearTimeout(timer);
    }
  }, [search, messages]);

  // Скролл к самому низу
  useLayoutEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
    }
  }, [messages]);

  const isHighlight = (msg) => highlighted.includes(msg.time || msg.created_at);

  return (
    <div ref={wrapperRef} className="messages-wrapper" style={{height:'100%'}}>
      {isLoading && <div className="messages-loading">Загрузка...</div>}
      {isFetchingNextPage && (
        <div className="messages-fetching">Загрузка старых сообщений...</div>
      )}
      {!hasNextPage && messages.length > 0 && !isFetchingNextPage && (
        <div className="date-separator">Начало чата</div>
      )}
      {messages.length === 0 && !isLoading && (
        <div className="date-separator">Не найдено</div>
      )}
      {(() => {
        let lastDate = null;
        return messages.map((msg, index) => {
          const msgDate = (msg.time || msg.created_at) ? new Date(msg.time || msg.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
          const showDate = msgDate && msgDate !== lastDate;
          lastDate = msgDate;
          const messageId = msg.time || msg.created_at;
          const isUser = msg.from === 'user';
          return (
            <React.Fragment key={index}>
              {showDate && (
                <div className="date-separator"><span>{msgDate}</span></div>
              )}
              <div className={`bubble ${isUser ? 'user' : 'bot'}${isHighlight(msg) ? ' highlight' : ''}`} data-message-id={messageId} style={{maxWidth:'95%'}}>
                {msg.text && (<div>{msg.text}</div>)}
                {msg.file_url && (
                  msg.file_type && msg.file_type.trim().startsWith('image/') ? (
                    <MessageImage fileUrl={msg.file_url} fileName={msg.file_name} />
                  ) : (
                    <a
                      href={`https://api.telegram.org/file/bot8176156909:AAFppRxHM8-wQgtD-LY3OWku5kiD2v-LHpo/${msg.file_url ? msg.file_url.trim() : ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-link"
                    >
                      {msg.file_name || 'Документ'}
                    </a>
                  )
                )}
                <span className="time">{(msg.time || msg.created_at) ? new Date(msg.time || msg.created_at).toLocaleTimeString() : ''}</span>
              </div>
            </React.Fragment>
          );
        });
      })()}
      <div ref={messagesEndRef} />
    </div>
  );
} 