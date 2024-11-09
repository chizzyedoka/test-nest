import {
  ArrowUpRight,
  Play,
  Users,
  Trophy,
  Clock,
  Target,
  Terminal,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Lab } from "./types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LabDetailsDialogProps {
  lab: Lab | null;
  isOpen: boolean;
  onClose: () => void;
}

// Add theme constants
const THEME = {
  gradient: {
    start: "#ff156a", // Pink from logo
    end: "#ff8a15", // Orange from logo
  },
};

export function LabDetailsDialog({
  lab,
  isOpen,
  onClose,
}: LabDetailsDialogProps) {
  if (!lab) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        hideCloseButton
        className='bg-gradient-to-br from-gray-900 to-gray-800 text-white border-gray-800 max-w-2xl'>
        {/* Updated gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-[#ff156a]/5 to-[#ff8a15]/5 pointer-events-none' />

        <DialogHeader className='space-y-4'>
          <div className='flex items-center justify-between'>
            <DialogTitle className='text-2xl font-bold'>{lab.name}</DialogTitle>
            <div className='flex gap-2'>
              {lab.localCLI && (
                <Badge
                  variant='secondary'
                  className='bg-gray-700/50 border border-[#ff156a]/20'>
                  <Terminal className='h-3 w-3 mr-1 text-[#ff156a]' />
                  CLI
                </Badge>
              )}
              {lab.GUI && (
                <Badge
                  variant='secondary'
                  className='bg-gray-700/50 border border-[#ff8a15]/20'>
                  <Monitor className='h-3 w-3 mr-1 text-[#ff8a15]' />
                  GUI
                </Badge>
              )}
            </div>
          </div>

          <div className='flex gap-2'>
            <Badge
              className={cn(
                "bg-gradient-to-r text-white",
                lab.difficulty === "Easy" && "from-green-500 to-green-600",
                lab.difficulty === "Medium" && "from-yellow-500 to-yellow-600",
                lab.difficulty === "Hard" && "from-red-500 to-red-600"
              )}>
              {lab.difficulty}
            </Badge>
            <Badge className='bg-gradient-to-r from-[#ff156a] to-[#ff8a15] text-white'>
              {lab.category}
            </Badge>
          </div>
        </DialogHeader>

        <div className='mt-6 space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <StatsCard
              icon={Users}
              label='Participants'
              value={lab.participants?.toLocaleString() || "0"}
              iconColor='text-[#ff156a]'
              borderColor='[#ff156a]'
            />
            <StatsCard
              icon={Trophy}
              label='Points Reward'
              value={lab?.pointsReward?.toLocaleString() || "API Error"}
              iconColor='text-[#ff8a15]'
              borderColor='[#ff8a15]'
            />
          </div>

          <div className='bg-gray-800/30 rounded-lg p-4 border border-[#ff156a]/20'>
            <h3 className='text-lg font-semibold mb-2 bg-gradient-to-r from-[#ff156a] to-[#ff8a15] bg-clip-text text-transparent'>
              Lab Description
            </h3>
            <p className='text-gray-300 leading-relaxed'>{lab.description}</p>
          </div>

          <div className='bg-gray-800/30 rounded-lg p-4 border border-[#ff8a15]/20'>
            <h3 className='text-lg font-semibold mb-4 bg-gradient-to-r from-[#ff156a] to-[#ff8a15] bg-clip-text text-transparent'>
              Participation Steps
            </h3>
            <div className='space-y-3'>
              {steps.map((step, index) => (
                <div key={index} className='flex items-start gap-3'>
                  <div className='flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#ff156a] to-[#ff8a15] text-white flex items-center justify-center text-sm'>
                    {index + 1}
                  </div>
                  <p className='text-gray-300'>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className='mt-6'>
          <Button
            onClick={onClose}
            variant='ghost'
            className='flex-1 bg-gray-800/50 hover:bg-gray-700/50 border border-[#ff156a]/20 hover:border-[#ff156a]/40'>
            <ArrowUpRight className='mr-2 h-4 w-4 text-[#ff156a]' />
            Close
          </Button>
          <Button
            asChild
            className='flex-1 bg-gradient-to-r from-[#ff156a] to-[#ff8a15] hover:from-[#ff156a]/90 hover:to-[#ff8a15]/90 text-white'>
            <Link href={`/labs/${lab.id}`}>
              <Play className='mr-2 h-4 w-4' />
              Start Lab
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StatsCard({
  icon: Icon,
  label,
  value,
  iconColor = "text-gray-400",
  borderColor = "gray-700",
}: {
  icon: any;
  label: string;
  value: string;
  iconColor?: string;
  borderColor?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-2 p-3 rounded-lg bg-gray-700/30",
        `border border-${borderColor}/20 hover:border-${borderColor}/40 transition-colors`
      )}>
      <div className='flex items-center gap-2 text-gray-400'>
        <Icon className={cn("h-4 w-4", iconColor)} />
        <span className='text-xs'>{label}</span>
      </div>
      <p className='text-lg font-bold text-white'>{value}</p>
    </div>
  );
}

const steps = [
  "Set up your environment according to the lab requirements",
  "Review the prompt mining guidelines and objectives",
  "Start the lab session and begin your prompt mining attempts",
  "Submit your results and wait for validation",
  "Earn points based on your performance and success rate",
];
