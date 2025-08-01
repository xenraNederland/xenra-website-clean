import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.json({ 
    status: 'healthy', 
    platform: 'vercel',
    timestamp: new Date().toISOString() 
  });
}