import { cookies } from 'next/headers';
import api from './api-client';

interface AuthResponse {
  access_token: string;
  token_type: string;
}

export async function authenticate(walletAddress: string): Promise<AuthResponse> {
  try {
    const response = await api
      .post('authenticate', {
        searchParams: {
          wallet_address: walletAddress,
        },
      })
      .json<AuthResponse>();

    // Store the token in an HTTP-only cookie
    const cookieStore = cookies();
    cookieStore.set('auth_token', response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token');
  return !!token;
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token');
  return token?.value || null;
}