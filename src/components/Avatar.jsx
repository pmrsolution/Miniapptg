export function Avatar({ letter }) {
  return (
    <span
      className="avatar"
      style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
        fontWeight: 600,
        color: '#fff',
        background: '#2296f3',
        border: '2px solid #fff',
        userSelect: 'none',
        flexShrink: 0
      }}
    >
      {letter || '?'}
    </span>
  );
} 