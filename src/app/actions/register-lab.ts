'use server'

import { cookies } from 'next/headers';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';
import { isAuthenticated } from '@/lib/auth-service';

const API_URL = 'http://3.255.186.112/api/v1';

const RegisterLabSchema = z.object({
  labId: z.string(),
  roleType: z.enum(['miner', 'validator'])
});

export type RegisterLabRequest = z.infer<typeof RegisterLabSchema>;

export async function registerForLab(params: RegisterLabRequest) {
  try {
    const validatedInput = RegisterLabSchema.parse(params);
    const authToken = cookies().get('auth_token')?.value;

    if (!authToken || !(await isAuthenticated())) {
      throw new Error('Authentication required');
    }

    // Rate limiting
    const ip = headers().get('x-forwarded-for') || 'unknown';
    const identifier = `register-lab-${ip}-${authToken}`;
    const { success: rateLimitSuccess } = await rateLimit(identifier);

    if (!rateLimitSuccess) {
      throw new Error('Too many requests. Please try again later.');
    }

    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(
      `${API_URL}/labs/labs/${validatedInput.labId}/${validatedInput.roleType}/register`,
      {
        method: "POST",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const result = await response.text();
    console.log(result);

    return {
      success: true,
      data: result
    };

  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}
