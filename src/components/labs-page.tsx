"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveLabs } from "@/hooks/use-active-labs";
import { mergeLabs } from "@/lib/utils/lab-mapper";
import { Header } from "./home/nav";
import { LabCard } from "./labs/lab-card";
import { LabDetailsDialog } from "./labs/lab-details-dialog";
import { Lab } from "./labs/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "./labs/stats-card";
import { Skeleton } from "@/components/ui/skeleton";
import { BOT_CONFIG } from "@/config/food-bot-config";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface TabsComponentProps {
  activeTab: Lab["category"] | "All";
  onTabChange: (tab: Lab["category"] | "All") => void;
  filteredLabs: Lab[];
  isLogin: boolean;
  onLabClick: (lab: Lab) => void;
}

// Add theme constants at the top
const THEME = {
  colors: {
    pink: "#ff156a",
    orange: "#ff8a15",
  },
};

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

  return (
    <Tabs
      defaultValue='All'
      className='w-full'
      onValueChange={(value: string) =>
        onTabChange(value as (typeof tabs)[number])
      }>
      <div className='relative mb-6 sm:mb-0'>
        <TabsList className='w-full grid grid-cols-2 sm:grid-cols-5 bg-transparent h-auto sm:h-10 gap-2 sm:gap-0 border-b border-[#ff156a]/20'>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className='relative px-3 sm:px-4 py-2 h-10 data-[state=active]:bg-transparent rounded-none text-sm sm:text-base hover:text-[#ff156a] transition-colors'>
              <span className='block truncate'>{tab}</span>
              <motion.div
                className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff156a] to-[#ff8a15]'
                initial={false}
                animate={{ scaleX: activeTab === tab ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => {
        const tabLabs = filteredLabs.filter(
          (lab) => tab === "All" || lab.category === tab
        );

        return (
          <TabsContent key={tab} value={tab} className='mt-6 sm:mt-4'>
            <AnimatePresence mode='wait'>
              {tabLabs.length > 0 && isLogin ? (
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className='grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
                  {tabLabs.map((lab) => (
                    <LabCard
                      key={lab.id}
                      lab={lab}
                      onDetailsClick={() => onLabClick(lab)}
                      isLogin={isLogin}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className='flex flex-col items-center justify-center min-h-[400px] py-16 px-4'>
                  <div className='relative w-full max-w-lg'>
                    {/* Animated background gradients */}
                    <div className='absolute top-0 -left-4 w-72 h-72 bg-[#ff156a] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob' />
                    <div className='absolute top-0 -right-4 w-72 h-72 bg-[#ff8a15] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000' />
                    <div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000' />

                    <div className='relative'>
                      <div className='p-8 backdrop-blur-lg bg-gray-900/90 rounded-2xl border border-[#ff156a]/20 shadow-2xl'>
                        <motion.div
                          initial={{ scale: 1, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className='space-y-6'>
                          <div className='relative w-20 h-20 mx-auto'>
                            <div className='absolute inset-0 bg-gradient-to-r from-[#ff156a] to-[#ff8a15] rounded-full opacity-50 blur-md' />
                            <div className='relative bg-gradient-to-r from-[#ff156a] to-[#ff8a15] rounded-full p-5'>
                              <motion.div
                                animate={{
                                  rotate: 360,
                                  scale: [1, 1, 1],
                                }}
                                transition={{
                                  rotate: {
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear",
                                  },
                                  scale: { duration: 2, repeat: Infinity },
                                }}
                                className='text-white'>
                                {!isLogin ? (
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-10 w-10'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'>
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth={2}
                                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-10 w-10'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'>
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth={2}
                                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                  </svg>
                                )}
                              </motion.div>
                            </div>
                          </div>

                          <div className='space-y-2'>
                            <h3 className='text-2xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] bg-clip-text text-transparent'>
                              {!isLogin
                                ? "Connect Your Wallet"
                                : "Coming Soon..."}
                            </h3>
                            <p className='text-gray-400 text-sm'>
                              {!isLogin
                                ? "Please connect your wallet to view and participate in labs"
                                : "New labs are being developed. Check back later!"}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

export function LabsPage({ isLogin }: { isLogin: boolean }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<Lab["category"] | "All">("All");
  const [mergedLabs, setMergedLabs] = useState<Lab[]>([]);
  const [isLoadingLabs, setIsLoadingLabs] = useState(true);

  const { data: apiLabs, isLoading: isLoadingApi, error } = useActiveLabs();
  const pathname = usePathname();
  const myLab = pathname.includes("/labs");
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }, []);

  // Handle merging labs when API data changes
  useEffect(() => {
    async function handleMergeLabs() {
      if (apiLabs) {
        setIsLoadingLabs(true);
        try {
          const labs = await mergeLabs(apiLabs);
          setMergedLabs(labs);
        } catch (error) {
          console.error("Error merging labs:", error);
          setIsLoadingLabs(false);
        } finally {
          setIsLoadingLabs(false);
        }
      }
    }

    handleMergeLabs();
  }, [apiLabs]);

  // Filter labs based on search and active tab
  const filteredLabs = mergedLabs.filter(
    (lab) =>
      lab.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === "All" || lab.category === activeTab)
  );

  // Calculate stats
  const stats = {
    totalParticipants: mergedLabs.reduce(
      (sum, lab) => sum + lab.participants,
      0
    ),
    activeGPUs: mergedLabs
      .filter((lab) => lab.gpuRequired)
      .reduce((sum, lab) => sum + lab.participants, 0),
    totalPointsMined: mergedLabs.reduce(
      (sum, lab) => sum + (lab.pointsReward || 0) * lab.participants,
      0
    ),
  };

  if (isLoadingApi) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white'>
        {myLab ? null : (
          <Header
            searchTerm=''
            setSearchTerm={() => {}}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
        <main className='container mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-24'>
          <div className='flex flex-col gap-8'>
            <div className='flex-1'>
              {/* Tabs Skeleton */}
              <div className='space-y-6'>
                <div className='flex gap-2 border-b border-gray-700 pb-2'>
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className='h-10 w-24 rounded-lg' />
                  ))}
                </div>

                {/* Cards Grid Skeleton */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 space-y-4'>
                      {/* Card Header */}
                      <div className='space-y-3'>
                        <div className='flex justify-between'>
                          <Skeleton className='h-7 w-48' />
                          <div className='flex gap-2'>
                            <Skeleton className='h-6 w-16' />
                            <Skeleton className='h-6 w-16' />
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          <Skeleton className='h-6 w-20' />
                          <Skeleton className='h-6 w-24' />
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className='grid grid-cols-2 gap-4 py-4'>
                        {[1, 2].map((j) => (
                          <div
                            key={j}
                            className='space-y-2 p-3 rounded-lg bg-gray-700/50'>
                            <div className='flex items-center gap-2'>
                              <Skeleton className='h-4 w-4' />
                              <Skeleton className='h-4 w-20' />
                            </div>
                            <Skeleton className='h-6 w-16' />
                          </div>
                        ))}
                      </div>

                      {/* Description */}
                      <div className='space-y-2'>
                        <Skeleton className='h-4 w-full' />
                        <Skeleton className='h-4 w-2/3' />
                      </div>

                      {/* Buttons */}
                      <div className='flex gap-2 pt-2'>
                        <Skeleton className='h-10 w-full' />
                        <Skeleton className='h-10 w-full' />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Card Skeleton */}
            <div className='w-full'>
              <div className='sticky top-24'>
                <div className='bg-gray-800 rounded-xl p-6 space-y-4'>
                  <Skeleton className='h-6 w-32' />
                  <div className='space-y-4'>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className='flex justify-between items-center'>
                        <Skeleton className='h-5 w-36' />
                        <Skeleton className='h-5 w-24' />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white'>
  //       <Header
  //         searchTerm={searchTerm}
  //         setSearchTerm={setSearchTerm}
  //         isDarkMode={isDarkMode}
  //         toggleDarkMode={toggleDarkMode}
  //       />
  //       <main className='container mx-auto px-4 py-8 mt-24'>

  //       </main>
  //     </div>
  //   );
  // }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark" : ""
      } flex flex-col overflow-y-auto`}>
      <div className='bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 flex-1'>
        {myLab ? null : (
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}

        <main className='container mx-auto px-4 py-8 sm:px-6 lg:px-8  '>
          {!myLab && (
            <div className='w-full mt-[70px] lg:mt-24 mb-4'>
              {error && isLogin && (
                <div className='p-4 rounded-lg bg-red-100 dark:bg-red-900/50 border border-red-500 mb-1'>
                  <p>
                    Error loading labs:{" "}
                    {error instanceof Error ? error.message : "Unknown error"}
                  </p>
                </div>
              )}
              {!isLogin && (
                <div className='p-4 mb-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-500'>
                  <p className='text-yellow-800 dark:text-yellow-200'>
                    Please connect your wallet to participate in labs and start
                    earning rewards.
                  </p>
                </div>
              )}
              <StatsCard {...stats} />
            </div>
          )}
          <div className={cn("flex flex-col gap-8", myLab && "mt-8")}>
            <div className='flex-1 min-h-[80vh]'>
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

            <LabDetailsDialog
              lab={selectedLab}
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
