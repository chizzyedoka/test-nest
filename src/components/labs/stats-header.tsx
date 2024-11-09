import { Users, Cpu, Zap } from "lucide-react";

interface StatsHeaderProps {
  totalParticipants: number;
  activeGPUs: number;
  pointsMined: number;
}

export function StatsHeader({
  totalParticipants,
  activeGPUs,
  pointsMined,
}: StatsHeaderProps) {
  return (
    <div className='flex flex-wrap gap-4'>
      <div className='flex items-center space-x-2 bg-gray-800 p-2 rounded-md'>
        <Users className='text-blue-400' />
        <span>Total Participants: {totalParticipants.toLocaleString()}</span>
      </div>
      <div className='flex items-center space-x-2 bg-gray-800 p-2 rounded-md'>
        <Cpu className='text-green-400' />
        <span>Active GPUs: {activeGPUs.toLocaleString()}</span>
      </div>
      <div className='flex items-center space-x-2 bg-gray-800 p-2 rounded-md'>
        <Zap className='text-yellow-400' />
        <span>Points Mined: {pointsMined}M</span>
      </div>
    </div>
  );
}
