export interface Lab {
  id: string;
  name: string;
  participants: number;
  gpuRequired: boolean;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  timeEstimate?: string;
  pointsReward?: number;
  successRate?: number;
  isTutorial?: boolean;
  localCLI?: boolean;
  description?: string;
  color?: string;
  GUI?: boolean;
  category: "Jailbreak" | "Optimization" | "Fine-tuning" | "Generation";
}

export const difficultyColors: Record<Lab["difficulty"], string> = {
  Easy: "bg-green-500",
  Medium: "bg-yellow-500",
  Hard: "bg-orange-500",
  Expert: "bg-red-500",
};

export const categoryIcons = {
  Jailbreak: "Zap",
  Optimization: "Cpu",
  "Fine-tuning": "Award",
  Generation: "Play",
} as const;