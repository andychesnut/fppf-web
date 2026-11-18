import { ready } from '@/lib/db.ts';

export const dynamic = 'force-dynamic';

export async function GET() {
  let db = false;
  try { const q = await ready(); if (q) { await q`select 1`; db = true; } } catch { db = false; }
  return Response.json({
    ok: true,
    db,
    email: !!(process.env.POSTMARK_SERVER_TOKEN && process.env.EMAIL_FROM && process.env.LEGAL_POSTAL_ADDRESS),
    checkout: process.env.PAID_CHECKOUT_ENABLED === 'true',
  });
}
