'use server'

import api from '@/lib/api-client';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';
import { HTTPError } from 'ky';

// Response type definition
interface LabRequirements {
  labid: string;
  miner_requirements: {
    other_requirements: Record<string, unknown>;
    min_stake: number;
    requires_prompt: boolean;
  };
  validator_requirements: {
    other_requirements: Record<string, unknown>;
    min_stake: number;
    requires_prompt: boolean;
  };
}

// Input validation schema
const GetLabRequirementsSchema = z.object({
  labId: z.string().uuid()
});

export async function getLabRequirements(labId: string) {
  try {
    // 1. Validate input
    const { labId: validatedLabId } = GetLabRequirementsSchema.parse({ labId });

    // 2. Rate limiting
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token')?.value;
    const ip = headers().get('x-forwarded-for') || 'unknown';
    const identifier = `get-lab-requirements-${ip}-${validatedLabId}`;

    const { success: rateLimitSuccess } = await rateLimit(identifier);
    if (!rateLimitSuccess) {
      throw new Error('Too many requests. Please try again later.');
    }

    // 3. Make the request using api-client
    const response = await api
      .get(`labs/labs/${validatedLabId}/requirements`, {
        headers: {
          Accept: 'application/json',
          ...(authToken && { Authorization: `Bearer ${authToken}` })
        }
      })
      .json<LabRequirements>();

    return {
      success: true as const,
      data: response
    };

  } catch (error) {
    console.error('Failed to fetch lab requirements:', {
      error,
      labId,
      timestamp: new Date().toISOString()
    });

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return {
        success: false as const,
        error: 'Invalid lab ID format',
        validationErrors: error.errors
      };
    }

    // Handle HTTP errors from ky
    if (error instanceof HTTPError) {
      return {
        success: false as const,
        error: error.message
      };
    }

    // Handle other errors
    return {
      success: false as const,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}