'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Timer, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const THEME = {
  colors: {
    pink: "#ff156a",
    orange: "#ff8a15",
  },
  gradients: {
    primary: "from-[#ff156a] to-[#ff8a15]",
  },
};

export function LeaderboardComponent() {
  return (
    <div className='min-h-screen bg-[#121212] text-white p-8 container mx-auto'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <Card className='relative overflow-hidden bg-gray-900/50 backdrop-blur-sm border-gray-800'>
          <div className='absolute inset-0 bg-gradient-to-r from-[#ff156a] to-[#ff8a15] opacity-5' />

          <CardContent className='relative z-10 p-12 flex flex-col items-center justify-center text-center space-y-6'>
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
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] bg-clip-text text-transparent'>
                Leaderboard Coming Soon
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='text-gray-400 text-lg'>
                We're working hard to bring you an exciting competitive
                experience. Stay tuned for updates and get ready to climb the
                ranks!
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
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}