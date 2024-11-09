"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LabCard } from "./labs/lab-card";
import { LabDetailsDialog } from "./labs/lab-details-dialog";
import { StatsHeader } from "./labs/stats-header";
import { SearchBar } from "./labs/search-bar";
import { labsData } from "./labs/labs-data";
import { Lab } from "./labs/types";
import { useActiveLabs } from "@/hooks/use-active-labs";
function mapApiLabToLabType(apiLab: { labid: string; labname: string }): Lab {
  return {
    id: apiLab.labid, // Convert first part of UUID to number
    name: apiLab.labname,
    participants: 789, // Default values for required fields
    gpuRequired: false,
    category: "Jailbreak", // Add missing required category field
    difficulty: "Medium",
    timeEstimate: "30-60 mins",
    pointsReward: 3500,
    successRate: 42,
    color: "from-purple-500 to-pink-500",
    isTutorial: true,
    description: "Interactive tutorial lab",
  };
}

export function LabsPageComponent({ isLogin }: { isLogin?: boolean }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Use the query hook
  const { data: apiLabs, isLoading, error } = useActiveLabs();

  console.log("apiLabs", apiLabs);

  // Map API labs to your Lab type and filter based on search
  const filteredLabs = apiLabs
    ? apiLabs
        .map(mapApiLabToLabType)
        .filter((lab) =>
          lab.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : [];

  console.log("filteredLabs", filteredLabs);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[#121212] text-white p-8 container mx-auto'>
        <header className='mb-12'>
          <h1 className='my-4 text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text'>
            Prompt Mining Labs
          </h1>
          <div className='animate-pulse space-y-4'>
            <div className='h-8 bg-gray-700 rounded w-3/4'></div>
            <div className='h-8 bg-gray-700 rounded w-1/2'></div>
          </div>
        </header>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-[#121212] text-white p-8 container mx-auto'>
        <div className='p-4 rounded-lg bg-red-900/50 border border-red-500'>
          <p>
            Error loading labs:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#121212] text-white p-8 container mx-auto'>
      <header className='mb-12'>
        <h1 className='my-4 text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text'>
          Prompt Mining Labs
        </h1>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0'>
          <StatsHeader
            totalParticipants={9281}
            activeGPUs={1337}
            pointsMined={42}
          />
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        </div>
      </header>

      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {filteredLabs.map((lab) => (
          <LabCard
            key={lab.id}
            lab={lab}
            isLogin={isLogin || false}
            onDetailsClick={(lab) => {
              setSelectedLab(lab);
              setIsDialogOpen(true);
            }}
          />
        ))}
      </motion.div>

      <LabDetailsDialog
        lab={selectedLab}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
