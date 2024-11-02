import { useMutation } from '@tanstack/react-query';
import { registerForLab } from '@/app/actions/register-lab';
import { useToast } from './use-toast';

export interface RegisterLabRequest {
  labId: string;
  roleType: 'miner' | 'validator';
}


export type RegisterLabResponse = unknown;
export function useRegisterLab() {
  const { toast } = useToast();

  return useMutation<RegisterLabResponse, Error, RegisterLabRequest>({
    mutationFn: registerForLab,
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Registration Error',
        description: error.message || 'Failed to register for lab',
      });
    },
    onSuccess: (data) => {
      toast({
        title: 'Success',
        description: 'Successfully joined the lab',
      });
    },
  });
}