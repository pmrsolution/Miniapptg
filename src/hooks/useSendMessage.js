import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage } from '../services/chatApi';
import { chatKeys } from '../lib/queryKeys';

export function useSendMessage(chatId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: variables => sendMessage({ chat_id: chatId, ...variables }),
    onSuccess: () => qc.invalidateQueries({ queryKey: chatKeys.all(chatId) }),
  });
} 