import OpenAI from 'openai';
import LRU from 'lru-cache';

// simple in-memory rate-limiting: 60 requests per 15 minutes per IP
const rateCache = new LRU({ max: 10000, ttl: 15 * 60 * 1000 });
function tooMany(req) {
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ?? req.socket.remoteAddress;
  const hits = rateCache.get(ip) ?? 0;
  rateCache.set(ip, hits + 1);
  return hits >= 60;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  if (tooMany(req)) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  const bearer = req.headers.authorization?.replace('Bearer ', '');
  if (process.env.API_TOKEN && bearer !== process.env.API_TOKEN) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const {
    messages,
    model,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty,
    max_tokens
  } = req.body || {};

  const apiKey = req.body.apiKey;
  if (!apiKey) {
    return res.status(400).json({ error: 'Missing API key in request body' });
  }

  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.chat.completions.create({
      messages,
      model,
      temperature,
      top_p,
      frequency_penalty,
      presence_penalty,
      max_tokens
    });
    const reply = completion.choices[0].message;
    const usage =
      completion.usage || {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0
      };
    res.status(200).json({ message: reply, usage });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e?.message || 'Unknown server error' });
  }
}
