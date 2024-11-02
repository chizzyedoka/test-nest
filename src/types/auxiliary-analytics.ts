interface PromptAnalytics {
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

interface UserSessionAnalytics {
  id: string;
  userId: string;
  sessionStart: Date;
  sessionEnd?: Date;
  totalPrompts: number;
  totalTokensUsed: number;
  labInteractions?: Record<string, any>;
  createdAt: Date;
}

interface LabUsageAnalytics {
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