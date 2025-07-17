import React, { useState, useRef, useEffect } from 'react';
import { FaRegSmile, FaPaperclip, FaPaperPlane, FaMicrophone } from 'react-icons/fa';
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

  // Авто-рост textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [newMessage]);

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
    <form className="inputBox" onSubmit={e => { e.preventDefault(); handleSend(); }}>
      <textarea
        ref={textareaRef}
        className="inputBox-textarea"
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
        onInput={() => {
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
          }
        }}
      />
      <div className="buttons">
        <button
          className="btn emoji-btn"
          onClick={e => { e.preventDefault(); setShowEmoji(!showEmoji); }}
          title="Смайлы"
          type="button"
        >
          <FaRegSmile />
        </button>
        <button
          className="btn file-btn"
          onClick={e => { e.preventDefault(); document.getElementById('file-input').click(); }}
          title="Прикрепить файл"
          type="button"
        >
          <FaPaperclip />
        </button>
        <input
          id="file-input"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          multiple
        />
        <button
          className="btn voice-btn"
          title="Голосовое сообщение"
          type="button"
          tabIndex={-1}
        >
          <FaMicrophone />
        </button>
        <button
          onClick={handleSend}
          disabled={sendMessage.isLoading || (!newMessage.trim() && !files.length)}
          title="Отправить"
          className="btn send-btn"
          type="submit"
        >
          <FaPaperPlane />
        </button>
      </div>
      {showEmoji && (
        <div className="emoji-picker">
          <Picker data={data} onEmojiSelect={addEmoji} locale="ru" />
        </div>
      )}
      {dragActive && <div className="drag-overlay">Перетащите файл сюда</div>}
    </form>
  );
} 