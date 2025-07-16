// src/config.js
export const CHATS_URL = "/api/chats";
export const MESSAGES_URL = "/api/messages";
export const SEND_URL = "/api/send";
export const SEND_FILE_URL = "/api/sendfile";
export const SAVE_USER_MESSAGE_URL = "/api/save_user_message";

// ИСПРАВЛЕНО: Правильные webhook URL'ы
export const CLIENT_MESSAGE_WEBHOOK_URL = "https://pmrsolution.ru/webhook/api/client_message";

// WEBHOOK URLs для Telegram Bot - ИСПРАВЛЕНО на правильные URL'ы
export const TELEGRAM_WEBHOOKS = {
  CLIENT_MESSAGES: "https://pmrsolution.ru/webhook/api/client_message", // для клиентских сообщений
  ADMIN_MESSAGES: "https://pmrsolution.ru/webhook/api/save_user_message"   // для админских сообщений
}; 