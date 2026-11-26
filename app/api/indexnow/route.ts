import { indexNowPayload } from '@/lib/indexnow.ts';
import { siteUrl } from '@/lib/site.ts';

export const dynamic = 'force-dynamic';

let last = 0;

// Tells Bing and other IndexNow engines which URLs exist. Public URLs only.
// Runs weekly from a Vercel cron; throttled to once an hour.
export async function GET() {
  if (Date.now() - last < 3600_000) return Response.json({ ok: true, skipped: 'throttled' });
  last = Date.now();
  try {
    const r = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(indexNowPayload(siteUrl())),
    });
    return Response.json({ ok: r.ok, status: r.status });
  } catch {
    return Response.json({ ok: false, status: 0 });
  }
}
