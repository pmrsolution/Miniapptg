import React, { useState, useRef } from 'react';
import { FaRegSmile, FaPaperclip, FaPaperPlane, FaSyncAlt } from 'react-icons/fa';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useSendMessage } from '../hooks/useSendMessage';

export default function MessageInput({ chatId }) {
  const [newMessage, setNewMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const textareaRef = useRef(null);
  const sendMessage = useSendMessage(chatId);

  const handleSend = () => {
    if (!chatId || sendMessage.isLoading || (!newMessage.trim() && !files.length)) return;
    sendMessage.mutate({ text: newMessage });
    setNewMessage('');
    setFiles([]);
  };
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };
  const addEmoji = (emoji) => {
    setNewMessage(prev => prev + emoji.native);
    setShowEmoji(false);
  };
  const handleSendTestFile = () => {
    alert('Тест: отправить файл с полем data');
  };

  // Drag&Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div
      className={`message-input${dragActive ? ' drag-active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <button
        className="file-btn"
        onClick={() => document.getElementById('file-input').click()}
        title="Прикрепить файл или голосовое"
        type="button"
      >
        <FaPaperclip />
      </button>
      <input
        id="file-input"
        type="file"
        accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,audio/*"
        className="file-input"
        onChange={handleFileChange}
        multiple
      />
      <textarea
        ref={textareaRef}
        className="message-textarea"
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        placeholder="Введите сообщение..."
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
          if (e.key === 'Enter' && e.shiftKey) {
            // Разрешаем перенос строки
            return;
          }
        }}
        rows={1}
      />
      <button
        className="emoji-btn"
        onClick={() => setShowEmoji(!showEmoji)}
        title="Смайлы"
        type="button"
      >
        <FaRegSmile />
      </button>
      {showEmoji && (
        <div className="emoji-picker">
          <Picker data={data} onEmojiSelect={addEmoji} locale="ru" />
        </div>
      )}
      <button
        onClick={handleSend}
        disabled={sendMessage.isLoading || (!newMessage.trim() && !files.length)}
        title="Отправить"
        className="send-btn"
        type="button"
      >
        <FaPaperPlane />
      </button>
      <button
        className="test-webhook-btn"
        onClick={() => alert('Проверка вебхука отправки файла')}
        title="Проверить вебхук отправки файла"
        disabled={sendMessage.isLoading || !chatId}
        type="button"
      >
        <FaSyncAlt />
      </button>
      {files && files.length > 0 && (
        <div className="file-preview-list">
          {files.map((f, i) => (
            <div key={i} className="file-preview-item">
              <b>Файл:</b> {f.name}
              {f.type.startsWith('image/') && (
                <img src={URL.createObjectURL(f)} alt="preview" className="file-preview-img" />
              )}
            </div>
          ))}
          <button className="remove-all-files-btn" onClick={() => setFiles([])}>Убрать все</button>
        </div>
      )}
      {/* Кнопка для тестовой отправки файла с полем 'data' */}
      {chatId && files && files.length > 0 && (
        <button
          className="test-send-file-btn"
          onClick={handleSendTestFile}
          disabled={sendMessage.isLoading}
          type="button"
        >
          Тест: отправить файл с полем data
        </button>
      )}
      {dragActive && <div className="drag-overlay">Перетащите файл сюда</div>}
    </div>
  );
} 