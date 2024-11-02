'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { cache } from 'react'

const API_URL = process.env.API_URL || 'http://54.74.133.71'

// Validation schema
const ChatRequestSchema = z.object({
  wallet_address: z.string().startsWith('0x'),
  prompt: z.string().min(1)
})

interface ChatResponse {
  response: string
  order: string | null
}

export async function sendChatMessage(walletAddress: string, prompt: string) {
  try {
    // Validate input
    const validated = ChatRequestSchema.parse({
      wallet_address: walletAddress,
      prompt
    })

    // Get client headers
    const headersList = headers()
    const userAgent = headersList.get('user-agent')

    // Make API request with no-cache settings
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent || 'Next.js Server Action',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      body: JSON.stringify(validated),
      cache: 'no-store',
      next: { revalidate: 0 }
    })

    if (!response.ok) {
      throw new Error(`Chat request failed: ${response.statusText}`)
    }

    const data = await response.json() as ChatResponse[]

    // Filter out null responses and return the first valid response
    const validResponse = data.filter(Boolean)[0]

    return {
      success: true,
      data: validResponse
    }

  } catch (error) {
    console.error('Chat error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Chat request failed'
    }
  }
}