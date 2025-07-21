import React, { useRef, useEffect, useState } from 'react';
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

export default function Messages({ chatId, search, showChatSearch, setShowChatSearch }) {
  const wrapperRef = useRef(null);
  const messagesEndRef = useRef(null);
  const lastDateRef = useRef(null);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useMessages(chatId, search);
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

  // Скролл к последнему сообщению после рендера
  useEffect(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [messages.length]);

  // Скролл к самому низу при новых сообщениях или смене чата
  useEffect(() => {
    const el = wrapperRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, chatId]);

  // Подгрузка сообщений при скролле вверх
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (el.scrollTop < 50 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Закрытие поиска по Esc
  useEffect(() => {
    if (!showChatSearch || !setShowChatSearch) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowChatSearch(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showChatSearch, setShowChatSearch]);

  const isHighlight = (msg) => highlighted.includes(msg.time || msg.created_at);

  return (
    <div ref={wrapperRef} className="messages-wrapper">
      {/* Skeleton loader только при isLoading */}
      {isLoading && <div className="skeleton" />}
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
          if (showDate) lastDate = msgDate;
          const messageId = msg.time || msg.created_at;
          // Логика определения типа сообщения
          let isUser = false;
          let isAdmin = false;
          if (msg.from === 'user' || (!!msg.user_message && !msg.bot_response)) isUser = true;
          if (msg.from === 'admin' || !!msg.bot_response) isAdmin = true;
          let textHtml = msg.text;
          if (searchTerm && msg.text) {
            textHtml = msg.text.replace(
              new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi'),
              '<mark className="searchHighlight">$1</mark>'
            );
          }
          return (
            <React.Fragment key={index}>
              {showDate && (
                <div className="date-separator"><span>{msgDate}</span></div>
              )}
              <div className={`bubble${isUser ? ' user' : ''}${isAdmin ? ' admin' : ''}${isHighlight(msg) ? ' highlight' : ''}`} data-message-id={messageId}>
                <span className="searchable" style={{ paddingRight: 48, margin: '0 40px 4px 0', lineHeight: 1.28 }} dangerouslySetInnerHTML={{__html: textHtml}} />
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
                <span className="time" style={{ position: 'absolute', bottom: 4, right: 8, fontSize: 12, opacity: .7, color: 'var(--text-secondary)' }}>{(msg.time || msg.created_at) ? new Date(msg.time || msg.created_at).toLocaleTimeString() : ''}</span>
              </div>
            </React.Fragment>
          );
        });
      })()}
      <div ref={messagesEndRef} />
    </div>
  );
} 