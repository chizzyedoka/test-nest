'use server'

import { z } from 'zod'
import { headers } from 'next/headers'

const API_URL = process.env.API_URL || 'http://54.74.133.71'

// Validation schema
const RegisterUserSchema = z.object({
  wallet_address: z.string().startsWith('0x'),
  stake: z.number().min(0)
})

interface RegisterUserResponse {
  uid: number
  wallet_address: string
  ip_address: string
  stake: number
  incentive: number
  dividend: number
  created: string
  updated: string
  active: boolean
  dailyM: number
  daily$: number
  systemprompt_id: string
  broken: number
  dailyattempt: number
  totalattempt: number
  last_daily_reset: string
  point: number
  validator: string | null
}

export async function registerUser(walletAddress: string, stake: number = 0) {
  try {
    // Validate input
    const validated = RegisterUserSchema.parse({
      wallet_address: walletAddress,
      stake
    })

    // Get client IP
    const headersList = headers()
    const userAgent = headersList.get('user-agent')

    // Make API request
    const response = await fetch(`${API_URL}/register_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent || 'Next.js Server Action'
      },
      cache: 'no-store',
      body: JSON.stringify(validated)
    })

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`)
    }

    const data = (await response.json()) as RegisterUserResponse

    return {
      success: true,
      data
    }

  } catch (error) {
    console.error('Registration error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed'
    }
  }
}