export function Avatar({ letter }) {
  return (
    <span className="avatar">
      {letter || '?'}
    </span>
  );
} 