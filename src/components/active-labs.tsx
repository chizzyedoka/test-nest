"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useRegisterUser } from "@/hooks/use-register-user";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Users,
  Trophy,
  ArrowUpRight,
  Pause,
  Sparkles,
  Repeat,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
import { useToast } from "@/hooks/use-toast";
import { FOOD_BOT_LAB_ID } from "@/config/food-bot-config";
import { useUserData } from "@/hooks/use-user-data";

// Theme constants matching dashboard
const THEME = {
  colors: {
    pink: "#ff156a",
    orange: "#ff8a15",
  },
  gradients: {
    primary: "from-[#ff156a] to-[#ff8a15]",
    secondary: "from-purple-500 to-pink-500",
  },
};

const featuredLab = {
  id: FOOD_BOT_LAB_ID,
  name: "Food Bot Jailbreak Tutorial",
  participants: 789,
  pointsReward: 3500,
  description:
    "Learn the basics of AI jailbreaking with this interactive Food Bot tutorial.",
};

export function ActiveLabs() {
  const router = useRouter();
  const { toast } = useToast();
  const activeAccount = useActiveAccount();
  const params = useParams();
  const labId = params.labId as string;
  const { mutate: registerUser, isPending } = useRegisterUser();
  const { data: userData } = useUserData(activeAccount?.address);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const localWalletAddress = localStorage.getItem("food_bot_walletAddress");
  const checkFoodBotLab = localWalletAddress === activeAccount?.address;

  const handleStartTutorial = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!activeAccount?.address) {
      toast({
        variant: "destructive",
        title: "Connect Wallet",
        description: "Please connect your wallet first",
      });
      return;
    }

    try {
      if (checkFoodBotLab && labId === FOOD_BOT_LAB_ID) {
        router.push(`/labs/${FOOD_BOT_LAB_ID}/lab-details`);
        return;
      }

      await registerUser({
        walletAddress: activeAccount.address,
        stake: 0,
      });

      localStorage.setItem("food_bot_walletAddress", activeAccount.address);
      router.push(`/labs/${labId}/lab-details`);
    } catch (error) {
      console.error("Failed to start tutorial:", error);
    }
  };

  return (
    <div className='p-0  h-full'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='h-full'>
        <Card className='group h-full relative overflow-hidden bg-gray-900/50 backdrop-blur-sm border-gray-800'>
          <div className='absolute inset-0 bg-gradient-to-r from-[#ff156a] to-[#ff8a15] opacity-5' />

          <CardHeader className='text-center p-6 relative z-10'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <CardTitle className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] bg-clip-text text-transparent mb-4 flex items-center justify-center gap-2'>
                <Sparkles className='w-8 h-8' />
                Start Prompt Miner
              </CardTitle>
              <p className='text-lg text-gray-300'>
                Begin your journey with our featured tutorial lab
              </p>
            </motion.div>
          </CardHeader>

          <CardContent className='p-6 space-y-6 relative z-10'>
            <motion.div
              className='rounded-xl p-6 backdrop-blur-sm bg-gray-800/50 border border-gray-700'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <div className='space-y-4'>
                <div className='flex justify-between items-start mb-4'>
                  <h3 className='text-2xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] bg-clip-text text-transparent'>
                    {featuredLab.name}
                  </h3>
                  <Badge
                    variant='outline'
                    className='bg-gradient-to-r from-[#ff156a] to-[#ff8a15] text-white border-none'>
                    Tutorial
                  </Badge>
                </div>

                <p className='text-gray-300'>{featuredLab.description}</p>

                <div className='flex justify-start space-x-4 gap-4 my-6'>
                  <div className='flex items-center space-x-2 text-gray-300'>
                    <Repeat className='w-5 h-5 text-[#ff156a]' />
                    <span>{userData?.["Total Attempt"]} Attempts</span>
                  </div>
                  <div className='flex items-center space-x-2 text-gray-300'>
                    <Trophy className='w-5 h-5 text-[#ff8a15]' />
                    <span>{userData?.Point} pts</span>
                  </div>
                </div>

                <div className='flex space-x-4 mt-8'>
                  <Button
                    className='w-full h-14 bg-gradient-to-r from-[#ff156a] to-[#ff8a15] hover:opacity-90 transition-opacity text-white font-semibold'
                    onClick={handleStartTutorial}
                    disabled={isPending}>
                    {checkFoodBotLab && featuredLab.id === FOOD_BOT_LAB_ID ? (
                      <Pause className='mr-2 h-5 w-5' />
                    ) : (
                      <Play className='mr-2 h-5 w-5' />
                    )}
                    {isPending
                      ? "Starting..."
                      : checkFoodBotLab && featuredLab.id === FOOD_BOT_LAB_ID
                      ? "Continue Lab"
                      : "Start Tutorial"}
                  </Button>

                  <Button
                    variant='outline'
                    size='lg'
                    className='h-14 border-gray-700 hover:bg-gray-800 transition-colors'
                    asChild>
                    <Link href={`/labs/${FOOD_BOT_LAB_ID}/lab-details`}>
                      <ArrowUpRight className='h-5 w-5' />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
