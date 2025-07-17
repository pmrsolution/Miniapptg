import React, { useState, useRef } from 'react';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';

export default function MessageInput() {
  const [text, setText] = useState('');
  const fileRef = useRef();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = () => {
    if (!text.trim() && !file) return;
    setText('');
    setFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="message-input">
      <button className="file-btn" onClick={() => fileRef.current && fileRef.current.click()}><FaPaperclip /></button>
      <input
        type="file"
        ref={fileRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <input
        className="message-textarea"
        type="text"
        placeholder="Введите сообщение..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
      />
      <button className="send-btn" onClick={handleSend} disabled={!text.trim() && !file}><FaPaperPlane /></button>
      {file && (
        <div className="file-preview">
          <span>{file.name}</span>
          <button onClick={() => setFile(null)}>✕</button>
        </div>
      )}
    </div>
  );
} 