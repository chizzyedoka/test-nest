'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// Create a secure API client utility
const API_BASE_URL = process.env.NEXT_PUBLIC_API_PLATFORM_URL || 'http://3.255.186.112';

interface EnterLabResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function enterLab(labId: string): Promise<EnterLabResponse> {
  try {

    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) {
      return {
        success: false,
        error: 'Authentication required'
      };
    }
    const response = await fetch(
      `${API_BASE_URL}/api/v1/labs/labs/${labId}/enter/miner`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );



    if (!response.ok) {
      const errorData = await response.json();

      // Handle the specific case where user isn't registered as miner
      if (response.status === 403 && errorData.detail?.includes('not registered for this lab')) {
        return {
          success: false,
          error: 'You need to register as a miner for this lab first',
          data: {
            code: 'NOT_REGISTERED_AS_MINER',
            detail: errorData.detail
          }
        };
      }

      return {
        success: false,
        error: errorData.detail || `HTTP error! status: ${response.status}`
      };
    }
    revalidatePath(`/`);
    return await response.json();
  } catch (error) {
    console.error('Error entering lab:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

