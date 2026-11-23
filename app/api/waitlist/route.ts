import { ready } from '@/lib/db.ts';
import { OFFER_PRICE, checkWaitlist } from '@/lib/waitlist.ts';

// Joins the waitlist. Stores the email and the price shown. Nothing is charged.
export async function POST(req: Request) {
  let body: { email?: unknown; adult?: unknown };
  try { body = await req.json(); } catch { return Response.json({ ok: false, error: 'bad request' }, { status: 400 }); }
  const c = checkWaitlist(body);
  if (!c.ok) return Response.json({ ok: false, error: c.error }, { status: 400 });
  try {
    const q = await ready();
    if (!q) return Response.json({ ok: false, error: 'The waitlist is not available right now. Please try again later.' }, { status: 503 });
    await q`insert into waitlist (email, price) values (${c.email}, ${OFFER_PRICE}) on conflict (email) do nothing`;
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: 'Could not save right now. Please try again.' }, { status: 500 });
  }
}
