export function Avatar({ letter }) {
  return (
    <span style={{
      display: 'inline-block',
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: '#29a6e3',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '32px',
      fontWeight: 'bold',
      marginRight: 8
    }}>{letter || '?'}</span>
  );
} 