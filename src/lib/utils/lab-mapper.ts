import { Lab } from "@/components/labs/types";
import { FOOD_BOT_LAB_ID } from '@/config/food-bot-config';

interface LabParticipantsResponse {
  labid: string;
  total_users: number;
  active_users: number;
}

export async function fetchLabParticipants(labId: string): Promise<LabParticipantsResponse> {
  try {
    const response = await fetch(`/api/labs/${labId}/participants`, {
      cache: 'no-store', // Disable client-side caching
      next: { revalidate: 0 } // Disable server-side caching
    });

    if (!response.ok) return { labid: labId, total_users: 0, active_users: 0 };
    const data = await response.json()

    return data.participants;
  } catch (error) {
    console.error(`Failed to fetch participants for lab ${labId}:`, error);
    return { labid: labId, total_users: 0, active_users: 0 };
  }
}

export async function mapApiLabToLabType(apiLab: { labid: string; labname: string }): Promise<Lab> {
  const participants = await fetchLabParticipants(apiLab.labid);



  return {
    id: apiLab.labid,
    name: apiLab.labname,
    participants: participants.total_users,
    gpuRequired: false,
    difficulty: "Medium",
    localCLI: apiLab.labid === FOOD_BOT_LAB_ID,
    GUI: apiLab.labid === FOOD_BOT_LAB_ID,
    category: apiLab.labid === FOOD_BOT_LAB_ID ? "Jailbreak" : "Generation",
    description: "Learn the basics of AI jailbreaking with this interactive Food Bot tutorial."
  };
}

export async function mergeLabs(apiLabs: Array<{ labid: string; labname: string }> = []): Promise<Lab[]> {
  return Promise.all(apiLabs.map(mapApiLabToLabType));
}