import { ready } from '@/lib/db.ts';

const ALLOWED = new Set([
  'landing_view', 'snapshot_start', 'question_answered', 'snapshot_complete',
  'price_intent_view', 'price_intent_click', 'email_saved',
  'landing_edit', 'journey_view', 'journey_edit', 'journey_new_yes', 'journey_new_no', 'journey_trapped_yes', 'journey_trapped_no',
]);

// Anonymous funnel events. No answers are recorded, only progress.
export async function POST(req: Request) {
  let body: { name?: string; anonId?: string; props?: Record<string, unknown> };
  try { body = await req.json(); } catch { return Response.json({ ok: false }, { status: 400 }); }
  if (!body.name || !ALLOWED.has(body.name)) return Response.json({ ok: false }, { status: 400 });
  const props: Record<string, string | number> = {};
  for (const k of ['i', 'stage', 'load', 'price']) {
    const v = body.props?.[k];
    if (typeof v === 'string' || typeof v === 'number') props[k] = typeof v === 'string' ? v.slice(0, 40) : v;
  }
  try {
    const q = await ready();
    if (q) await q`insert into events (name, anon_id, props) values (${body.name}, ${(body.anonId || '').slice(0, 40)}, ${JSON.stringify(props)}::jsonb)`;
    return Response.json({ ok: true, stored: !!q });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
