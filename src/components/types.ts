export interface Lab {
  id: string;
  name: string;
  participants: number;
  gpuRequired: boolean;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  timeEstimate: string;
  pointsReward: number;
  successRate: number;
  isTutorial?: boolean; // Optional property
  description?: string; // Optional property
  category: "Jailbreak" | "Optimization" | "Fine-tuning" | "Generation";
}