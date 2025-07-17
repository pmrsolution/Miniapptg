export function Avatar({ letter }) {
  return (
    <span className="avatar" style={{ background: '#2296f3', color: '#fff' }}>{letter || '?'}</span>
  );
} 