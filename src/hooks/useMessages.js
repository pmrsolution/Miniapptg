import { useInfiniteQuery } from '@tanstack/react-query';
import { getMessages } from '../services/chatApi';
import { chatKeys } from '../lib/queryKeys';

export function useMessages(chatId) {
  return useInfiniteQuery({
    queryKey: chatKeys.messages(chatId),
    queryFn: ({ pageParam }) => 
      getMessages({ chat_id: chatId, limit: 50, before: pageParam }),
    getNextPageParam: last => last?.hasMore ? last.lastDate : undefined,
    enabled: !!chatId,
  });
} 