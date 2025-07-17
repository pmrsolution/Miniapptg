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
  return Array.isArray(data.output) ? data.output : Array.isArray(data) ? data : [];
}

export async function sendMessage({ chat_id, text, file }) {
  if (!chat_id || (!text && !file)) throw new Error('Пустое сообщение или не выбран чат');
  const fd = new FormData();
  fd.append('chat_id', chat_id);
  if (text) fd.append('text', text);
  if (file) fd.append('file', file);
  const res = await fetch('/api/send', { method: 'POST', body: fd });
  if (!res.ok) throw new Error('Ошибка отправки сообщения');
  return res.json();
}

export async function saveUserMessage({ chat_id, user_message }) {
  return fetcher(API_ENDPOINTS.save, { chat_id, user_message });
} 