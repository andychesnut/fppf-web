import { ready } from '@/lib/db.ts';

// Delete-my-data: removes the saved result for an email address.
// The response is the same whether or not a record existed.
export async function POST(req: Request) {
  let body: { email?: string };
  try { body = await req.json(); } catch { return Response.json({ ok: false }, { status: 400 }); }
  const email = (body.email || '').trim().toLowerCase();
  if (!email || email.length > 200) return Response.json({ ok: false }, { status: 400 });
  try {
    const q = await ready();
    if (q) await q`delete from saves where email = ${email}`;
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
