const hits = new Map<string, number[]>();

/** Basic in-memory limiter (per server instance). Use Redis/Upstash for strict global limits. */
export function rateLimit(key: string, limit: number, windowMs = 60_000): boolean {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (list.length >= limit) {
    hits.set(key, list);
    return false;
  }
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) {
    hits.forEach((v, k) => {
      if (!v.some((t) => now - t < windowMs)) hits.delete(k);
    });
  }
  return true;
}
