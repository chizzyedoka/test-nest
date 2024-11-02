import { ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Lab, difficultyColors } from "./types";

interface LabDetailsDialogProps {
  lab: Lab | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LabDetailsDialog({
  lab,
  isOpen,
  onClose,
}: LabDetailsDialogProps) {
  if (!lab) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-gray-900 text-white border-gray-800 max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600'>
            {lab.name}
          </DialogTitle>
          <DialogDescription className='text-gray-400'>
            Detailed information and participation instructions
          </DialogDescription>
        </DialogHeader>
        <Separator className='bg-gray-800' />
        <div className='mt-6 space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <InfoItem label='Difficulty' value={lab.difficulty} isSpecial />
            <InfoItem
              label='Participants'
              value={lab.participants.toLocaleString()}
            />
            <InfoItem
              label='GPU Required'
              value={lab.gpuRequired ? "Yes" : "No"}
            />
            <InfoItem label='Time Estimate' value={lab.timeEstimate} />
            <InfoItem
              label='Points Reward'
              value={`${lab.pointsReward.toLocaleString()} pts`}
            />
            <InfoItem label='Success Rate' value={`${lab.successRate}%`} />
          </div>
          <ParticipationInstructions />
        </div>
        <DialogFooter className='mt-8'>
          <Button
            onClick={onClose}
            variant='outline'
            className='mr-2 bg-gray-700 hover:bg-gray-600 text-white border-gray-600 transition-all duration-300'>
            <ArrowUpRight className='mr-2 h-4 w-4' />
            Close
          </Button>
          <Button className='bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300'>
            <Play className='mr-2 h-4 w-4' />
            Join Lab
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({
  label,
  value,
  isSpecial = false,
}: {
  label: string;
  value: string;
  isSpecial?: boolean;
}) {
  return (
    <div className='bg-gray-800 p-3 rounded-lg'>
      <p className='text-sm text-gray-400 mb-1'>{label}</p>
      {isSpecial ? (
        <Badge
          className={`${
            difficultyColors[value as keyof typeof difficultyColors]
          } text-white`}>
          {value}
        </Badge>
      ) : (
        <p className='text-lg font-semibold'>{value}</p>
      )}
    </div>
  );
}

function ParticipationInstructions() {
  const instructions = [
    "Set up your environment according to the lab requirements.",
    "Review the prompt mining guidelines and objectives.",
    "Start the lab session and begin your prompt engineering attempts.",
    "Submit your results and wait for validation.",
    "Earn points based on your performance and success rate.",
  ];

  return (
    <div className='mt-8'>
      <h3 className='text-xl font-semibold mb-4 text-purple-400'>
        Participation Instructions
      </h3>
      <ol className='space-y-3 list-none pl-0'>
        {instructions.map((instruction, index) => (
          <li key={index} className='flex items-start'>
            <span className='flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3 mt-0.5'>
              {index + 1}
            </span>
            <span>{instruction}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
