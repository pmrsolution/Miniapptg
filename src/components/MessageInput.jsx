import React, { useState, useRef } from 'react';

export default function MessageInput() {
  const [text, setText] = useState('');
  const fileRef = useRef();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = () => {
    if (!text.trim() && !file) return;
    // Здесь будет отправка сообщения/файла
    setText('');
    setFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Сообщение..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
      />
      <input type="file" ref={fileRef} onChange={handleFileChange} style={{ display: 'none' }} />
      <button className="file-btn" onClick={() => fileRef.current && fileRef.current.click()}>📎</button>
      <button className="send-btn" onClick={handleSend} disabled={!text.trim() && !file}>➤</button>
      {/* Предпросмотр файла */}
      {file && (
        <div className="file-preview">
          <span>{file.name}</span>
          <button onClick={() => setFile(null)}>✕</button>
        </div>
      )}
    </div>
  );
} 