import { Lab } from "@/components/labs/types";
import { labsData } from "@/components/labs/labs-data";

export function mapApiLabToLabType(apiLab: { labid: string; labname: string }): Lab {
  // Try to find matching static lab data
  console.log("=========mapApiLabToLabType===========================");
  console.log(apiLab);
  console.log("==========mapApiLabToLabType==========================");
  const staticLab = labsData.find(lab => lab.name === apiLab.labname);

  if (staticLab) {
    return {
      ...staticLab,
      id: apiLab.labid, // Use API ID
    };
  }

  // Return default lab data if no static match found
  return {
    id: apiLab.labid,
    name: apiLab.labname,
    participants: 0,
    gpuRequired: false,
    difficulty: "Medium",
    timeEstimate: "30-60 mins",
    pointsReward: 1000,
    successRate: 0,
    category: "Generation",
    description: "New lab from API"
  };
}

export function mergeLabs(apiLabs: Array<{ labid: string; labname: string }> = []): Lab[] {
  console.log("=========apiLabs===========================");
  console.log(apiLabs);
  console.log("==========apiLabs==========================");
  const apiMappedLabs = apiLabs.map(mapApiLabToLabType);
  console.log("=========apiMappedLabs===========================");
  console.log(apiMappedLabs);
  console.log("==========apiMappedLabs==========================");
  // Combine static and API labs, preferring API data when there's overlap
  const combinedLabs = [...labsData];

  apiMappedLabs.forEach(apiLab => {
    const existingIndex = combinedLabs.findIndex(lab => lab.name === apiLab.name);
    if (existingIndex >= 0) {
      combinedLabs[existingIndex] = apiLab;
    } else {
      combinedLabs.push(apiLab);
    }
  });

  return combinedLabs;
}