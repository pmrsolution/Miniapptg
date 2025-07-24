import React, { useState } from 'react';
import { useChatContext } from '../context/ChatContext';
import useChats from '../hooks/useChats';
import { Avatar } from './Avatar';

export default function Sidebar() {
  const { chats, selectedChatId, setSelectedChatId, isLoading } = useChatContext();
  const { data: chatsRaw = [], isLoading: loadingChats, error: errorChats } = useChats();
  console.log('[Sidebar] chats:', chatsRaw, loadingChats, errorChats);
  const [search, setSearch] = useState('');
  const filteredChats = search.length >= 2
    ? chats.filter(chat =>
        (chat.first_name && chat.first_name.toLowerCase().includes(search.toLowerCase())) ||
        (chat.last_message && chat.last_message.toLowerCase().includes(search.toLowerCase()))
      )
    : chats;
  return (
    <div className={`sidebar${search.length >= 2 ? ' searching' : ''}`}>
      <input
        className="chat-search"
        placeholder="Поиск по чатам..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div>
        {isLoading && <div className="chat-loading">Загрузка...</div>}
        {filteredChats.length === 0 && !isLoading && <div className="chat-empty">Не найдено</div>}
        {filteredChats.map(chat => (
          <div
            key={chat.chat_id}
            className={`chat-item${selectedChatId === chat.chat_id ? ' active' : ''}`}
            onClick={() => { setSelectedChatId(chat.chat_id); setSearch(''); }}
          >
            <Avatar letter={chat.first_name?.[0]?.toUpperCase() || '?'} />
            <div className="info">
              <div className="name">{chat.first_name || 'Без имени'}</div>
              <div className="snippet">{chat.last_message || ''}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 