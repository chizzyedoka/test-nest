import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Award, Beaker, BarChart3, Cpu } from "lucide-react";

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

export const Details = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <motion.div
      className='grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      variants={bentoGridVariants}
      initial='hidden'
      animate='visible'>
      {[
        {
          title: "Total Points",
          icon: Award,
          value: "1,234",
          change: "+20%",
          color: "from-yellow-500 to-orange-500",
        },
        {
          title: "Active Labs",
          icon: Beaker,
          value: "5",
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
          title: "Model Performance",
          icon: Cpu,
          value: "89%",
          change: "+2%",
          color: "from-indigo-500 to-purple-500",
        },
      ].map((stat) => (
        <motion.div key={stat.title} variants={bentoItemVariants}>
          <Card
            className='transition-all duration-300 hover:shadow-lg overflow-hidden relative h-full'
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
              <div className='text-xl sm:text-2xl font-bold'>{stat.value}</div>
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
  );
};
