"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  Cpu,
  Zap,
  Trophy,
  BarChart,
  ArrowUpRight,
  Info,
  Play,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface Lab {
  id: number;
  name: string;
  participants: number;
  gpuRequired: boolean;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  timeEstimate: string;
  pointsReward: number;
  successRate: number;
  isTutorial?: boolean;
  description?: string;
  color: string;
}

// Mock data for labs
const labsData: Lab[] = [
  {
    id: 7,
    name: "Food Bot Jailbreak Tutorial",
    participants: 789,
    gpuRequired: false,
    difficulty: "Medium",
    timeEstimate: "30-60 mins",
    pointsReward: 3500,
    successRate: 42,
    color: "from-green-400 to-blue-500",
    isTutorial: true,
    description:
      "Learn the basics of AI jailbreaking with this interactive Food Bot tutorial.",
  },

  {
    id: 1,
    name: "GPT-4 Jailbreak",
    participants: 1234,
    gpuRequired: true,
    difficulty: "Hard",
    timeEstimate: "2-3 hours",
    pointsReward: 5000,
    successRate: 68,
    color: "from-red-500 to-pink-500",
  },
  {
    id: 2,
    name: "DALL-E Prompt Optimization",
    participants: 567,
    gpuRequired: false,
    difficulty: "Medium",
    timeEstimate: "1-2 hours",
    pointsReward: 3000,
    successRate: 75,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: 3,
    name: "LLaMA Fine-tuning",
    participants: 890,
    gpuRequired: true,
    difficulty: "Expert",
    timeEstimate: "4-6 hours",
    pointsReward: 8000,
    successRate: 45,
    color: "from-lime-500 to-green-500",
  },
  {
    id: 4,
    name: "Stable Diffusion Tweaking",
    participants: 2345,
    gpuRequired: true,
    difficulty: "Medium",
    timeEstimate: "2-3 hours",
    pointsReward: 4000,
    successRate: 82,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 5,
    name: "ChatGPT Persona Creation",
    participants: 3456,
    gpuRequired: false,
    difficulty: "Easy",
    timeEstimate: "30-60 mins",
    pointsReward: 2000,
    successRate: 90,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 6,
    name: "Code Generation Improvement",
    participants: 789,
    gpuRequired: false,
    difficulty: "Hard",
    timeEstimate: "3-4 hours",
    pointsReward: 6000,
    successRate: 60,
    color: "from-purple-500 to-pink-500",
  },
];

const difficultyColors: Record<Lab["difficulty"], string> = {
  Easy: "bg-green-500",
  Medium: "bg-yellow-500",
  Hard: "bg-orange-500",
  Expert: "bg-red-500",
};

