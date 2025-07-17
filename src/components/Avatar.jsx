export function Avatar({ letter }) {
  return (
    <span
      className="avatar"
      style={{
        width: 52,
        height: 52,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
        fontWeight: 600,
        color: 'var(--text)',
        background: 'var(--bubbleUser)',
        border: '2px solid var(--border)',
        userSelect: 'none',
        flexShrink: 0
      }}
    >
      {letter || '?'}
    </span>
  );
} 