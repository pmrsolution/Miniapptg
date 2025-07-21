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
  const sortedMessages = [...messages].sort((a, b) => {
    let aDate, bDate;
    try { aDate = new Date(a.created_at); } catch { aDate = new Date(0); }
    try { bDate = new Date(b.created_at); } catch { bDate = new Date(0); }
    return aDate.getTime() - bDate.getTime();
  });

  return (
    <div ref={wrapperRef} className="messages-wrapper">
      {isFetchingNextPage && messages.length > 0 && <div className="skeleton" />}
      {!hasNextPage && sortedMessages.length > 0 && !isFetchingNextPage && (
        <div className="date-separator">Начало чата</div>
      )}
      {sortedMessages.length === 0 && !isLoading && (
        <div className="date-separator">Не найдено</div>
      )}
      {sortedMessages.map((msg, index) => {
        const msgDate = (msg.time || msg.created_at) ? new Date(msg.time || msg.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
        const showDate = index === 0 || (msgDate !== (sortedMessages[index-1]?.time || sortedMessages[index-1]?.created_at ? new Date(sortedMessages[index-1].time || sortedMessages[index-1].created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : ''));
        const messageId = msg.id || msg.time || msg.created_at;
        const type = (msg.from ?? 'admin') === 'user' ? 'user' : 'admin';
        return (
          <React.Fragment key={messageId}>
            {showDate && (
              <div className="date-separator"><span>{msgDate}</span></div>
            )}
            <div className={`bubble ${type}`} data-message-id={messageId}>
              <div>
                {msg.user_message || msg.bot_response || msg.text}
                <div style={{fontSize:10,opacity:0.5}}>
                  from: {msg.from} <br/>
                  created_at: {msg.created_at}
                </div>
              </div>
              <span className="time">{(msg.time || msg.created_at) ? new Date(msg.time || msg.created_at).toLocaleTimeString() : ''}</span>
            </div>
          </React.Fragment>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
} 