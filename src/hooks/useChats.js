import { useQuery } from '@tanstack/react-query';
import { getChats } from '../services/chatApi';

export default function useChats() {
  return useQuery({ queryKey: ['chats'], queryFn: getChats });
} 