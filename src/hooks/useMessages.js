import { useInfiniteQuery } from '@tanstack/react-query';
import { getMessages } from '../services/chatApi';

export function useMessages(chatId, search) {
  return useInfiniteQuery({
    queryKey: ['chat', chatId, 'messages', search],
    queryFn: ({ pageParam }) =>
      getMessages({ chat_id: chatId, limit: 50, before: pageParam, search }),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.hasMore && lastPage.lastDate) return lastPage.lastDate;
      if (Array.isArray(lastPage) && lastPage.length === 50) {
        return lastPage[lastPage.length - 1]?.created_at;
      }
      return undefined;
    },
    enabled: !!chatId,
  });
} 