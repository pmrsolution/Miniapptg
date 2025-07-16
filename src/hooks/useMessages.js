import { useInfiniteQuery } from '@tanstack/react-query';
import { getMessages } from '../services/chatApi';
import { chatKeys } from '../lib/queryKeys';

export function useMessages(chatId) {
  return useInfiniteQuery({
    queryKey: chatKeys.messages(chatId),
    queryFn: ({ pageParam }) => getMessages({ chat_id: chatId, before: pageParam }),
    getNextPageParam: last => last?.length === 50 ? last[last.length - 1]?.created_at : undefined,
    enabled: !!chatId,
  });
} 