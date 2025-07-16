import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { searchMessages } from '../services/chatApi';

export function useSearch({ chatId, query }) {
  return useQuery({
    queryKey: ['search', chatId, query],
    queryFn: () => searchMessages({ chat_id: chatId, q: query }),
    enabled: !!query && !!chatId,
    placeholderData: keepPreviousData,
  });
} 