import { useMutation } from '@tanstack/react-query';
import { endChat } from '@/app/actions/end-chat';
import { useToast } from '@/hooks/use-toast';

interface EndChatResponse {
  walletAddress: string;
}

export function useEndChat<T = EndChatResponse>() {
  const { toast } = useToast();

  return useMutation<T, Error, void>({
    mutationFn: async () => {
      const result = await endChat();

      if (!result.success) {
        throw new Error(result.error || 'Failed to end chat');
      }

      return result.data as T;
    },
    onSuccess: () => {
      toast({
        title: "Chat Ended Successfully",
        description: "Your chat session has been ended and points have been calculated.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to end chat. Please try again.",
        variant: "destructive",
      });
    }
  });
}