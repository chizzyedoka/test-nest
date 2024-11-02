import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { isAuthenticated } from '@/lib/auth-service';

const API_URL = 'http://3.255.186.112/api/v1';

// Validation schema for URL parameters
const ParamsSchema = z.object({
  labId: z.string(),
  roleType: z.enum(['miner', 'validator'])
});

export async function POST(
  request: NextRequest,
  { params }: { params: { labId: string; roleType: string } }
) {
  try {
    // Validate URL parameters
    const validatedParams = ParamsSchema.parse(params);

    // Get auth token
    const authToken = cookies().get('auth_token')?.value;

    if (!authToken || !(await isAuthenticated())) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Rate limiting
    const ip = request.ip || 'unknown';
    const identifier = `register-lab-${ip}-${authToken}`;
    const { success: rateLimitSuccess } = await rateLimit(identifier);

    if (!rateLimitSuccess) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Make request to external API
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({}),
      redirect: "follow" as RequestRedirect
    };

    console.log('Making request:', {
      url: `${API_URL}/labs/labs/${validatedParams.labId}/${validatedParams.roleType}/register`,
      headers: Object.fromEntries(myHeaders.entries()),
      body: requestOptions.body
    });

    const response = await fetch(
      `${API_URL}/labs/labs/${validatedParams.labId}/${validatedParams.roleType}/register`,
      requestOptions
    );

    const result = await response.text();
    console.log('API Response:', result);

    // Try to parse the response as JSON
    try {
      const jsonResult = JSON.parse(result);
      return NextResponse.json(jsonResult, {
        status: response.status,
      });
    } catch {
      // If parsing fails, return the text response
      return new NextResponse(result, {
        status: response.status,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

  } catch (error) {
    console.error('Lab registration error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.errors },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}