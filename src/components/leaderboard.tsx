'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Search, Trophy, Star, Zap, Users, ArrowUp, ArrowDown } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LeaderboardComponent() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [timeFrame, setTimeFrame] = React.useState('all')

  const leaderboardData = [
    { id: 1, name: 'CryptoWhiz', avatar: '/placeholder.svg?height=40&width=40', points: 152000, rank: 1, change: 2 },
    { id: 2, name: 'AIExplorer', avatar: '/placeholder.svg?height=40&width=40', points: 149500, rank: 2, change: -1 },
    { id: 3, name: 'PromptMaster', avatar: '/placeholder.svg?height=40&width=40', points: 145000, rank: 3, change: 1 },
    { id: 4, name: 'NeuralNinja', avatar: '/placeholder.svg?height=40&width=40', points: 140000, rank: 4, change: 0 },
    { id: 5, name: 'DataDragon', avatar: '/placeholder.svg?height=40&width=40', points: 138000, rank: 5, change: 3 },
  ]

  return (
    <div className='min-h-screen bg-[#121212] text-white p-8 container mx-auto'>
      <header className='mb-12'>
        <h1 className='my-4 text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text'>
          Leaderboard
        </h1>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0'>
          <div className='flex flex-wrap gap-4'>
            <div className='flex items-center space-x-2 bg-gray-800 p-2 rounded-md'>
              <Trophy className='text-yellow-400' />
              <span>Top Miners</span>
            </div>
            <div className='flex items-center space-x-2 bg-gray-800 p-2 rounded-md'>
              <Users className='text-blue-400' />
              <span>Total Participants: 9,281</span>
            </div>
            <div className='flex items-center space-x-2 bg-gray-800 p-2 rounded-md'>
              <Zap className='text-purple-400' />
              <span>Total Points: 42M</span>
            </div>
          </div>
          <div className='flex space-x-4'>
            <div className='relative w-full md:w-auto'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              <Input
                type='text'
                placeholder='Search miners...'
                className='pl-10 bg-gray-800 border-gray-700 text-white w-full md:w-64'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select time frame" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="day">Last 24 hours</SelectItem>
                <SelectItem value="week">This week</SelectItem>
                <SelectItem value="month">This month</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <motion.div
        className='space-y-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {leaderboardData.map((miner, index) => (
          <motion.div
            key={miner.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className='bg-gray-800 border-none overflow-hidden'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <Avatar className='h-12 w-12'>
                        <AvatarImage src={miner.avatar} alt={miner.name} />
                        <AvatarFallback>{miner.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className='text-lg font-semibold'>{miner.name}</p>
                      <p className='text-sm text-gray-400'>Rank #{miner.rank}</p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <div className='text-right'>
                      <p className='text-2xl font-bold'>{miner.points.toLocaleString()}</p>
                      <p className='text-sm text-gray-400'>Points</p>
                    </div>
                    <div className={`flex items-center ${miner.change > 0 ? 'text-green-400' : miner.change < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                      {miner.change > 0 ? <ArrowUp className='h-4 w-4' /> : miner.change < 0 ? <ArrowDown className='h-4 w-4' /> : null}
                      <span className='text-sm'>{Math.abs(miner.change)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className='mt-8 flex justify-center'>
        <Button className='bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300'>
          View Full Leaderboard
        </Button>
      </div>
    </div>
  )
}