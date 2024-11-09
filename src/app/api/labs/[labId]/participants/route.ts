import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Disable caching
export const revalidate = 0; // Disable caching

export async function GET(
  request: NextRequest,
  { params }: { params: { labId: string } }
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PLATFORM_URL}/api/v1/labs/labs/${params.labId}/user_counts`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store', // Disable caching
      }
    );

    if (!response.ok) {
      return NextResponse.json({ participants: 0 }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({
      participants: data
    });

  } catch (error) {
    console.error(`Failed to fetch participants for lab ${params.labId}:`, error);
    return NextResponse.json(
      { participants: 0, error: 'Failed to fetch participants' },
      { status: 500 }
    );
  }
}