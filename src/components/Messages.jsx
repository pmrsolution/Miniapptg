import { Virtuoso } from 'react-virtuoso';
export default function Messages({ messages }) {
  const list = messages.data?.pages.flat() || [];
  return (
    <Virtuoso
      data={list}
      itemContent={(_, msg) => <div className={`msg ${msg.from === 'bot' ? 'bot' : ''}`}>{msg.text}</div>}
      style={{ height: '100%' }}
      followOutput="smooth"
    />
  );
} 