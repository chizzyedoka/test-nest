import { useQuery } from '@tanstack/react-query'
import { getUserData } from '@/app/actions/get-user-data'
import { useToast } from './use-toast'

export function useUserData(walletAddress?: string) {
  const { toast } = useToast()

  return useQuery({
    queryKey: ['user-data', walletAddress],
    queryFn: async () => {
      if (!walletAddress) {
        throw new Error('Wallet address is required')
      }
      const result = await getUserData(walletAddress)
      if (!result.success) {
        throw new Error(result.error)
      }
      return result.data
    },
    enabled: !!walletAddress,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5 // Refetch every 5 minutes
  })
}