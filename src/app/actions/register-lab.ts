'use server'

import { cookies } from 'next/headers';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';
import { isAuthenticated } from '@/lib/auth-service';

const API_URL = process.env.API_PLATFORM_URL

const RegisterLabSchema = z.object({
  labId: z.string(),
  roleType: z.enum(['miner', 'validator'])
});

export type RegisterLabRequest = z.infer<typeof RegisterLabSchema>;

interface RegisterLabResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function registerForLab(params: RegisterLabRequest): Promise<RegisterLabResponse> {
  try {
    const validatedInput = RegisterLabSchema.parse(params);
    const authToken = cookies().get('auth_token')?.value;

    if (!authToken || !(await isAuthenticated())) {
      return {
        success: false,
        error: 'Authentication required'
      };
    }

    // Rate limiting
    const ip = headers().get('x-forwarded-for') || 'unknown';
    const identifier = `register-lab-${ip}-${authToken}`;
    const { success: rateLimitSuccess } = await rateLimit(identifier);

    if (!rateLimitSuccess) {
      return {
        success: false,
        error: 'Too many requests. Please try again later.'
      };
    }

    const response = await fetch(
      `${API_URL}/api/v1/labs/labs/${validatedInput.labId}/${validatedInput.roleType}/register`,
      {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
        // Add the request body with callback URL
        body: JSON.stringify({
          callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/lab-callback` // Make sure to set this env variable
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log('=============registerLab Error=======================');
      console.log('Status:', response.status);
      console.log('Error Data:', data);
      console.log('Request URL:', `${API_URL}/labs/labs/${validatedInput.labId}/${validatedInput.roleType}/register`);
      console.log('====================================================');

      return {
        success: false,
        error: data.detail || data.message || `Registration failed with status: ${response.status}`
      };
    }

    return {
      success: true,
      data
    };

  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Invalid input parameters'
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}
