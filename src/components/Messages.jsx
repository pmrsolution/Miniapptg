import React, { useRef } from 'react';
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
    return <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:220,height:160,background:'#f0f0f0',borderRadius:10,marginBottom:4,flexDirection:'column',color:'#888'}}><span style={{fontSize:16,marginBottom:8}}>⏳</span><span style={{fontSize:14}}>Загрузка...</span></div>;
  }
  if (imageError || !actualImageUrl) {
    return <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:220,height:160,background:'#f0f0f0',borderRadius:10,marginBottom:4,flexDirection:'column',color:'#888'}}><span style={{fontSize:48,marginBottom:8}}>🖼️</span><span style={{fontSize:14}}>Изображение недоступно</span><span style={{fontSize:12,marginTop:4}}>{fileName}</span><span style={{fontSize:10,marginTop:2,color:'#666'}}>URL: {fileUrl}</span></div>;
  }
  return <img src={actualImageUrl} alt={fileName||'image'} style={{maxWidth:220,maxHeight:220,borderRadius:10,marginBottom:4,boxShadow:'0 2px 8px #0002',cursor:'pointer'}} onError={()=>setImageError(true)} onClick={()=>window.open(actualImageUrl,'_blank')} />;
}

export default function Messages({ chatId }) {
  const messagesEndRef = useRef(null);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useMessages(chatId);
  const messages = data?.pages?.flatMap(page => page) || [];
  // TODO: добавить обработку прокрутки для fetchNextPage (пагинация)
  // TODO: добавить scroll-to-bottom и автофокус
  return (
    <div className="messages-wrapper classic-messages-wrapper" style={{ flex: 1, overflowY: 'auto', minHeight:0, paddingBottom: 0 }}>
      <div className="messages">
        {isLoading && <div style={{textAlign:'center',color:'#888',fontSize:'14px',padding:'12px'}}>Загрузка...</div>}
        {/* Индикатор загрузки старых сообщений */}
        {isFetchingNextPage && (
          <div style={{textAlign:'center',color:'#888',fontSize:'14px',padding:'12px',background:'#f0f0f0',borderRadius:'8px',margin:'8px 16px',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
            <div style={{width:'16px',height:'16px',border:'2px solid #ddd',borderTop:'2px solid #3498db',borderRadius:'50%',animation:'spin 1s linear infinite'}}></div>
            Загрузка старых сообщений...
          </div>
        )}
        {/* Индикатор начала чата */}
        {!hasNextPage && messages.length > 0 && !isFetchingNextPage && (
          <div className="start-of-chat-indicator" style={{textAlign:'center',color:'#888',fontSize:13,margin:'8px 0'}}>Начало чата</div>
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
                  style={{backgroundColor:isHighlighted?'#e3f2fd':undefined,boxShadow:isHighlighted?'0 0 8px rgba(33,150,243,0.3)':undefined,transition:'all 0.5s ease'}}
                >
                  {msg.from === 'user' ? (
                    <>
                      <div className="message-avatar" style={{ background: '#888' }}>Я</div>
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
                              <span className="file-icon" style={{ fontSize: 32, marginRight: 8 }}>📄</span>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <a
                                  href={`https://api.telegram.org/file/bot8176156909:AAFppRxHM8-wQgtD-LY3OWku5kiD2v-LHpo/${msg.file_url ? msg.file_url.trim() : ''}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: '#2980b9', textDecoration: 'underline', fontWeight: 500 }}
                                >
                                  {msg.file_name || 'Документ'}
                                </a>
                                {msg.file_size && <span className="file-size" style={{ color: '#888', fontSize: 12 }}>{(msg.file_size / 1024).toFixed(1)} KB</span>}
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
                              <span className="file-icon" style={{ fontSize: 32, marginRight: 8 }}>📄</span>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <a
                                  href={`https://api.telegram.org/file/bot8176156909:AAFppRxHM8-wQgtD-LY3OWku5kiD2v-LHpo/${msg.file_url ? msg.file_url.trim() : ''}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: '#2980b9', textDecoration: 'underline', fontWeight: 500 }}
                                >
                                  {msg.file_name || 'Документ'}
                                </a>
                                {msg.file_size && <span className="file-size" style={{ color: '#888', fontSize: 12 }}>{(msg.file_size / 1024).toFixed(1)} KB</span>}
                              </div>
                            </div>
                          )
                        )}
                        <div className="message-time">{(msg.time || msg.created_at) ? new Date(msg.time || msg.created_at).toLocaleTimeString() : ''}</div>
                      </div>
                      <div className="message-avatar" style={{ background: '#29a6e3' }}>Бот</div>
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