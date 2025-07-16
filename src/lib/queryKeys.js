export const chatKeys = {
  all: (chatId) => ['chat', chatId],
  messages: (chatId) => [...chatKeys.all(chatId), 'messages'],
}; 