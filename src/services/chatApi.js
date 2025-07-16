import { API_ENDPOINTS } from '../config/api';
async function fetcher(url, bodyObj = null, method = 'POST') {
  const body = new FormData();
  Object.entries(bodyObj || {}).forEach(([k, v]) => body.append(k, v));

  const res = await fetch(url, { method, body });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function sendMessage({ chat_id, text, file }) {
  const fd = new FormData();
  fd.set('chat_id', chat_id);
  text && fd.set('text', text);
  file && fd.set('file', file);

  return fetcher(API_ENDPOINTS.send, fd);
}

export async function saveUserMessage({ chat_id, user_message }) {
  return fetcher(API_ENDPOINTS.save, { chat_id, user_message });
}

export async function getMessages({ chat_id, limit = 20, before = null }) {
  const params = new URLSearchParams({ chat_id, limit });
  before && params.set('before', before);
  return fetch(`${API_ENDPOINTS.messages}?${params}`).then(r => r.json());
}

export async function searchMessages({ chat_id, q }) {
  const ps = new URLSearchParams({ chat_id, q });
  return fetch(`${API_ENDPOINTS.search}?${ps}`).then(r => r.json());
} 