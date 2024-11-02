import { db } from '@/lib/db';
// import { PromptAnalytics } from '@/types/analytics';

interface RequiredPromptAnalytics {
  userId: string;
  labId: string;
  promptText: string;
  tokensUsed: number;
  completionTokens: number;
  promptTokens: number;
  modelUsed: string;
  responseTimeMs?: number;
  success?: boolean;
  errorMessage?: string;
  metadata?: Record<string, any>;
}

export async function logPromptAnalytics(data: RequiredPromptAnalytics) {
  try {
    await db.promptAnalytics.create({
      data: {
        userId: data.userId,
        labId: data.labId,
        promptText: data.promptText,
        tokensUsed: data.tokensUsed,
        completionTokens: data.completionTokens,
        promptTokens: data.promptTokens,
        modelUsed: data.modelUsed,
        responseTimeMs: data.responseTimeMs,
        success: data.success ?? true,
        errorMessage: data.errorMessage,
        metadata: data.metadata
      }
    });
  } catch (error) {
    console.error('Failed to log prompt analytics:', error);
  }
}