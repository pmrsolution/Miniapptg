import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage } from '../services/chatApi';
import { chatKeys } from '../lib/queryKeys';

export function useSendMessage(chatId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: variables => sendMessage({ chat_id: chatId, ...variables }),
    onSuccess: () => setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['messages', chatId] });
    }, 30),
  });
} 