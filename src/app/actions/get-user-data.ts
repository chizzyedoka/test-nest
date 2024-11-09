'use server'

import { z } from 'zod'
import { headers } from 'next/headers'

const API_URL = process.env.API_URL || 'http://54.74.133.71'

// Validation schema
const UserDataRequestSchema = z.object({
  wallet_address: z.string().startsWith('0x')
})

interface UserDataResponse {
  user_data: {
    Point: number
    Incentive: number
    'Daily Attempt': number
    Broken: number
    Stake: number
    'Total Attempt': number
  }
}

export async function getUserData(walletAddress: string) {
  try {
    // Validate input
    const validated = UserDataRequestSchema.parse({
      wallet_address: walletAddress
    })

    // Get client headers
    const headersList = headers()
    const userAgent = headersList.get('user-agent')

    // Make API request
    const response = await fetch(`${API_URL}/user_data`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': userAgent || 'Next.js Server Action',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(validated),
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.statusText}`)
    }

    const data = await response.json() as UserDataResponse

    return {
      success: true,
      data: data.user_data
    }

  } catch (error) {
    console.error('User data fetch error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch user data'
    }
  }
}