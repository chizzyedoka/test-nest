import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const labId = searchParams.get('labId');

    // Get aggregated data from the auxiliary database
    const analytics = await db.labUsageAnalytics.findFirst({
      where: {
        labId: labId || undefined,
        date: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
      select: {
        totalPrompts: true,
        totalTokensUsed: true,
        successRate: true,
        averageResponseTimeMs: true,
      },
    });

    // If no data exists, return defaults
    if (!analytics) {
      return NextResponse.json({
        totalPrompts: 0,
        totalTokensUsed: 0,
        successRate: 0,
        averageResponseTimeMs: 0,
      });
    }

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Analytics aggregation error:', error);
    return NextResponse.json(
      { error: 'Failed to aggregate analytics' },
      { status: 500 }
    );
  }
}