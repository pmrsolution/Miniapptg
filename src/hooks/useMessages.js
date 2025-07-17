import { useInfiniteQuery } from '@tanstack/react-query';
import { getMessages } from '../services/chatApi';

export function useMessages(chatId, search) {
  return useInfiniteQuery({
    queryKey: ['chat', chatId, 'messages', search],
    queryFn: async ({ pageParam }) => {
      const res = await getMessages({ chat_id: chatId, limit: 50, before: pageParam, search });
      // Если backend возвращает массив, оборачиваем в объект
      if (Array.isArray(res)) return { messages: res, hasMore: false, lastDate: undefined };
      return res;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.hasMore && lastPage.lastDate) return lastPage.lastDate;
      return undefined;
    },
    select: data => ({
      ...data,
      pages: data.pages.map(p => p.messages || [])
    }),
    enabled: !!chatId,
  });
} 