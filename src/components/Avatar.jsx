export function Avatar({ letter }) {
  const colors = ['#29a6e3', '#f39c12', '#e74c3c', '#8e44ad', '#16a085', '#2ecc71', '#e67e22', '#34495e'];
  const color = colors[letter ? letter.charCodeAt(0) % colors.length : 0];
  return (
    <span className="avatar" style={{ background: color }}>{letter || '?'}</span>
  );
} 