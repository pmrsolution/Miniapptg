export const API_ENDPOINTS = {
  send:    `${process.env.REACT_APP_BACKEND_URL}/sendMessage/json`,
  save:    `${process.env.REACT_APP_BACKEND_URL}/saveUserMessage/json`,
  messages:`${process.env.REACT_APP_BACKEND_URL}/getMessages/json`,
  search:  `${process.env.REACT_APP_BACKEND_URL}/searchMessages/json`,
  draft:   `${process.env.REACT_APP_BACKEND_URL}/saveDraft/json`,
  drafts:  `${process.env.REACT_APP_BACKEND_URL}/getDrafts/json`,
}; 