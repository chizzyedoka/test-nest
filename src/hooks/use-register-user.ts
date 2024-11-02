import { useMutation } from '@tanstack/react-query'
import { registerUser } from '@/app/actions/register-user'
import { useToast } from './use-toast'


interface RegisterUserInput {
  walletAddress: string
  stake?: number
}

export function useRegisterUser() {
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({ walletAddress, stake = 0 }: RegisterUserInput) => {
      const result = await registerUser(walletAddress, stake)
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
    onSuccess: (data) => {

      if (data?.wallet_address) {
        localStorage.setItem('food_bot_walletAddress', data.wallet_address)
      }
      toast({
        title: 'Success',
        description: 'Successfully registered user'
      })
    },

    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: error.message
      })
    }
  })
}