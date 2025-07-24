import React, { useEffect } from 'react';

export default function Messages({ chatId, search, showChatSearch, setShowChatSearch }) {
  // Заглушка для проверки высоты и рендера
  useEffect(() => {
    // messages.pages не определён, но логируем для теста
    console.log('[Messages raw]', 'NO DATA');
  }, []);
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100dvh',background:'lime',padding:16}}>
      <div style={{ fontSize: 20, color: 'black' }}>
        GREEN 🔍<br />height=100dvh
      </div>
    </div>
  );
} 