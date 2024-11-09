// Analytics Types
export interface PromptAnalytics {
  id: string;
  userId: string;
  labId: string;
  promptText: string;
  tokensUsed: number;
  completionTokens: number;
  promptTokens: number;
  modelUsed: string;
  createdAt: Date;
  responseTimeMs: number;
  success: boolean;
  errorMessage?: string;
  metadata?: Record<string, any>;
}

export interface UserSessionAnalytics {
  id: string;
  userId: string;
  sessionStart: Date;
  sessionEnd?: Date;
  totalPrompts: number;
  totalTokensUsed: number;
  labInteractions?: Record<string, any>;
  createdAt: Date;
}

export interface LabUsageAnalytics {
  id: string;
  labId: string;
  date: Date;
  totalUsers: number;
  totalPrompts: number;
  totalTokensUsed: number;
  averageResponseTimeMs: number;
  successRate: number;
  createdAt: Date;
}

export interface LabPerformanceMetrics {
  id: string;
  labId: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  gpuRequired: boolean;
  timeEstimate: string;
  pointsReward: number;
  category: 'Jailbreak' | 'Optimization' | 'Fine-tuning' | 'Generation';
  activeParticipants: number;
  successRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgressMetrics {
  id: string;
  userId: string;
  labId: string;
  points: number;
  attempts: number;
  successfulBreaks: number;
  timeSpent: number;
  lastAttempt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface JailbreakAttempts {
  id: string;
  userId: string;
  labId: string;
  promptText: string;
  response: string;
  isSuccessful: boolean;
  techniqueUsed?: string;
  pointsEarned: number;
  createdAt: Date;
}

export interface GlobalLabStats {
  id: string;
  totalParticipants: number;
  activeGPUs: number;
  totalPointsMined: number;
  date: Date;
  createdAt: Date;
}