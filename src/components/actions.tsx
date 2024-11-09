import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Terminal, Book, Brain, Sparkles, LucideIcon } from "lucide-react";

// Theme constants matching dashboard
const THEME = {
  colors: {
    pink: "#ff156a",
    orange: "#ff8a15",
  },
  gradients: {
    primary: "from-[#ff156a] to-[#ff8a15]",
  },
};

interface ActionItem {
  icon: LucideIcon;
  label: string;
  description: string;
  href: string;
}

const actionItems: ActionItem[] = [
  {
    icon: Zap,
    label: "Setup GPU",
    description: "Configure your GPU for optimal performance",
    href: "/dashboard/setup-gpu",
  },
  {
    icon: Terminal,
    label: "Setup CLI",
    description: "Install and configure the command line interface",
    href: "/dashboard/setup-cli",
  },
  {
    icon: Book,
    label: "Tutorials",
    description: "Learn the basics of prompt mining",
    href: "/dashboard/tutorials",
  },
  {
    icon: Brain,
    label: "AI Insights",
    description: "Explore AI trends and analytics",
    href: "/dashboard/ai-insights",
  },
];

export function Actions() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <Card className='h-full bg-gray-900/50 backdrop-blur-sm border-gray-800'>
      <CardHeader className='p-4 lg:p-6'>
        <div className='flex items-center gap-3'>
          <div className='p-2.5 rounded-xl bg-gradient-to-r from-[#ff156a] to-[#ff8a15] shadow-lg shadow-pink-500/20'>
            <Sparkles className='w-5 h-5 text-white' />
          </div>
          <div className='min-w-0 flex-1'>
            <CardTitle className='text-lg sm:text-xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] bg-clip-text text-transparent truncate'>
              Quick Actions
            </CardTitle>
            <CardDescription className='text-sm text-gray-400 mt-1 truncate'>
              Get started with prompt mining tools and resources
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-3 sm:p-4 lg:p-6'>
        <div className='space-y-2 sm:space-y-3'>
          {actionItems.map((action) => (
            <motion.div
              key={action.label}
              onHoverStart={() => setHoveredItem(action.label)}
              onHoverEnd={() => setHoveredItem(null)}>
              <Link href={action.href}>
                <Button
                  variant='outline'
                  className='w-full h-auto p-0 bg-gray-800/50 hover:bg-gray-800/80 border-gray-700 hover:border-[#ff156a]/50 transition-all duration-300 group relative overflow-hidden rounded-xl'>
                  <AnimatePresence>
                    {hoveredItem === action.label && (
                      <motion.div
                        className='absolute inset-0 bg-gradient-to-r from-[#ff156a] to-[#ff8a15]'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className='flex items-center w-full px-4 py-3 sm:px-5 sm:py-4 gap-3 sm:gap-4'>
                    <div
                      className='flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl
                                 bg-gradient-to-r from-[#ff156a] to-[#ff8a15]
                                 flex items-center justify-center shadow-lg shadow-pink-500/20
                                 group-hover:shadow-pink-500/30 transition-shadow duration-300'>
                      <action.icon className='w-5 h-5 text-white' />
                    </div>

                    <div className='flex-grow min-w-0'>
                      <span
                        className='block text-base font-semibold
                                   text-gray-200 group-hover:text-white transition-colors
                                   truncate'>
                        {action.label}
                      </span>
                      <span
                        className='block text-sm text-gray-400
                                   group-hover:text-gray-300 transition-colors
                                   truncate mt-1'>
                        {action.description}
                      </span>
                    </div>

                    <motion.div
                      className='flex-shrink-0 opacity-0 group-hover:opacity-100
                                 transition-opacity hidden sm:block'
                      initial={false}
                      animate={
                        hoveredItem === action.label ? { x: 0 } : { x: 10 }
                      }>
                      <div
                        className='w-8 h-8 rounded-xl
                                   bg-gradient-to-r from-[#ff156a] to-[#ff8a15]
                                   flex items-center justify-center shadow-lg
                                   shadow-pink-500/20'>
                        <Zap className='w-4 h-4 text-white' />
                      </div>
                    </motion.div>
                  </div>
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Actions;