import React, { useState } from 'react';

export default function MessageInput() {
  const [text, setText] = useState('');
  const send = (e) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;
    setText('');
  };
  return (
    <form onSubmit={send}>
      <div className="input-area">
        <textarea
          className="input-box"
          rows={1}
          placeholder="Type a message…"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
          }}
        />
        <button className="send-btn" type="submit" disabled={!text.trim()}>
          ✈️
        </button>
      </div>
    </form>
  );
} 