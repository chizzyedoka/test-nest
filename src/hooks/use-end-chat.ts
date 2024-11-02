import { useMutation } from '@tanstack/react-query'
import { endChat } from '@/app/actions/end-chat'
import { useToast } from './use-toast'


export function useEndChat() {
  const { toast } = useToast()

  return useMutation({
    mutationFn: async () => {
      const result = await endChat()
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
    onSuccess: (data) => {
      toast({
        title: 'Chat Ended',
        description: data?.message
      })
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to end chat',
        description: error.message
      })
    }
  })
}