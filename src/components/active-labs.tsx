"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterUser } from "@/hooks/use-register-user";
// For getting wallet address
import { motion, AnimatePresence } from "framer-motion";
import { Play, Users, Clock, Trophy, ArrowUpRight, Pause } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
import { useToast } from "@/hooks/use-toast";


const featuredLab = {
  id: 7,
  name: "Food Bot Jailbreak Tutorial",
  participants: 789,
  timeEstimate: "30-60 mins",
  pointsReward: 3500,
  successRate: 42,
  difficulty: "Medium",
  description:
    "Learn the basics of AI jailbreaking with this interactive Food Bot tutorial.",
};

export function ActiveLabs() {
  const router = useRouter();
  const { toast } = useToast();
  const activeAccount = useActiveAccount();
  const { mutateAsync: registerUser, isPending } = useRegisterUser();
  const checkFoodBotLab = !!localStorage.getItem("food_bot_walletAddress");
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
    if (checkFoodBotLab && featuredLab.id === 7) {
      router.push(`/labs/${featuredLab.id}/lab-details`);
      return;
    }
    try {
      // Register user first
      await registerUser({
        walletAddress: activeAccount.address,
        stake: 0,
      });

      // After successful registration, redirect to lab details
      router.push(`/labs/${featuredLab.id}/lab-details`);
    } catch (error) {
      console.error("Failed to start tutorial:", error);
      // Error is already handled by the mutation hook
    }
  };

  return (
    <div className='rounded-xl transition-all duration-300 h-full'>
      <Card className='group transition-all duration-300 shadow-lg h-full relative overflow-hidden bg-background border-none'>
        {/* <AnimatePresence> */}
        {/* <motion.div
            className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20'
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          /> */}
        {/* </AnimatePresence> */}

        <CardHeader className='text-center p-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <CardTitle className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4'>
              Start Prompt Miner
            </CardTitle>
            <CardDescription className='text-lg'>
              Begin your journey with our featured tutorial lab
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className='p-6 space-y-6'>
          <motion.div
            className='bg-gray-50 dark:bg-gray-800 rounded-xl p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <div className='space-y-4'>
              <div className='flex justify-between items-start mb-4'>
                <h3 className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
                  {featuredLab.name}
                </h3>
                <Badge
                  variant='outline'
                  className='bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'>
                  Tutorial
                </Badge>
              </div>

              <p className='text-gray-600 dark:text-gray-300'>
                {featuredLab.description}
              </p>

              <div className='grid grid-cols-2 gap-4 my-6'>
                <div className='flex items-center space-x-2'>
                  <Users className='w-5 h-5 text-blue-500' />
                  <span>{featuredLab.participants} users</span>
                </div>
                {/* <div className='flex items-center space-x-2'>
                  <Clock className='w-5 h-5 text-yellow-500' />
                  <span>{featuredLab.timeEstimate}</span>
                </div> */}
                <div className='flex items-center space-x-2'>
                  <Trophy className='w-5 h-5 text-purple-500' />
                  <span>{featuredLab.pointsReward} pts</span>
                </div>
              </div>

              {/* <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span>Completion Rate</span>
                  <span className='font-semibold'>
                    {featuredLab.successRate}%
                  </span>
                </div>
                <Progress value={featuredLab.successRate} className='h-2' />
              </div> */}

              <div className='flex space-x-4 mt-8'>
                <Button
                  className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold h-14'
                  size='lg'
                  onClick={handleStartTutorial}
                  disabled={isPending}>
                  {checkFoodBotLab && featuredLab.id === 7 ? (
                    <Pause className='mr-2 h-5 w-5' />
                  ) : (
                    <Play className='mr-2 h-5 w-5' />
                  )}
                  {isPending
                    ? "Starting..."
                    : checkFoodBotLab && featuredLab.id === 7
                    ? "Continue Lab"
                    : "Start Tutorial"}
                </Button>

                <Button variant='outline' size='lg' className='h-14' asChild>
                  <Link href={`/labs/${featuredLab.id}/lab-details`} passHref>
                    <ArrowUpRight className='h-5 w-5' />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
