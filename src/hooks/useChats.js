import { useQuery } from '@tanstack/react-query';

const fetchChats = () => fetch(`${process.env.REACT_APP_BACKEND_URL}/getChats/json`).then(r => r.json());

export default function useChats() {
  return useQuery({ queryKey: ['chats'], queryFn: fetchChats });
} 