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

function escapeRegExp(t) {
  return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function Messages({ chatId, search }) {
  const messagesEndRef = useRef(null);
  const wrapperRef = useRef(null);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useMessages(chatId, search);
  const messages = data?.pages?.flatMap(page => page) || [];
  const [highlighted, setHighlighted] = useState([]);
  const [searchIdx, setSearchIdx] = useState(0);
  const searchTerm = search?.toLowerCase() || '';
  const searchResults = searchTerm
    ? messages.filter(m => m.text && m.text.toLowerCase().includes(searchTerm))
    : [];

  // Подсветка найденных сообщений
  useEffect(() => {
    if (searchTerm && searchResults.length) {
      setHighlighted([searchResults[searchIdx]?.time || searchResults[searchIdx]?.created_at]);
      if (searchResults[searchIdx]) {
        const idx = messages.findIndex(m => (m.time || m.created_at) === (searchResults[searchIdx].time || searchResults[searchIdx].created_at));
        if (wrapperRef.current && idx !== -1) {
          const el = wrapperRef.current.querySelector(`[data-message-id="${searchResults[searchIdx].time || searchResults[searchIdx].created_at}"]`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    } else {
      setHighlighted([]);
    }
  }, [searchIdx, searchTerm, messages]);

  // Скролл к самому низу при новых сообщениях
  useLayoutEffect(() => {
    if (!searchTerm && wrapperRef.current) {
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
    }
  }, [messages, searchTerm]);

  const isHighlight = (msg) => highlighted.includes(msg.time || msg.created_at);

  return (
    <div ref={wrapperRef} className="messages-wrapper">
      {/* SearchNavigation */}
      {searchTerm && searchResults.length > 0 && (
        <div className="searchNav">
          <button onClick={() => setSearchIdx(i => Math.max(i - 1, 0))} disabled={searchIdx === 0}>↑</button>
          <span className="count">{searchIdx + 1} / {searchResults.length}</span>
          <button onClick={() => setSearchIdx(i => Math.min(i + 1, searchResults.length - 1))} disabled={searchIdx === searchResults.length - 1}>↓</button>
        </div>
      )}
      {/* Skeleton loader */}
      {isLoading && <div className="skeleton" />}
      {isFetchingNextPage && (
        <div className="typingIndicator">Загрузка старых сообщений...</div>
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
          // Highlight search
          let textHtml = msg.text;
          if (searchTerm && msg.text) {
            textHtml = msg.text.replace(
              new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi'),
              '<mark class="searchHighlight">$1</mark>'
            );
          }
          return (
            <React.Fragment key={index}>
              {showDate && (
                <div className="date-separator"><span>{msgDate}</span></div>
              )}
              <div className={`bubble ${isUser ? 'user' : 'bot'}${isHighlight(msg) ? ' highlight' : ''}`} data-message-id={messageId}>
                {msg.text && (<span className="searchable" dangerouslySetInnerHTML={{__html: textHtml}} />)}
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
                <span className="message-time">{(msg.time || msg.created_at) ? new Date(msg.time || msg.created_at).toLocaleTimeString() : ''}</span>
              </div>
            </React.Fragment>
          );
        });
      })()}
      <div ref={messagesEndRef} />
    </div>
  );
} 