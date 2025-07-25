import React, { useEffect, useRef } from 'react';

export default function SearchPanel({
  open,
  onClose,
  onTabChange,
  activeTab = 'chat',
  query,
  setQuery,
  results = [],
  isLoading,
  error,
  highlightedId,
  setHighlightedId,
  searchInChat,
  searchGlobal,
  navigateResults,
  chatId,
  onResultClick
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
    const onKeyDown = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') navigateResults('next');
      if (e.key === 'ArrowUp') navigateResults('prev');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, navigateResults]);

  useEffect(() => {
    if (!open) return;
    if (activeTab === 'chat' && chatId && query.length >= 2) searchInChat(chatId);
    if (activeTab === 'global' && query.length >= 2) searchGlobal();
    // eslint-disable-next-line
  }, [query, activeTab, chatId]);

  useEffect(() => {
    if (!open || !highlightedId) return;
    setTimeout(() => {
      const el = document.querySelector(`[data-message-id="${highlightedId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('search-highlight');
        setTimeout(() => el.classList.remove('search-highlight'), 2000);
      }
    }, 200);
  }, [highlightedId, open]);

  if (!open) return null;
  return (
    <div className="search-panel-overlay">
      <div className="search-panel">
        <div className="search-panel-tabs">
          <button
            className={activeTab === 'chat' ? 'active' : ''}
            onClick={() => onTabChange('chat')}
            disabled={activeTab === 'chat'}
          >Этот чат</button>
          <button
            className={activeTab === 'global' ? 'active' : ''}
            onClick={() => onTabChange('global')}
            disabled={activeTab === 'global'}
          >Все чаты</button>
        </div>
        <input
          ref={inputRef}
          className="search-panel-input"
          placeholder="Поиск..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {isLoading && <div className="search-panel-empty">Поиск...</div>}
        {error && <div className="search-panel-empty" style={{color:'#e74c3c'}}>{error}</div>}
        <div className="search-panel-results">
          {!isLoading && !error && results.length === 0 && query.length >= 2 && (
            <div className="search-panel-empty">Нет результатов</div>
          )}
          {results.map((item, i) => (
            <div
              className={`search-panel-result${highlightedId === (item.created_at || item.time) ? ' active' : ''}`}
              key={item.created_at || item.time || i}
              onClick={() => onResultClick(item)}
            >
              <span style={{fontWeight:600}}>{item.text}</span>
              <span style={{marginLeft:8, fontSize:12, color:'#888'}}>{item.from}</span>
              {item.chat_id && <span style={{marginLeft:8, fontSize:12, color:'#aaa'}}>#{item.chat_id}</span>}
            </div>
          ))}
        </div>
        <button className="search-panel-close" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
} 