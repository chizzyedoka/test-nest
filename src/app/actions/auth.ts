'use server';

import { authenticate, isAuthenticated } from '@/lib/auth-service';
import { revalidatePath } from 'next/cache';

export async function authenticateUser(walletAddress: string) {
  try {
    const response = await authenticate(walletAddress);
    revalidatePath('/labs'); // Revalidate the labs page
    return { success: true, data: response };
  } catch (error) {
    console.error('Authentication action error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    };
  }
}

export async function checkAuth() {
  try {
    const isAuthed = await isAuthenticated();
    return { success: true, isAuthenticated: isAuthed };
  } catch (error) {
    console.error('Auth check error:', error);
    return { success: false, isAuthenticated: false };
  }
}