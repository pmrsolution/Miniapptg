import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import './App.css';
import { CHATS_URL, MESSAGES_URL, SEND_URL, SEND_FILE_URL, SAVE_USER_MESSAGE_URL, CLIENT_MESSAGE_WEBHOOK_URL, TELEGRAM_WEBHOOKS } from './config';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FaRegSmile, FaPaperclip, FaPaperPlane, FaArrowLeft, FaSyncAlt, FaSearch, FaExpand } from 'react-icons/fa';

// ... (остальной код старого App.js полностью скопирован сюда) 