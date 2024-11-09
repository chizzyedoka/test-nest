import OpenAI from 'openai';
import { db } from '@/lib/db';
import { isAddress } from 'ethers';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface AnalyticsQuery {
  startDate?: Date;
  endDate?: Date;
  labId?: string;
  userId?: string; // Ethereum address
}

export async function analyzePromptPatterns({
  startDate,
  endDate,
  labId,
  userId
}: AnalyticsQuery) {
  try {
    // Validate Ethereum address
    const validUserId = userId && isAddress(userId) ? userId : undefined;

    // Validate lab ID (assuming it's still a UUID)
    const validLabId = labId?.length === 36 ? labId : undefined;

    // Fetch relevant data
    const promptData = await db.promptAnalytics.findMany({
      where: {
        labId: validLabId,
        userId: validUserId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        promptText: true,
        success: true,
        tokensUsed: true,
        responseTimeMs: true,
        metadata: true,
        createdAt: true,
      },
    });

    if (!promptData.length) {
      return "No analytics data available for the selected period.";
    }

    // Format data for OpenAI
    const analysisPrompt = `Analyze the following prompt data and provide insights:
    - Common patterns in successful prompts
    - Areas of improvement
    - Token usage optimization suggestions
    - Response time patterns
    - Success rate trends

    Data Summary:
    - Total Prompts: ${promptData.length}
    - Success Rate: ${(promptData.filter(p => p.success).length / promptData.length * 100).toFixed(2)}%
    - Average Response Time: ${(promptData.reduce((acc, p) => acc + (p.responseTimeMs || 0), 0) / promptData.length).toFixed(2)}ms

    Detailed Data: ${JSON.stringify(promptData, null, 2)}`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an AI analytics expert. Analyze prompt data and provide detailed insights."
        },
        {
          role: "user",
          content: analysisPrompt
        }
      ],
      model: "gpt-4-0125-preview",
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "text" },
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error in analyzePromptPatterns:', error);
    throw new Error('Failed to analyze prompt patterns');
  }
}