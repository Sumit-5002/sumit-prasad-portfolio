import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      // Set a 2-second timeout to prevent connection resets if KV is slow/disconnected
      const trackPromise = Promise.all([
        kv.incr('portfolio_visits'),
        kv.hincrby('portfolio_locations', (req.headers['x-vercel-ip-country'] as string) || 'Unknown', 1)
      ]);

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('KV Timeout')), 2000)
      );

      await Promise.race([trackPromise, timeoutPromise]);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.warn('Visit tracking failed (likely KV not linked yet):', error);
      return res.status(200).json({ success: true, note: "Mock update" });
    }
  }
  res.status(405).json({ error: "Method not allowed" });
}
