import { motion } from "framer-motion";
import {
  Info,
  Play,
  Users,
  Trophy,
  Pause,
  Terminal,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lab } from "./types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FOOD_BOT_LAB_ID } from "@/config/food-bot-config";
import { cn } from "@/lib/utils";
import { JoinLabModal } from "./join-lab-modal";
import { isLoggedIn } from "@/app/actions/login";
import { useEnterLab } from "@/hooks/useEnterLab";
import { enterLab } from "@/app/actions/enterLab";
import { useActiveAccount } from "thirdweb/react";
import { useRegisterLab } from "@/hooks/use-register-lab";
import { useToast } from "@/hooks/use-toast";

interface LabCardProps {
  lab: Lab;
  onDetailsClick: (lab: Lab) => void;
  isLogin: boolean;
}

const GRADIENT = {
  start: "#ff156a", // Pink from logo
  end: "#ff8a15", // Orange from logo
};

export function LabCard({ lab, onDetailsClick, isLogin }: LabCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [enterLabLoading, setEnterLabLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const activeAccount = useActiveAccount();
  const checkFoodBotLab =
    localStorage.getItem("food_bot_walletAddress") === activeAccount?.address;
  // const { data: enterLabData, isLoading: enterLabLoading } = useEnterLab(
  //   lab.id
  // );
  const { mutate: registerLab, isPending: registerLabLoading } =
    useRegisterLab();

  console.log(activeAccount);
  const handleJoinLab = async () => {
    setEnterLabLoading(true);
    // const enterLabData = await enterLab(lab.id);

    // if (enterLabData.data.code === "NOT_REGISTERED_AS_MINER") {
    //   setIsModalOpen(true);
    // }
    if (checkFoodBotLab && lab.id === FOOD_BOT_LAB_ID) {
      router.push(`/labs/${FOOD_BOT_LAB_ID}`);
      return;
    }
    setIsModalOpen(true);
    setEnterLabLoading(false);

    // setIsModalOpen(true);
  };

  const handleJoinAsMiner = async () => {
    try {
      setIsRegistering(true);

      registerLab(
        { labId: lab.id, roleType: "miner" },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Successfully joined the lab",
            });

            router.push(`/labs/${lab.id}`);
            setIsModalOpen(false);
          },
        }
      );
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className='group h-full'>
      <Card className='relative overflow-hidden border-0 bg-gradient-to-br from-gray-900 to-gray-800 h-full flex flex-col'>
        {/* Updated gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-[#ff156a]/10 to-[#ff8a15]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />

        <CardHeader className='space-y-2 flex-none'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-xl font-bold text-gray-300 line-clamp-1'>
              {lab.name}
            </CardTitle>
            <div className='flex gap-1 flex-shrink-0'>
              {lab.localCLI && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant='secondary'
                        className='bg-gray-700/50 hover:bg-gray-700 whitespace-nowrap border border-[#ff156a]/20'>
                        <Terminal className='h-3 w-3 mr-1' />
                        CLI
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>Supports Local CLI</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {lab.GUI && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant='secondary'
                        className='bg-gray-700 whitespace-nowrap'>
                        <Monitor className='h-3 w-3 mr-1' />
                        GUI
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>Has Graphical Interface</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>

          <div className='flex gap-2 flex-wrap'>
            <Badge
              className={cn(
                "bg-gradient-to-r whitespace-nowrap text-white",
                lab.difficulty === "Easy" && "from-green-500 to-green-600",
                lab.difficulty === "Medium" && "from-yellow-500 to-yellow-600",
                lab.difficulty === "Hard" && "from-red-500 to-red-600"
              )}>
              {lab.difficulty}
            </Badge>
            <Badge className='bg-gradient-to-r from-[#ff156a] to-[#ff8a15] whitespace-nowrap text-white'>
              {lab.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className='space-y-4 flex-grow'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2 p-3 rounded-lg bg-gray-700/30 border border-[#ff156a]/20 hover:border-[#ff156a]/40 transition-colors'>
              <div className='flex items-center gap-2 text-gray-400'>
                <Users className='h-4 w-4 flex-shrink-0 text-[#ff156a]' />
                <span className='text-xs whitespace-nowrap'>Participants</span>
              </div>
              <p className='text-lg font-bold text-white'>{lab.participants}</p>
            </div>
            <div className='space-y-2 p-3 rounded-lg bg-gray-700/30 border border-[#ff8a15]/20 hover:border-[#ff8a15]/40 transition-colors'>
              <div className='flex items-center gap-2 text-gray-400'>
                <Trophy className='h-4 w-4 text-[#ff8a15] flex-shrink-0' />
                <span className='text-xs whitespace-nowrap'>Points</span>
              </div>
              <p className='text-lg font-bold text-white'>
                {lab.pointsReward?.toLocaleString() || "N/A"}
              </p>
            </div>
          </div>

          <p className='text-sm text-gray-400 line-clamp-2 min-h-[2.5rem]'>
            {lab.description}
          </p>
        </CardContent>

        <CardFooter className='flex gap-2 mt-auto flex-none'>
          <Button
            variant='ghost'
            className='flex-1 bg-gray-800/50 hover:bg-gray-700/50 border border-[#ff156a]/20 hover:border-[#ff156a]/40'
            onClick={() => onDetailsClick(lab)}>
            <Info className='mr-2 h-4 w-4 text-[#ff156a]' />
            Details
          </Button>

          {isLogin && (
            <Button
              className={cn(
                "flex-1 bg-gradient-to-r from-[#ff156a] to-[#ff8a15] hover:from-[#ff156a]/90 hover:to-[#ff8a15]/90",
                isRegistering && "opacity-50 cursor-not-allowed"
              )}
              onClick={handleJoinLab}
              disabled={isRegistering || enterLabLoading}>
              {isRegistering || enterLabLoading ? (
                <span className='flex items-center gap-2 justify-center whitespace-nowrap'>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}>
                    <Users className='h-4 w-4' />
                  </motion.div>
                  Processing
                </span>
              ) : (
                <span className='flex items-center gap-2 justify-center whitespace-nowrap text-white'>
                  {checkFoodBotLab && lab.id === FOOD_BOT_LAB_ID ? (
                    <>
                      <Pause className='h-4 w-4' />
                      Continue
                    </>
                  ) : (
                    <>
                      <Play className='h-4 w-4' />
                      Start Lab
                    </>
                  )}
                </span>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>

      <JoinLabModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJoinAsMiner={handleJoinAsMiner}
        labType={lab.id === FOOD_BOT_LAB_ID ? "tutorial" : "regular"}
        labId={lab.id}
        isRegistering={isRegistering}
      />
    </motion.div>
  );
}
