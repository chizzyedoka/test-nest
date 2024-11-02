"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Leaderboard } from "./components-dashboard-leaderboard";
import { ActiveLabs } from "./active-labs";
import { Details } from "./details";
import { Actions } from "./actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Award, Beaker, BarChart3, Cpu } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// Add interface for analytics data
interface LabAnalytics {
  totalPrompts: number;
  totalTokensUsed: number;
  successRate: number;
  averageResponseTimeMs: number;
}

const bentoGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const bentoItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Dashboard({ labId }: { labId?: string }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Add query to fetch analytics data
  const { data: analyticsData } = useQuery<LabAnalytics>({
    queryKey: ["lab-analytics", labId],
    queryFn: async () => {
      const today = new Date();
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      const params = new URLSearchParams({
        startDate: lastWeek.toISOString(),
        endDate: today.toISOString(),
        ...(labId && { labId }),
      });

      const response = await fetch(`/api/analytics?${params}`);
      if (!response.ok) throw new Error("Failed to fetch analytics");
      return response.json();
    },
    enabled: !!labId,
  });

  const stats = [
    {
      title: "Total Prompts",
      icon: Award,
      value: analyticsData?.totalPrompts ?? "0",
      change: "+20%",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Total Points",
      icon: Beaker,
      value: "1,234",
      change: "+2",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Successful Attempts",
      icon: BarChart3,
      value: "42",
      change: "+15%",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Active Labs",
      icon: Beaker,
      value: "5",
      change: "+2",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className='relative min-h-screen'>
      <div className='p-4 sm:p-6 pb-16 space-y-6 sm:space-y-8 mt-16 container mx-auto relative z-10'>
        <div className='flex justify-start items-center'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text'>
            {labId === "7" ? "Food Bot Jailbreak Dashboard" : "Dashboard"}
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
                className='transition-all duration-300 hover:shadow-lg overflow-hidden relative'
                onMouseEnter={() => setHoveredCard(stat.title)}
                onMouseLeave={() => setHoveredCard(null)}>
                <AnimatePresence>
                  {hoveredCard === stat.title && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-20`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-semibold'>
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
                  <div className='text-xl sm:text-2xl font-bold'>
                    {stat.value}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {stat.change} from last week
                  </p>
                </CardContent>
                <motion.div
                  className={`h-1 w-full bg-gradient-to-r ${stat.color}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* <Details /> */}

        <motion.div
          className='grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-3'
          variants={bentoGridVariants}
          initial='hidden'
          animate='visible'>
          <motion.div
            variants={bentoItemVariants}
            className='xl:col-span-2 h-full'>
            <ActiveLabs />
          </motion.div>

          <motion.div variants={bentoItemVariants} className='h-full'>
            <Actions />
          </motion.div>

          <motion.div variants={bentoItemVariants} className='xl:col-span-3'>
            <Leaderboard />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