export function LabsPageComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredLabs = labsData.filter((lab) =>
    lab.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-[#121212] text-white p-8 container mx-auto'>
      <header className='mb-12'>
        {/* <h1 className='text-4xl font-bold mb-4'></h1> */}
        <h1 className=' my-4 text-2xl sm:text-3xl md:text-4xl  font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text'>
          Prompt Mining Labs
        </h1>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0'>
          <div className='flex flex-wrap gap-4'>
            <div className='flex items-center space-x-2 bg-gray-800 p-2 rounded-md'>
              <Users className='text-blue-400' />
              <span>Total Participants: 9,281</span>
            </div>
            <div className='flex items-center space-x-2 bg-gray-800 p-2 rounded-md'>
              <Cpu className='text-green-400' />
              <span>Active GPUs: 1,337</span>
            </div>
            <div className='flex items-center space-x-2 bg-gray-800 p-2 rounded-md'>
              <Zap className='text-yellow-400' />
              <span>Points Mined: 42M</span>
            </div>
          </div>
          <div className='relative w-full md:w-auto'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <Input
              type='text'
              placeholder='Search labs...'
              className='pl-10 bg-gray-800 border-gray-700 text-white w-full md:w-64'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {filteredLabs.map((lab) => (
          <motion.div
            key={lab.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className='group'>
            <div className='relative p-[2px] rounded-xl overflow-hidden'>
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${lab.color}`}
              />
              <Card className='bg-gray-800 border-none overflow-hidden h-full relative z-10'>
                <CardHeader className='pb-2'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <CardTitle className='text-xl font-bold mb-2'>
                        {lab.name}
                        {lab.isTutorial && (
                          <Badge variant='secondary' className='ml-2'>
                            Tutorial
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className='flex items-center space-x-2'>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                            difficultyColors[lab.difficulty]
                          } text-white`}>
                          {lab.difficulty}
                        </span>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                            lab.gpuRequired ? "bg-purple-600" : "bg-green-600"
                          } text-white`}>
                          {lab.gpuRequired ? "GPU Required" : "CPU Friendly"}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex justify-between items-center bg-gray-700 p-3 rounded-lg'>
                    <div className='flex items-center space-x-2'>
                      <Users className='text-blue-400 h-6 w-6' />
                      <span className='text-sm font-medium'>Participants</span>
                    </div>
                    <span className='text-lg font-bold'>
                      {lab.participants.toLocaleString()}
                    </span>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm font-medium'>Success Rate</span>
                      <span className='text-sm font-bold'>
                        {lab.successRate}%
                      </span>
                    </div>
                    <Progress
                      value={lab.successRate}
                      className='h-2 bg-gray-700'
                    />
                  </div>
                  <div className='flex justify-between items-center bg-gray-700 p-3 rounded-lg'>
                    <div className='flex items-center space-x-2'>
                      <Trophy className='text-yellow-400 h-6 w-6' />
                      <span className='text-sm font-medium'>Reward</span>
                    </div>
                    <span className='text-lg font-bold'>
                      {lab.pointsReward.toLocaleString()} points
                    </span>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between pt-4'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant='outline'
                          className='w-full mr-2 bg-gray-700 hover:bg-gray-600 text-white border-gray-600 transition-all duration-300'
                          onClick={() => {
                            setSelectedLab(lab);
                            setIsDialogOpen(true);
                          }}>
                          <Info className='mr-2 h-4 w-4' />
                          Lab Details
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View detailed lab information and statistics</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={lab.isTutorial ? "/labs/7" : `/labs/${lab.id}`}
                          className='w-full ml-2'>
                          <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300'>
                            <Play className='mr-2 h-4 w-4' />
                            Join Lab
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Start participating in this lab</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='bg-gray-900 text-white border-gray-800 max-w-2xl'>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600'>
              {selectedLab?.name}
            </DialogTitle>
            <DialogDescription className='text-gray-400'>
              Detailed information and participation instructions
            </DialogDescription>
          </DialogHeader>
          <Separator className='bg-gray-800' />
          {selectedLab && (
            <div className='mt-6 space-y-6'>
              <div className='grid grid-cols-2 gap-4'>
                <InfoItem
                  label='Difficulty'
                  value={selectedLab.difficulty}
                  isSpecial
                />
                <InfoItem
                  label='Participants'
                  value={selectedLab.participants.toLocaleString()}
                />
                <InfoItem
                  label='GPU Required'
                  value={selectedLab.gpuRequired ? "Yes" : "No"}
                />
                <InfoItem
                  label='Time Estimate'
                  value={selectedLab.timeEstimate}
                />
                <InfoItem
                  label='Points Reward'
                  value={`${selectedLab.pointsReward.toLocaleString()} pts`}
                />
                <InfoItem
                  label='Success Rate'
                  value={`${selectedLab.successRate}%`}
                />
              </div>

              <div className='mt-8'>
                <h3 className='text-xl font-semibold mb-4 text-purple-400'>
                  Participation Instructions
                </h3>
                <ol className='space-y-3 list-none pl-0'>
                  {[
                    "Set up your environment according to the lab requirements.",
                    "Review the prompt mining guidelines and objectives.",
                    "Start the lab session and begin your prompt engineering attempts.",
                    "Submit your results and wait for validation.",
                    "Earn points based on your performance and success rate.",
                  ].map((instruction, index) => (
                    <li key={index} className='flex items-start'>
                      <span className='flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3 mt-0.5'>
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
          <DialogFooter className='mt-8'>
            <Button
              onClick={() => setIsDialogOpen(false)}
              variant='outline'
              className='mr-2 bg-gray-700 hover:bg-gray-600 text-white border-gray-600 transition-all duration-300'>
              <ArrowUpRight className='mr-2 h-4 w-4' />
              Close
            </Button>
            <Button
              onClick={() => {
                /* Handle join lab action */
              }}
              className='bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300'>
              <Play className='mr-2 h-4 w-4' />
              Join Lab
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
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
