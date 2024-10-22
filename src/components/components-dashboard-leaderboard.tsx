"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Trophy, Medal, Award } from "lucide-react";
import Link from "next/link";

const leaderboardData = [
  {
    name: "Alice Johnson",
    points: 2500,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Bob Smith",
    points: 2350,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Charlie Brown",
    points: 2100,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Diana Prince",
    points: 1950,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Ethan Hunt",
    points: 1800,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const getRankIcon = (index: number) => {
  switch (index) {
    case 0:
      return <Trophy className='h-4 w-4 sm:h-5 sm:w-5 text-yellow-500' />;
    case 1:
      return <Medal className='h-4 w-4 sm:h-5 sm:w-5 text-gray-400' />;
    case 2:
      return <Award className='h-4 w-4 sm:h-5 sm:w-5 text-amber-600' />;
    default:
      return null;
  }
};

export function Leaderboard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`p-[1px] sm:p-[2px] rounded-xl transition-all duration-300 h-full ${
        isHovered
          ? "bg-gradient-to-r from-yellow-500 to-amber-500"
          : "bg-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Card className='transition-all duration-300 h-full relative overflow-hidden bg-background'>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 opacity-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
        <CardHeader className='p-4 sm:p-6'>
          <CardTitle className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent flex items-center'>
            <Trophy className='mr-2 h-5 w-5 sm:h-6 sm:w-6 text-yellow-500' />
            Leaderboard
          </CardTitle>
          <CardDescription className='font-medium text-sm sm:text-base'>
            Top performers this week
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4 sm:space-y-6 p-4 sm:p-6'>
          {leaderboardData.map((user, index) => (
            <motion.div
              key={user.name}
              className='flex items-center space-x-2 sm:space-x-4 p-2 sm:p-4 rounded-lg transition-colors duration-200 hover:bg-accent group'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}>
              <div className='flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-2xl font-bold'>
                {getRankIcon(index) || `#${index + 1}`}
              </div>
              <Avatar className='h-10 w-10 sm:h-16 sm:w-16'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className='flex-grow min-w-0'>
                <p className='font-semibold text-sm sm:text-lg truncate group-hover:font-semibold transition-all duration-200'>
                  {user.name}
                </p>
                <p className='text-xs sm:text-base text-muted-foreground group-hover:text-foreground transition-all duration-200'>
                  {user.points.toLocaleString()} points
                </p>
              </div>
              <Badge
                variant='secondary'
                className='ml-auto text-xs sm:text-base px-2 py-1 sm:px-3 sm:py-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200'>
                {index === 0
                  ? "Leader"
                  : `+${(
                      leaderboardData[0].points - user.points
                    ).toLocaleString()}`}
              </Badge>
            </motion.div>
          ))}
        </CardContent>
        <CardFooter className='flex justify-end w-full mt-2 sm:mt-4 p-4 sm:p-6'>
          <Link href='/dashboard/leaderboard' className='w-full sm:w-auto'>
            <Button
              size='sm'
              variant='outline'
              className='w-full group hover:bg-gradient-to-r hover:from-yellow-500 hover:to-amber-500 hover:text-white transition-all duration-300'>
              <span className='mr-2 text-sm sm:text-base group-hover:font-semibold'>
                View Full Leaderboard
              </span>
              <ChevronRight className='h-4 w-4 group-hover:translate-x-1 transition-transform duration-300' />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
