import { ready } from '@/lib/db.ts';

export const dynamic = 'force-dynamic';

// Aggregate numbers only. No emails and no individual rows ever leave this endpoint.
export async function GET(req: Request) {
  const token = process.env.METRICS_TOKEN;
  if (!token || req.headers.get('authorization') !== 'Bearer ' + token) return Response.json({ ok: false }, { status: 401 });
  try {
    const q = await ready();
    if (!q) return Response.json({ ok: true, generated_at: new Date().toISOString(), db: false });
    const events = await q`select name,
        count(*)::int as all_time,
        count(*) filter (where ts > now() - interval '7 days')::int as last_7d,
        count(*) filter (where ts > now() - interval '24 hours')::int as last_24h,
        count(distinct anon_id)::int as visitors_all_time
      from events group by name order by name`;
    const dropoff = await q`select (props->>'i')::int as question, count(distinct anon_id)::int as visitors
      from events where name = 'question_answered' and props ? 'i' group by 1 order by 1`;
    const price = await q`select (props->>'price')::int as price,
        count(distinct anon_id) filter (where name = 'price_intent_view')::int as viewed,
        count(distinct anon_id) filter (where name = 'price_intent_click')::int as clicked
      from events where name in ('price_intent_view', 'price_intent_click') and props ? 'price' group by 1 order by 1`;
    const stages = await q`select props->>'stage' as stage, count(*)::int as completions
      from events where name = 'snapshot_complete' group by 1 order by 2 desc`;
    const saves = await q`select count(*)::int as total, count(*) filter (where notify_full)::int as notify_full,
        count(*) filter (where ts > now() - interval '7 days')::int as last_7d from saves`;
    return Response.json({ ok: true, generated_at: new Date().toISOString(), db: true, events, dropoff, price, stages, saves: saves[0] });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
