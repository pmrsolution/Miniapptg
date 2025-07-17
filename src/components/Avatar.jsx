// Telegram-style Avatar с генерацией цвета по первой букве
export function Avatar({ letter = '?' }) {
  const colorIdx = letter && letter !== '?' ? letter.toLowerCase().charCodeAt(0) % 10 : 0;
  return (
    <div
      className="avatar"
      data-avatar-color={colorIdx}
    >
      {letter}
    </div>
  );
} 