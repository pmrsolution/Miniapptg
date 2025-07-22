import { API_ENDPOINTS } from '../config/api';
async function fetcher(url, bodyObj = null, method = 'POST') {
  const body = new FormData();
  Object.entries(bodyObj || {}).forEach(([k, v]) => body.append(k, v));

  const res = await fetch(url, { method, body });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function getChats() {
  const res = await fetch('/api/chats');
  if (!res.ok) throw new Error('Ошибка загрузки чатов');
  const data = await res.json();
  return Array.isArray(data.output) ? data.output : Array.isArray(data) ? data : [];
}

export async function getMessages({ chat_id, limit = 50, before, search }) {
  const params = new URLSearchParams({ chat_id, limit });
  if (before) params.append('before', before);
  if (search && search.length >= 2) params.append('search', search);
  const res = await fetch(`/api/messages?${params}`);
  if (!res.ok) throw new Error('Ошибка загрузки сообщений');
  const data = await res.json();

  // Если backend уже возвращает объект с messages/hasMore/lastDate — просто верни его, но нормализуй from
  if (data.messages && Array.isArray(data.messages)) {
    return {
      ...data,
      messages: data.messages.map(m => ({
        ...m,
        from: m.from === 'user' ? 'user' : 'admin'
      }))
    };
  }

  // Если backend возвращает массив (старый формат) — оберни в объект и нормализуй from
  const arr = Array.isArray(data.output) ? data.output : Array.isArray(data) ? data : [];
  return {
    messages: arr.map(m => ({
      ...m,
      from: m.from === 'user' ? 'user' : 'admin'
    })),
    hasMore: false,
    lastDate: arr.length ? arr[arr.length - 1].created_at : null
  };
}

export async function sendMessage({ chat_id, text, user_message, file }) {
  if (!chat_id || (!text && !user_message && !file)) throw new Error('Пустое сообщение или не выбран чат');
  const fd = new FormData();
  fd.append('chat_id', chat_id);
  if (text) fd.append('text', text);
  if (user_message) fd.append('text', user_message); // поддержка старого поля
  if (file) fd.append('file', file);
  const res = await fetch('/api/send', { method: 'POST', body: fd });
  if (!res.ok) throw new Error('Ошибка отправки сообщения');
  return res.json();
}

export async function saveUserMessage({ chat_id, user_message }) {
  return fetcher(API_ENDPOINTS.save, { chat_id, user_message });
} 