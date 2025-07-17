export function Avatar({ letter }) {
  // Цвета для аватарок
  const colors = ['#29a6e3', '#f39c12', '#e74c3c', '#8e44ad', '#16a085', '#2ecc71', '#e67e22', '#34495e'];
  const color = colors[letter ? letter.charCodeAt(0) % colors.length : 0];
  return (
    <span style={{
      display: 'flex',
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: color,
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 18
    }}>{letter || '?'}</span>
  );
} 