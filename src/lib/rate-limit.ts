import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export async function rateLimit(identifier: string) {
  const timeout = 60; // 1 minute
  const limit = 5; // 5 requests per minute

  try {
    const requests = await redis.incr(identifier);
    await redis.expire(identifier, timeout);

    if (requests > limit) {
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error('Rate limit error:', error);
    return { success: true }; // Fail open if rate limiting fails
  }
}