import { useState, useRef } from 'react';
import { getChats, getMessages } from '../services/chatApi';

export default function useSearchPanel(defaultTab = 'chat') {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);
  const scrollTimeout = useRef();

  // Поиск по сообщениям текущего чата
  const searchInChat = async (chatId) => {
    if (!query.trim() || query.trim().length < 2) {
      setError('Введите минимум 2 символа для поиска');
      setTimeout(() => setError(null), 2000);
      return;
    }
    setIsLoading(true);
    try {
      const data = await getMessages({ chat_id: chatId, limit: 1000 });
      const allMessages = Array.isArray(data.messages) ? data.messages : [];
      const searchLower = query.trim().toLowerCase();
      const found = allMessages.filter((msg, idx) => {
        const text = (msg.text || '').toLowerCase();
        const isMatch = text.includes(searchLower);
        if (isMatch) msg._originalIndex = idx;
        return isMatch;
      });
      setResults(found);
      if (found.length) setHighlightedId(found[0].created_at || found[0].time);
      else setHighlightedId(null);
    } catch (e) {
      setError('Ошибка поиска: ' + e.message);
      setTimeout(() => setError(null), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  // Глобальный поиск (MVP: по всем чатам)
  const searchGlobal = async () => {
    if (!query.trim() || query.trim().length < 2) {
      setError('Введите минимум 2 символа для поиска');
      setTimeout(() => setError(null), 2000);
      return;
    }
    setIsLoading(true);
    try {
      const chats = await getChats();
      let allResults = [];
      for (const chat of chats) {
        const data = await getMessages({ chat_id: chat.chat_id, limit: 1000 });
        const allMessages = Array.isArray(data.messages) ? data.messages : [];
        const searchLower = query.trim().toLowerCase();
        const found = allMessages.filter((msg, idx) => {
          const text = (msg.text || '').toLowerCase();
          const isMatch = text.includes(searchLower);
          if (isMatch) msg._originalIndex = idx;
          return isMatch;
        });
        allResults = allResults.concat(found.map(m => ({ ...m, chat_id: chat.chat_id }))); // добавляем chat_id для перехода
      }
      setResults(allResults);
      if (allResults.length) setHighlightedId(allResults[0].created_at || allResults[0].time);
      else setHighlightedId(null);
    } catch (e) {
      setError('Ошибка поиска: ' + e.message);
      setTimeout(() => setError(null), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const onTabChange = (tab, chatId) => {
    setActiveTab(tab);
    setResults([]);
    setQuery('');
    setHighlightedId(null);
  };

  const onOpen = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    setQuery('');
    setResults([]);
    setHighlightedId(null);
    setError(null);
  };

  // Переход к следующему/предыдущему результату
  const navigateResults = (direction) => {
    if (!results.length) return;
    let idx = results.findIndex(m => (m.created_at || m.time) === highlightedId);
    if (direction === 'next') idx = (idx + 1) % results.length;
    else if (direction === 'prev') idx = idx === 0 ? results.length - 1 : idx - 1;
    setHighlightedId(results[idx].created_at || results[idx].time);
  };

  return {
    open,
    onOpen,
    onClose,
    activeTab,
    onTabChange,
    query,
    setQuery,
    results,
    setResults,
    isLoading,
    error,
    highlightedId,
    setHighlightedId,
    searchInChat,
    searchGlobal,
    navigateResults,
  };
} 