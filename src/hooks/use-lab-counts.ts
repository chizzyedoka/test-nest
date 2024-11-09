import { fetchLabParticipants } from '@/lib/utils/lab-mapper';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';





export function useLabCounts(labId: string) {
  return useQuery({
    queryKey: ['labCounts', labId],
    queryFn: () => fetchLabParticipants(labId),
    refetchInterval: 60000, // Refetch every minute
    retry: 2,
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}