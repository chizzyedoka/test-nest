import { motion } from "framer-motion";
import { Info, Play, Users, Trophy, Pause } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lab, difficultyColors } from "./types";
import { useState } from "react";

import { useRegisterLab } from "@/hooks/use-register-lab";

import { JoinLabModal } from "./join-lab-modal";
import { useRouter } from "next/navigation";

interface LabCardProps {
  lab: Lab;
  onDetailsClick: (lab: Lab) => void;
  isLogin: boolean;
}

export function LabCard({ lab, onDetailsClick, isLogin }: LabCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();
  const handleJoinLab = () => {
    setIsModalOpen(true);
  };

  const checkFoodBotLab = !!localStorage.getItem("food_bot_walletAddress");
  const handleJoinAsMiner = async () => {
    try {
      setIsRegistering(true);

      if (lab.id === 7) {
        router.push(`/labs/${lab.id}`);
        return;
      }

      const response = await fetch(`/api/labs/${lab.id}/miner/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to register for lab");
      }

      const result = await response.text();
      console.log("Registration successful:", result);
      router.push(`/labs/${lab.id}`);
      // Close modal on success
      setIsModalOpen(false);

      // Show success toast
    } catch (error) {
      console.error("Registration failed:", error);

      // Show error toast
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <motion.div
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
            <LabStats lab={lab} />
          </CardContent>
          <CardFooter className='flex justify-between pt-4'>
            <LabActions
              lab={lab}
              onDetailsClick={() => onDetailsClick(lab)}
              isLogin={isLogin}
              onJoinLab={handleJoinLab}
              isRegistering={isRegistering}
              checkFoodBotLab={checkFoodBotLab}
            />
          </CardFooter>
        </Card>
      </div>
      <JoinLabModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJoinAsMiner={handleJoinAsMiner}
        labType={
          lab.name === "foodbot" || lab.name === "Food Bot Jailbreak Tutorial"
            ? "tutorial"
            : "regular"
        }
        labId={lab.id}
        // isLoading={isRegistering}
      />
    </motion.div>
  );
}

function LabStats({ lab }: { lab: Lab }) {
  return (
    <>
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
          <span className='text-sm font-bold'>{lab.successRate}%</span>
        </div>
        <Progress value={lab.successRate} className='h-2 bg-gray-700' />
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
    </>
  );
}

function LabActions({
  lab,
  onDetailsClick,
  isLogin,
  onJoinLab,
  isRegistering,
  checkFoodBotLab,
}: {
  lab: Lab;
  onDetailsClick: () => void;
  isLogin: boolean;
  onJoinLab: () => void;
  isRegistering: boolean;
  checkFoodBotLab: boolean;
}) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              className='w-full mr-2 bg-gray-700 hover:bg-gray-600 text-white border-gray-600 transition-all duration-300'
              onClick={onDetailsClick}>
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
            {isLogin && (
              <Button
                className='w-full ml-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300'
                onClick={onJoinLab}
                disabled={isRegistering}>
                {isRegistering ? (
                  <div className='flex items-center gap-2'>
                    <span className='loading loading-spinner'></span>
                    Processing...
                  </div>
                ) : (
                  <>
                    {checkFoodBotLab && lab.id === 7 ? (
                      <>
                        <Pause className='mr-2 h-4 w-4' />
                        Continue Lab
                      </>
                    ) : (
                      <>
                        <Play className='mr-2 h-4 w-4' />
                        Join Lab
                      </>
                    )}
                  </>
                )}
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>Start participating in this lab</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
