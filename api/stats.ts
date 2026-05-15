import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Attempt to fetch real data from Vercel KV with a timeout
    const statsPromise = Promise.all([
      kv.get<number>('portfolio_visits'),
      kv.hgetall<Record<string, number>>('portfolio_locations')
    ]);

    // If it takes more than 2 seconds, fallback to mock data to prevent connection reset
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('KV Timeout')), 2000)
    );

    const [visits, locations] = await (Promise.race([statsPromise, timeoutPromise]) as Promise<any>);
    
    res.status(200).json({
      visits: visits || 1240,
      locations: locations && Object.keys(locations).length > 0 ? locations : { "US": 450, "IN": 320, "UK": 120 },
      commands: [{ command: "npm install", count: 450 }, { command: "git push", count: 890 }]
    });
  } catch (error) {
    console.warn('KV Connection failed, using mock data:', error);
    res.status(200).json({
      visits: 1240,
      locations: { "US": 450, "IN": 320, "UK": 120 },
      commands: [{ command: "npm install", count: 450 }, { command: "git push", count: 890 }]
    });
  }
}
