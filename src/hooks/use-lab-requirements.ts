import { useQuery } from '@tanstack/react-query';
import { getLabRequirements } from '@/app/actions/get-lab-requirements';


interface LabRequirements {
  labid: string;
  miner_requirements: {
    other_requirements: Record<string, unknown>;
    min_stake: number;
    requires_prompt: boolean;
  };
  validator_requirements: {
    other_requirements: Record<string, unknown>;
    min_stake: number;
    requires_prompt: boolean;
  };
}

export function useLabRequirements(labId: string) {


  return useQuery<LabRequirements, Error>({
    queryKey: ['lab-requirements', labId],
    queryFn: async () => {
      const result = await getLabRequirements(labId);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
    retry: 1,
    staleTime: 1000 * 60 * 2, // 5 minutes
    gcTime: 1000 * 60 * 2, // 10 minutes
  });
}
