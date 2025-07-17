import React, { useState, useRef } from 'react';
import { FaRegSmile, FaPaperclip, FaPaperPlane, FaSyncAlt } from 'react-icons/fa';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useSendMessage } from '../hooks/useSendMessage';

export default function MessageInput({ chatId }) {
  const [newMessage, setNewMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [files, setFiles] = useState([]);
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

  return (
    <div className="message-input">
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
        style={{ display: 'none' }}
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
        }}
        rows={1}
        style={{ minHeight: 36, maxHeight: 180 }}
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
        <div style={{ position: 'absolute', bottom: 60, right: 60, zIndex: 10 }}>
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
        style={{ marginLeft: 4, background: 'transparent', color: '#e67e22', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}
        onClick={() => alert('Проверка вебхука отправки файла')}
        title="Проверить вебхук отправки файла"
        disabled={sendMessage.isLoading || !chatId}
        type="button"
      >
        <FaSyncAlt />
      </button>
      {files && files.length > 0 && (
        <div className="file-preview-list" style={{ marginTop: 8 }}>
          {files.map((f, i) => (
            <div key={i} className="file-preview-item">
              <b>Файл:</b> {f.name}
              {f.type.startsWith('image/') && (
                <img src={URL.createObjectURL(f)} alt="preview" style={{ maxHeight: 80, marginLeft: 8 }} />
              )}
            </div>
          ))}
          <button onClick={() => setFiles([])} style={{ marginLeft: 8 }}>Убрать все</button>
        </div>
      )}
      {/* Кнопка для тестовой отправки файла с полем 'data' */}
      {chatId && files && files.length > 0 && (
        <button
          style={{ marginTop: 8, background: '#e67e22', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: 'pointer' }}
          onClick={handleSendTestFile}
          disabled={sendMessage.isLoading}
          type="button"
        >
          Тест: отправить файл с полем data
        </button>
      )}
    </div>
  );
} 