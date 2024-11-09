'use server'

import { headers } from 'next/headers'

const API_URL = process.env.API_URL || 'http://54.74.133.71'

interface EndChatResponse {
  message: string
}

export async function endChat() {
  try {
    // Get client headers
    const headersList = headers()
    const userAgent = headersList.get('user-agent')

    // Make API request
    const response = await fetch(`${API_URL}/end_chat`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'User-Agent': userAgent || 'Next.js Server Action',
        'Cache-Control': 'no-cache'
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`Failed to end chat: ${response.statusText}`)
    }

    const data = await response.json() as EndChatResponse

    return {
      success: true,
      data
    }

  } catch (error) {
    console.error('End chat error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to end chat'
    }
  }
}