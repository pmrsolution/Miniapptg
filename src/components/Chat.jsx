import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { useMessages } from '../hooks/useMessages';
import { useSendMessage } from '../hooks/useSendMessage';

export default function Chat({ chatId }) {
  const messagesQuery = useMessages(chatId);
  const sendMutation  = useSendMessage(chatId);

  return (
    <section className="chat">
      <Messages messages={messagesQuery} />
      <MessageInput onSend={sendMutation.mutate} />
    </section>
  );
} 