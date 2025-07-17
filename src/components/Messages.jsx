import { Virtuoso } from 'react-virtuoso';

const messages = [
  { id: 1, text: '1518', isBot: false },
  { id: 2, text: '1518', isBot: true },
  { id: 3, text: '17 59', isBot: false },
  { id: 4, text: 'Й7 59', isBot: true },
];

export default function Messages() {
  return (
    <Virtuoso
      data={messages}
      followOutput="smooth"
      itemContent={(_, m) => (
        <div className={`msg ${m.isBot ? 'from-bot' : ''}`}>{m.text}</div>
      )}
      style={{ height: '100%' }}
    />
  );
} 