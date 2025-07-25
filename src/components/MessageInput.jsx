import React, { useState, useRef, useEffect } from 'react';
import { FaRegSmile, FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useSendMessage } from '../hooks/useSendMessage';

export default function MessageInput({ chatId }) {
  const [newMessage, setNewMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [files, setFiles] = useState([]);
  const textareaRef = useRef(null);
  const sendMessage = useSendMessage(chatId);
  const formRef = useRef(null);

  // Автофокус при открытии чата
  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, [chatId]);

  // Авто-рост textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [newMessage]);

  // Drag-n-drop файлов
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const onDrop = e => {
      e.preventDefault();
      setFiles(Array.from(e.dataTransfer.files));
    };
    const onDragOver = e => e.preventDefault();
    el.addEventListener('drop', onDrop);
    el.addEventListener('dragover', onDragOver);
    return () => {
      el.removeEventListener('drop', onDrop);
      el.removeEventListener('dragover', onDragOver);
    };
  }, []);

  // Закрытие emoji-picker по клику вне
  useEffect(() => {
    if (!showEmoji) return;
    const onClick = e => {
      if (formRef.current && !formRef.current.contains(e.target)) setShowEmoji(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [showEmoji]);

  // Сброс по Esc
  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === 'Escape') {
        setShowEmoji(false);
        setFiles([]);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSend = () => {
    if (!chatId || sendMessage.isLoading || (!newMessage.trim() && !files.length)) return;
    sendMessage.mutate({ user_message: newMessage });
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

  return (
    <form className="message-input" ref={formRef} onSubmit={e => { e.preventDefault(); handleSend(); }}>
      <label className="file-btn" role="button" htmlFor="file-input">
        <FaPaperclip />
        <input
          id="file-input"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          multiple
        />
      </label>
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
        onInput={() => {
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
          }
        }}
      />
      <button
        type="button"
        className="emoji-btn"
        onClick={() => setShowEmoji(!showEmoji)}
        title="Смайлы"
      >
        <FaRegSmile />
      </button>
      <button
        onClick={handleSend}
        disabled={sendMessage.isLoading || (!newMessage.trim() && !files.length)}
        title="Отправить"
        className="send-btn"
        type="submit"
      >
        <FaPaperPlane />
      </button>
      {showEmoji && (
        <div className="emoji-picker">
          <Picker data={data} onEmojiSelect={addEmoji} locale="ru" />
        </div>
      )}
      {files.length > 0 && (
        <div style={{marginLeft:8, display:'flex',alignItems:'center',gap:8}}>
          {files.map((f,i) => (
            <span key={i} style={{fontSize:13, color:'#888'}}>{f.name}</span>
          ))}
          <button type="button" onClick={()=>setFiles([])} style={{marginLeft:4}}>✕</button>
        </div>
      )}
    </form>
  );
} 