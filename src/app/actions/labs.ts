'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';
import api from '@/lib/api-client';

// Define the response type schema
const LabSchema = z.object({
  labid: z.string().uuid(),
  labname: z.string()
});

const ActiveLabsResponseSchema = z.array(LabSchema);

type ActiveLab = z.infer<typeof LabSchema>;

export async function getActiveLabs() {
  try {
    // Check for auth token
    const authToken = cookies().get('auth_token');
    if (!authToken?.value) {
      return {
        success: false,
        error: 'Authentication required'
      };
    }

    // Fetch active labs using the shared API client
    const response = await api
      .get('labs/labs/active', {
        headers: {
          Authorization: `Bearer ${authToken.value}`
        }
      })
      .json();

    // Validate response data
    const validatedData = ActiveLabsResponseSchema.safeParse(response);

    if (!validatedData.success) {
      console.error('Data validation error:', validatedData.error);
      return {
        success: false,
        error: 'Invalid data received from server'
      };
    }

    return {
      success: true,
      data: validatedData.data
    };

  } catch (error) {
    console.error('Failed to fetch active labs:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch active labs'
    };
  }
}