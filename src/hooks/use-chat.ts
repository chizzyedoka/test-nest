import { useMutation } from '@tanstack/react-query'
import { sendChatMessage } from '@/app/actions/chat'
import { useToast } from './use-toast'

interface ChatInput {
  walletAddress: string
  prompt: string
}

export function useChat() {
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({ walletAddress, prompt }: ChatInput) => {
      const result = await sendChatMessage(walletAddress, prompt)
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Message failed',
        description: error.message
      })
    }
  })
}