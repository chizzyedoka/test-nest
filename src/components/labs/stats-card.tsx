import { Users, Cpu, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  totalParticipants: number;
  activeGPUs: number;
  totalPointsMined: number;
}

export function StatsCard({
  totalParticipants,
  activeGPUs,
  totalPointsMined,
}: StatsCardProps) {
  return (
    <Card className='bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300'>
      <CardHeader>
        <CardTitle>Lab Statistics</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <StatItem
          icon={<Users className='text-blue-500' />}
          label='Total Participants'
          value={totalParticipants.toLocaleString()}
        />
        <StatItem
          icon={<Cpu className='text-green-500' />}
          label='Active GPUs'
          value={activeGPUs.toLocaleString()}
        />
        <StatItem
          icon={<Trophy className='text-yellow-500' />}
          label='Points Mined'
          value={`${(totalPointsMined / 1000000).toFixed(1)}M`}
        />
      </CardContent>
    </Card>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-2'>
        {icon}
        <span className='text-sm font-medium'>{label}</span>
      </div>
      <span className='text-lg font-bold'>{value}</span>
    </div>
  );
}
