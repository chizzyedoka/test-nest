"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Medal,
  Crown,
  Star,
  ArrowUp,
  ArrowDown,
  Search,
  Users,
  Sparkles,
  Timer,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const THEME = {
  colors: {
    pink: "#ff156a",
    orange: "#ff8a15",
  },
  gradients: {
    primary: "from-[#ff156a] to-[#ff8a15]",
  },
};

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  change: number;
  badge?: "gold" | "silver" | "bronze";
}

const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "CryptoWhiz",
    avatar: "/avatars/01.png",
    points: 152000,
    change: 2,
    badge: "gold",
  },
  {
    rank: 2,
    name: "AIExplorer",
    avatar: "/avatars/02.png",
    points: 149500,
    change: -1,
    badge: "silver",
  },
  {
    rank: 3,
    name: "PromptMaster",
    avatar: "/avatars/03.png",
    points: 145000,
    change: 1,
    badge: "bronze",
  },
  {
    rank: 4,
    name: "NeuralNinja",
    avatar: "/avatars/04.png",
    points: 140000,
    change: 0,
  },
  {
    rank: 5,
    name: "DataDragon",
    avatar: "/avatars/05.png",
    points: 138000,
    change: 3,
  },
];

export function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFrame, setTimeFrame] = useState("all");
  const [hoveredRank, setHoveredRank] = useState<number | null>(null);

  const getBadgeIcon = (badge?: "gold" | "silver" | "bronze") => {
    switch (badge) {
      case "gold":
        return <Crown className='w-6 h-6 text-yellow-400' />;
      case "silver":
        return <Medal className='w-6 h-6 text-gray-400' />;
      case "bronze":
        return <Trophy className='w-6 h-6 text-amber-600' />;
      default:
        return <Star className='w-6 h-6 text-gray-600' />;
    }
  };

  return (
    <Card className='h-full bg-gray-900/50 backdrop-blur-sm border-gray-800'>
      <CardHeader className='p-6'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-gradient-to-r from-[#ff156a] to-[#ff8a15]'>
              <Trophy className='w-5 h-5 text-white' />
            </div>
            <div>
              <CardTitle className='text-xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] bg-clip-text text-transparent'>
                Top Miners
              </CardTitle>
              <div className='flex items-center gap-2 text-sm text-gray-400 mt-1'>
                <Users className='w-4 h-4' />
                <span>Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-6 pt-0'>
        <motion.div
          className='relative overflow-hidden rounded-lg'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <div className='absolute inset-0 bg-gradient-to-r from-[#ff156a] to-[#ff8a15] opacity-5' />

          <div className='relative z-10 p-12 flex flex-col items-center justify-center text-center space-y-6'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
              className='p-3 rounded-full bg-gradient-to-r from-[#ff156a] to-[#ff8a15]'>
              <Timer className='w-8 h-8 text-white' />
            </motion.div>

            <div className='space-y-4 max-w-lg'>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='text-2xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] bg-clip-text text-transparent'>
                Leaderboard Coming Soon
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='text-gray-400'>
                We're working to bring you an exciting competitive experience.
                Stay tuned for updates and get ready to climb the ranks!
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className='flex items-center gap-2 text-sm text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full'>
              <Sparkles className='w-4 h-4 text-[#ff156a]' />
              <span>Feature launching soon</span>
            </motion.div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
