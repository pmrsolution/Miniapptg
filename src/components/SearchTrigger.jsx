import React from 'react';

export default function SearchTrigger({ onClick }) {
  return (
    <button className="chat-header-btn search-trigger" onClick={onClick} title="Поиск">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
        <line x1="14.5" y1="14.5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
} 