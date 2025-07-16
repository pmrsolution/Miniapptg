import { useInfiniteQuery } from '@tanstack/react-query';
import { getMessages } from '../services/chatApi';

export function useMessages(chatId) {
  return useInfiniteQuery({
    queryKey: ['chat', chatId, 'messages'],
    queryFn: ({ pageParam }) =>
      getMessages({ chat_id: chatId, limit: 50, before: pageParam }),
    getNextPageParam: (lastPage) => {
      // Если сервер возвращает hasMore и lastDate — используем их, иначе undefined
      if (lastPage && lastPage.hasMore && lastPage.lastDate) return lastPage.lastDate;
      // Fallback: если lastPage.length === 50, берём дату последнего сообщения
      if (Array.isArray(lastPage) && lastPage.length === 50) {
        return lastPage[lastPage.length - 1]?.created_at;
      }
      return undefined;
    },
    enabled: !!chatId,
  });
} 