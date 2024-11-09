import {
  Users,
  Cpu,
  Trophy,
  TrendingUp,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Theme constants from logo
const THEME = {
  primary: "#ff156a", // Pink
  secondary: "#ff8a15", // Orange
  gradient: "from-[#ff156a] to-[#ff8a15]",
};

interface StatsCardProps {
  totalParticipants: number;
  activeGPUs: number;
  totalPointsMined: number;
  className?: string;
}

export function StatsCard({
  totalParticipants,
  activeGPUs,
  totalPointsMined,
  className,
}: StatsCardProps) {
  const stats = [
    {
      label: "Total Participants",
      value: totalParticipants.toLocaleString(),
      icon: Users,
      trend: 12.5,
      color: THEME.gradient,
      bgColor: "bg-[#ff156a]/10",
      description: "Active users this month",
    },
    {
      label: "Active GPUs",
      value: activeGPUs.toLocaleString(),
      icon: Cpu,
      trend: -4.5,
      color: THEME.gradient,
      bgColor: "bg-[#ff8a15]/10",
      description: "Computing power utilized",
    },
    {
      label: "Points Mined",
      value: `${(totalPointsMined / 1000000).toFixed(1)}M`,
      icon: Trophy,
      trend: 28.4,
      color: THEME.gradient,
      bgColor: "bg-[#ff156a]/10",
      description: "Total rewards earned",
    },
  ];

  return (
    <Card
      className={cn(
        "bg-gradient-to-br from-gray-900 to-gray-800 border border-[#ff156a]/10 shadow-xl",
        "hover:border-[#ff156a]/20 transition-colors duration-300",
        className
      )}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-xl'>
          <TrendingUp className='h-5 w-5 text-[#ff156a]' />
          <span className='bg-gradient-to-r from-[#ff156a] to-[#ff8a15] bg-clip-text text-transparent'>
            Lab Statistics
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StatItem({
  stat,
  index,
}: {
  stat: {
    label: string;
    value: string;
    icon: any;
    trend: number;
    color: string;
    bgColor: string;
    description: string;
  };
  index: number;
}) {
  const Icon = stat.icon;
  const isPositive = stat.trend > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className='group relative overflow-hidden rounded-lg bg-gray-800/50 p-4
                 hover:bg-gray-800/80 transition-all duration-300
                 border border-[#ff156a]/10 hover:border-[#ff156a]/20'>
      <div
        className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300
                    bg-gradient-to-r from-[#ff156a] to-[#ff8a15]'
      />

      <div className='relative z-10'>
        <div className='flex items-center justify-between mb-2'>
          <div className={cn("p-2 rounded-lg", stat.bgColor)}>
            <Icon className='h-5 w-5 text-[#ff156a]' />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className='flex items-center gap-1 text-sm font-medium'>
            {isPositive ? (
              <ArrowUp className='h-4 w-4 text-white' />
            ) : (
              <ArrowDown className='h-4 w-4 text-red-500' />
            )}
            <span className={isPositive ? "text-white" : "text-red-500"}>
              {Math.abs(stat.trend)}%
            </span>
          </motion.div>
        </div>

        <div className='space-y-1'>
          <h3 className='text-sm text-gray-400 font-medium'>{stat.label}</h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 }}
            className='text-2xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] bg-clip-text text-transparent'>
            {stat.value}
          </motion.p>
          <p className='text-xs text-gray-500'>{stat.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
