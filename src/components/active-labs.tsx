import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronRight, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";

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

export const ActiveLabs = () => {
  const [isHovered, setIsHovered] = useState(false);

  const labs = [
    {
      name: "Food Bot Jailbreak",
      participants: 120,
      progress: 65,
      color: "from-red-500 to-pink-500",
    },
    {
      name: "Auto Trader Prompt Optimization",
      participants: 85,
      progress: 40,
      color: "from-orange-500 to-amber-500",
    },
    {
      name: "Lama Fine-tuning Challenge",
      participants: 200,
      progress: 80,
      color: "from-lime-500 to-green-500",
    },
  ];

  return (
    <div
      className={`p-1 sm:p-[2px] rounded-xl transition-all duration-300 h-full ${
        isHovered
          ? "bg-gradient-to-r from-purple-500 to-pink-500"
          : "bg-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Card className='transition-all duration-300 shadow-lg h-full relative overflow-hidden bg-background border-none'>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
        <CardHeader className='p-4 sm:p-6'>
          <CardTitle className='text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
            Active Labs
          </CardTitle>
          <CardDescription className='text-sm sm:text-base md:text-lg font-medium'>
            Current system prompts available for testing
          </CardDescription>
        </CardHeader>
        <CardContent className='p-4 sm:p-6'>
          <motion.div
            className='grid gap-4 grid-cols-1 xl:grid-cols-3'
            variants={bentoGridVariants}
            initial='hidden'
            animate='visible'>
            {labs.map((lab, index) => (
              <motion.div key={lab.name} variants={bentoItemVariants}>
                <div className='group bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4 md:p-5 transition-all duration-300 hover:shadow-md h-full flex flex-col justify-between'>
                  <div>
                    <div className='flex justify-between items-center mb-2 md:mb-3'>
                      <h3 className='font-semibold text-base sm:text-lg md:text-xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-2'>
                        {lab.name}
                      </h3>
                      <Link href={`/dashboard/labs/${index + 1}`}>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <ArrowUpRight className='h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5' />
                        </Button>
                      </Link>
                    </div>
                    <div className='flex items-center text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2 md:mb-3'>
                      <Users className='h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 md:mr-2' />
                      <span>{lab.participants} participants</span>
                    </div>
                  </div>
                  <div>
                    <div className='h-1.5 sm:h-2 md:h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                      <motion.div
                        className={`h-full bg-gradient-to-r ${lab.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${lab.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <div className='mt-1 sm:mt-2 md:mt-3 text-right text-xs sm:text-sm md:text-base font-medium text-gray-700 dark:text-gray-300'>
                      {lab.progress}% complete
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
        <CardFooter className='flex justify-end w-full mt-2 sm:mt-4 md:mt-6 p-4 sm:p-6'>
          <Link href='/dashboard/labs' className='w-full xl:w-auto'>
            <Button
              size='sm'
              variant='outline'
              className='w-full xl:w-auto md:text-lg group hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300'>
              <span className='mr-2 text-sm sm:text-base md:text-lg group-hover:font-semibold'>
                View All Labs
              </span>
              <ChevronRight className='h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-300' />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
