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
import {
  Zap,
  Target,
  Terminal,
  Book,
  Rocket,
  Brain,
  LucideIcon,
} from "lucide-react";

interface ActionItem {
  icon: LucideIcon;
  label: string;
  href: string;
  color: string;
}

const actionItems: ActionItem[] = [
  {
    icon: Zap,
    label: "Setup GPU",
    href: "/dashboard/setup-gpu",
    color: "from-yellow-500 to-orange-500",
  },
  // {
  //   icon: Target,
  //   label: "Connect API",
  //   href: "/dashboard/connect-openai",
  //   color: "from-green-500 to-emerald-500",
  // },
  {
    icon: Terminal,
    label: "Setup CLI",
    href: "/dashboard/setup-cli",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Book,
    label: "Tutorials",
    href: "/dashboard/tutorials",
    color: "from-indigo-500 to-purple-500",
  },
  // {
  //   icon: Rocket,
  //   label: "Launch Lab",
  //   href: "/dashboard/launch-lab",
  //   color: "from-pink-500 to-rose-500",
  // },
  {
    icon: Brain,
    label: "AI Insights",
    href: "/dashboard/ai-insights",
    color: "from-violet-500 to-indigo-500",
  },
];

export const Actions: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`p-[1px] sm:p-[2px] rounded-xl transition-all duration-300 h-full ${
        isHovered
          ? "bg-gradient-to-r from-blue-500 to-cyan-500"
          : "bg-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Card className='transition-all duration-300 h-full relative overflow-hidden bg-background'>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
        <CardHeader className='p-4 sm:px-2 sm:p-6'>
          <CardTitle className='text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>
            Quick Actions
          </CardTitle>
          <CardDescription className='text-sm sm:text-base md:text-lg font-medium'>
            Get started with prompt mining
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col md:grid md:grid-cols-3 gap-2 sm:gap-2 p-4 sm:px-2 sm:p-6'>
          {actionItems.map((action) => (
            <Button
              key={action.label}
              asChild
              variant='outline'
              className='h-20 sm:h-24 md:h-28 w-full flex flex-row md:flex-col items-center justify-start md:justify-center space-x-4 md:space-x-0 md:space-y-2 hover:bg-accent relative overflow-hidden group px-2  rounded-lg'>
              <Link
                href={action.href}
                className='w-full h-full flex flex-row md:flex-col items-center justify-start md:justify-center px-2'>
                <motion.div
                  className={`bg-gradient-to-r ${action.color} rounded-full p-1 sm:p-2 md:p-3`}
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}>
                  <action.icon className='h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white' />
                </motion.div>
                <span className='text-xs sm:text-sm font-medium text-left md:text-center group-hover:text-foreground transition-colors duration-200 ml-4 md:ml-0 md:mt-2'>
                  {action.label}
                </span>
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
