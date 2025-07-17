import { Virtuoso } from 'react-virtuoso';

const messages = [
  { id: 1, text: '1518', isBot: false },
  { id: 2, text: '1518', isBot: true },
  { id: 3, text: '17 59', isBot: false },
  { id: 4, text: 'Й7 59', isBot: true },
];

export default function Messages() {
  return (
    <div className="messages">
      <Virtuoso
        data={messages}
        followOutput="smooth"
        itemContent={(_, m) => (
          <div className={`bubble ${m.isBot ? 'left' : 'right'}`}>
            {m.text}
            {m.fileUrl && (
              <a href={m.fileUrl} target="_blank" rel="noreferrer">
                📎 {m.fileName}
              </a>
            )}
          </div>
        )}
        style={{ height: '100%' }}
      />
    </div>
  );
} 