import { useQuery } from '@tanstack/react-query';
import { getActiveLabs } from '@/app/actions/labs';

export function useActiveLabs() {
  return useQuery({
    queryKey: ['active-labs'],
    queryFn: async () => {
      const response = await getActiveLabs();
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });
}