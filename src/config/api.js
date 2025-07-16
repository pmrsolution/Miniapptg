export const API_ENDPOINTS = {
  send:    `${import.meta.env.VITE_BACKEND_URL}/sendMessage/json`,
  save:    `${import.meta.env.VITE_BACKEND_URL}/saveUserMessage/json`,
  messages:`${import.meta.env.VITE_BACKEND_URL}/getMessages/json`,
  search:  `${import.meta.env.VITE_BACKEND_URL}/searchMessages/json`,
  draft:   `${import.meta.env.VITE_BACKEND_URL}/saveDraft/json`,
  drafts:  `${import.meta.env.VITE_BACKEND_URL}/getDrafts/json`,
}; 