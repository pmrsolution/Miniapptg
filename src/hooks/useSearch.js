import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getMessages } from '../services/chatApi';

export function useSearch({ chatId, query }) {
  return useQuery({
    queryKey: ['search', chatId, query],
    queryFn: () => getMessages({ chat_id: chatId, limit: 1000, search: query }),
    enabled: !!query && !!chatId,
    placeholderData: keepPreviousData,
  });
} 