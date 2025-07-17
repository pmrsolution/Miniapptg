import React, { useRef, useEffect } from 'react';
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

export default function Messages({ chatId }) {
  const messagesEndRef = useRef(null);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useMessages(chatId);
  const messages = data?.pages?.flatMap(page => page) || [];
  // TODO: добавить обработку прокрутки для fetchNextPage (пагинация)
  // TODO: добавить scroll-to-bottom и автофокус

  // Автоскролл к последнему сообщению
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="messages-wrapper">
      <div className="messages">
        {isLoading && <div className="messages-loading">Загрузка...</div>}
        {isFetchingNextPage && (
          <div className="messages-fetching">Загрузка старых сообщений...</div>
        )}
        {!hasNextPage && messages.length > 0 && !isFetchingNextPage && (
          <div className="start-of-chat-indicator">Начало чата</div>
        )}
        {/* Рендер сообщений с разделителями дат */}
        {(() => {
          let lastDate = null;
          return messages.map((msg, index) => {
            const msgDate = (msg.time || msg.created_at) ? new Date(msg.time || msg.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
            const showDate = msgDate && msgDate !== lastDate;
            lastDate = msgDate;
            const messageId = msg.time || msg.created_at;
            // TODO: подсветка найденного сообщения
            const isHighlighted = false;
            return (
              <React.Fragment key={index}>
                {showDate && (
                  <div className="date-separator"><span>{msgDate}</span></div>
                )}
                <div 
                  className={`message-bubble ${msg.from === 'user' ? 'user' : 'bot'}${isHighlighted ? ' highlighted' : ''}`}
                  data-message-id={messageId}
                >
                  {msg.from === 'user' ? (
                    <>
                      <div className="message-avatar">Я</div>
                      <div className="message-content">
                        {msg.text && (<div className="message-text">{msg.text}</div>)}
                        {msg.file_url && (
                          msg.file_type && msg.file_type.trim().startsWith('image/') ? (
                            <div className="file-image-preview">
                              <MessageImage fileUrl={msg.file_url} fileName={msg.file_name} />
                              <div className="file-meta">
                                <span className="file-name">{msg.file_name}</span>
                                {msg.file_size && <span className="file-size">{(msg.file_size / 1024).toFixed(1)} KB</span>}
                              </div>
                            </div>
                          ) : (
                            <div className="file-doc-preview">
                              <span className="file-icon">📄</span>
                              <div className="file-doc-meta">
                                <a
                                  href={`https://api.telegram.org/file/bot8176156909:AAFppRxHM8-wQgtD-LY3OWku5kiD2v-LHpo/${msg.file_url ? msg.file_url.trim() : ''}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="file-link"
                                >
                                  {msg.file_name || 'Документ'}
                                </a>
                                {msg.file_size && <span className="file-size">{(msg.file_size / 1024).toFixed(1)} KB</span>}
                              </div>
                            </div>
                          )
                        )}
                        <div className="message-time">{(msg.time || msg.created_at) ? new Date(msg.time || msg.created_at).toLocaleTimeString() : ''}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="message-content">
                        {msg.text && (<div className="message-text">{msg.text}</div>)}
                        {msg.file_url && (
                          msg.file_type && msg.file_type.trim().startsWith('image/') ? (
                            <div className="file-image-preview">
                              <MessageImage fileUrl={msg.file_url} fileName={msg.file_name} />
                              <div className="file-meta">
                                <span className="file-name">{msg.file_name}</span>
                                {msg.file_size && <span className="file-size">{(msg.file_size / 1024).toFixed(1)} KB</span>}
                              </div>
                            </div>
                          ) : (
                            <div className="file-doc-preview">
                              <span className="file-icon">📄</span>
                              <div className="file-doc-meta">
                                <a
                                  href={`https://api.telegram.org/file/bot8176156909:AAFppRxHM8-wQgtD-LY3OWku5kiD2v-LHpo/${msg.file_url ? msg.file_url.trim() : ''}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="file-link"
                                >
                                  {msg.file_name || 'Документ'}
                                </a>
                                {msg.file_size && <span className="file-size">{(msg.file_size / 1024).toFixed(1)} KB</span>}
                              </div>
                            </div>
                          )
                        )}
                        <div className="message-time">{(msg.time || msg.created_at) ? new Date(msg.time || msg.created_at).toLocaleTimeString() : ''}</div>
                      </div>
                      <div className="message-avatar bot">Бот</div>
                    </>
                  )}
                </div>
              </React.Fragment>
            );
          });
        })()}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
} 