import { useQuery } from '@tanstack/react-query';

const fetchChats = () => Promise.resolve([
  { chat_id: '1', first_name: 'Alice', last_message: 'Привет!' },
  { chat_id: '2', first_name: 'Bob', last_message: 'Как дела?' },
  { chat_id: '3', first_name: 'Charlie', last_message: 'Добро пожаловать!' }
]);

export default function useChats() {
  return useQuery({ queryKey: ['chats'], queryFn: fetchChats });
} 