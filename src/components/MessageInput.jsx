import React, { useState } from 'react';
export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');
  const fileRef = React.useRef();

  const submit = () => {
    if (!text.trim() && !fileRef.current.files.length) return;
    onSend({ text, file: fileRef.current.files[0] });
    setText('');
    fileRef.current.value = '';
  };

  return (
    <div className="input-row">
      <input placeholder="Сообщение…" value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key==='Enter' && submit()} />
      <input type="file" ref={fileRef} accept="image/*,application/pdf" />
      <button onClick={submit}>→</button>
    </div>
  );
} 