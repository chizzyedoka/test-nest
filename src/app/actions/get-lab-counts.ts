import { z } from 'zod';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const labCountsSchema = z.object({
  success: z.boolean(),
  data: z.object({
    total_users: z.number(),
    active_users: z.number(),
  }),
});

type LabCountsResponse = z.infer<typeof labCountsSchema>;

export async function getLabCounts(labId: string) {
  try {
    // Get auth token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return {
        success: false,
        error: 'Unauthorized: No token found',
      };
    }

    const response = await fetch(
      `${process.env.API_PLATFORM_URL}/api/v1/labs/${labId}/user_counts`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        // Enable cache revalidation
        next: {
          revalidate: 60, // Revalidate every minute
          tags: [`lab-counts-${labId}`],
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();
    const validatedData = labCountsSchema.parse(rawData);

    // Revalidate the path where this data is used
    revalidatePath('/labs/[labId]');

    return {
      success: true,
      data: validatedData.data,
    };

  } catch (error) {
    console.error('Error fetching lab counts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch lab counts',
    };
  }
}