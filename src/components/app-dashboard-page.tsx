"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Leaderboard } from "./components-dashboard-leaderboard";
import { ActiveLabs } from "./active-labs";
import { Actions } from "./actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Award, Beaker, BarChart3, Users, Sparkles } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FOOD_BOT_LAB_ID } from "@/config/food-bot-config";
import { useLabCounts } from "@/hooks/use-lab-counts";

// Theme constants matching labs-page
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

const bentoGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const bentoItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Dashboard({ labId }: { labId?: string }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { data: labCounts } = useLabCounts(labId!);

  const stats = [
    {
      title: "Total Prompts",
      icon: Sparkles,
      value: "0",
      change: "+20%",
      color: THEME.gradients.primary,
    },
    {
      title: "Total Points",
      icon: Award,
      value: "1,234",
      change: "+2",
      color: THEME.gradients.primary,
    },
    {
      title: "Successful Attempts",
      icon: BarChart3,
      value: "42",
      change: "+15%",
      color: THEME.gradients.primary,
    },
    {
      title: "Active Users",
      icon: Users,
      value: labCounts?.active_users.toString() || "0",
      change: labCounts
        ? `+${labCounts.active_users - labCounts.total_users}`
        : "+0",
      color: THEME.gradients.primary,
    },
  ];

  return (
    <div className='relative min-h-screen bg-gray-900 rounded-xl'>
      {/* Animated background gradients */}
      <div className='fixed inset-0 overflow-hidden'>
        <div className='absolute top-0 -left-4 w-72 h-72 bg-[#ff156a] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob' />
        <div className='absolute top-0 -right-4 w-72 h-72 bg-[#ff8a15] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000' />
        <div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000' />
      </div>

      <div className='relative z-10 p-4 sm:p-6 pb-16 space-y-6 sm:space-y-8 mt-16 container mx-auto '>
        <div className='flex justify-start items-center'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] text-transparent bg-clip-text'>
            {labId === FOOD_BOT_LAB_ID
              ? "Food Bot Jailbreak Dashboard"
              : "Dashboard"}
          </h1>
        </div>

        <motion.div
          className='grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          variants={bentoGridVariants}
          initial='hidden'
          animate='visible'>
          {stats.map((stat) => (
            <motion.div key={stat.title} variants={bentoItemVariants}>
              <Card
                className='backdrop-blur-sm bg-gray-900/50 border border-gray-800 transition-all duration-300 hover:shadow-lg overflow-hidden relative group'
                onMouseEnter={() => setHoveredCard(stat.title)}
                onMouseLeave={() => setHoveredCard(null)}>
                <AnimatePresence>
                  {hoveredCard === stat.title && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium text-gray-200'>
                    {stat.title}
                  </CardTitle>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: hoveredCard === stat.title ? 1.2 : 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 10,
                    }}>
                    <stat.icon
                      className={`h-5 w-5 bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}
                    />
                  </motion.div>
                </CardHeader>

                <CardContent>
                  <div className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] bg-clip-text text-transparent'>
                    {stat.value}
                  </div>
                  <p className='text-xs text-gray-400'>
                    {stat.change} from last week
                  </p>
                </CardContent>

                <motion.div
                  className={`h-0.5 w-full bg-gradient-to-r ${stat.color}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className='grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-3'
          variants={bentoGridVariants}
          initial='hidden'
          animate='visible'>
          <motion.div
            variants={bentoItemVariants}
            className='xl:col-span-2 h-full backdrop-blur-sm bg-gray-900/50 border border-gray-800 rounded-xl'>
            <ActiveLabs />
          </motion.div>

          <motion.div
            variants={bentoItemVariants}
            className='h-full backdrop-blur-sm bg-gray-900/50 border border-gray-800 rounded-xl'>
            <Actions />
          </motion.div>

          <motion.div
            variants={bentoItemVariants}
            className='xl:col-span-3 backdrop-blur-sm bg-gray-900/50 border border-gray-800 rounded-xl'>
            <Leaderboard />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
