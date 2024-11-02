"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveLabs } from "@/hooks/use-active-labs";
import { mergeLabs } from "@/lib/utils/lab-mapper";
import { Header } from "./home/nav";
import { LabCard } from "./labs/lab-card";
import { LabDetailsDialog } from "./labs/lab-details-dialog";

import { Lab } from "./labs/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "./labs/stats-card";

interface TabsComponentProps {
  activeTab: Lab["category"] | "All";
  onTabChange: (tab: Lab["category"] | "All") => void;
  filteredLabs: Lab[];
  isLogin: boolean;
  onLabClick: (lab: Lab) => void;
}

function TabsComponent({
  activeTab,
  onTabChange,
  filteredLabs,
  isLogin,
  onLabClick,
}: TabsComponentProps) {
  const tabs = [
    "All",
    "Jailbreak",
    "Optimization",
    "Fine-tuning",
    "Generation",
  ] as const;

  console.log("=========filteredLabs===========================");
  console.log(filteredLabs);
  console.log("==========filteredLabs==========================");

  return (
    <Tabs
      defaultValue='All'
      className='w-full'
      onValueChange={(value: string) =>
        onTabChange(value as (typeof tabs)[number])
      }>
      <TabsList className='grid w-full grid-cols-2 sm:grid-cols-5 lg:mb-10'>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className='relative overflow-hidden'>
            <span>{tab}</span>
            <motion.div
              className='absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600'
              initial={false}
              animate={{ scaleX: activeTab === tab ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab} value={tab}>
          <AnimatePresence mode='wait'>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
              {filteredLabs
                .filter((lab) => tab === "All" || lab.category === tab)
                .map((lab) => (
                  <LabCard
                    key={lab.id}
                    lab={lab}
                    onDetailsClick={() => onLabClick(lab)}
                    isLogin={isLogin}
                  />
                ))}
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export function LabsPage({ isLogin }: { isLogin: boolean }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<Lab["category"] | "All">("All");

  const { data: apiLabs, isLoading, error } = useActiveLabs();

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }, []);

  // Merge API labs with static data
  const allLabs = useMemo(() => mergeLabs(apiLabs), [apiLabs]);

  console.log("=========allLabs===========================");
  console.log(allLabs);
  console.log("==========allLabs==========================");

  // Filter labs based on search and active tab
  const filteredLabs = useMemo(() => {
    return allLabs.filter(
      (lab) =>
        lab.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeTab === "All" || lab.category === activeTab)
    );
  }, [allLabs, searchTerm, activeTab]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      totalParticipants: allLabs.reduce(
        (sum, lab) => sum + lab.participants,
        0
      ),
      activeGPUs: allLabs
        .filter((lab) => lab.gpuRequired)
        .reduce((sum, lab) => sum + lab.participants, 0),
      totalPointsMined: allLabs.reduce(
        (sum, lab) => sum + lab.pointsReward * lab.participants,
        0
      ),
    };
  }, [allLabs]);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white'>
        <Header
          searchTerm=''
          setSearchTerm={() => {}}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <main className='container mx-auto px-4 py-8 mt-24'>
          <div className='animate-pulse space-y-4'>
            <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4'></div>
            <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2'></div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white'>
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <main className='container mx-auto px-4 py-8 mt-24'>
          <div className='p-4 rounded-lg bg-red-100 dark:bg-red-900/50 border border-red-500'>
            <p>
              Error loading labs:{" "}
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""} flex flex-col`}>
      <div className='bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 flex-1'>
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className='container mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-24'>
          <div className='flex flex-col gap-8'>
            <div className='flex-1'>
              <TabsComponent
                activeTab={activeTab}
                onTabChange={setActiveTab}
                filteredLabs={filteredLabs}
                isLogin={isLogin}
                onLabClick={(lab) => {
                  setSelectedLab(lab);
                  setIsDialogOpen(true);
                }}
              />
            </div>

            <div className='w-full'>
              <div className='sticky top-24'>
                <StatsCard {...stats} />
              </div>
            </div>
          </div>
        </main>

        <LabDetailsDialog
          lab={selectedLab}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </div>
  );
}
