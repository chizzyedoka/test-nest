import { NextResponse } from 'next/server';
import { analyzePromptPatterns } from '@/lib/ai-analytics';
import { decodeJWT } from '@/app/actions/login';
import { isAddress } from 'ethers';

export async function GET(req: Request) {
  try {
    // Verify authentication
    const session = await decodeJWT();
    if (!session.wallet || !session.isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate wallet address
    if (!isAddress(session.wallet)) {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const labId = searchParams.get('labId');

    // Validate UUID format for lab ID
    if (labId && labId.length !== 36) {
      return NextResponse.json(
        { error: 'Invalid lab ID format' },
        { status: 400 }
      );
    }

    const analysis = await analyzePromptPatterns({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      labId: labId || undefined,
      userId: session.wallet,
    });

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('AI Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze data' },
      { status: 500 }
    );
  }
}