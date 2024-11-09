

import { useQuery } from '@tanstack/react-query'
import { enterLab } from '@/app/actions/enterLab'

export function useEnterLab(labId: string) {
  return useQuery({
    queryKey: ['enterLab', labId],
    queryFn: () => enterLab(labId),
    // Disable automatic refetching since this is a one-time operation
    refetchOnWindowFocus: false,
    retry: false,
  })
}