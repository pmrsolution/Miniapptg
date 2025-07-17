export function Avatar({ letter }) {
  // Цвета для аватарок
  const colors = ['#29a6e3', '#f39c12', '#e74c3c', '#8e44ad', '#16a085', '#2ecc71', '#e67e22', '#34495e'];
  // Выбор цвета по букве
  const color = colors[letter ? letter.charCodeAt(0) % colors.length : 0];
  return (
    <span style={{
      display: 'inline-flex',
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: color,
      color: '#fff',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: '32px',
      fontWeight: 'bold',
      fontSize: 16,
      marginRight: 8
    }}>{letter || '?'}</span>
  );
} 