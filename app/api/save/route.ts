import { ready } from '@/lib/db.ts';
import { sendResultEmail } from '@/lib/email.ts';
import { QUESTIONS, STAGES, NEXT_MOVES, score, type Answers } from '@/lib/snapshot.ts';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Saves a result by email. The answers are scored here and then discarded:
// only the stage bands, the load, and the Months of No range are stored.
export async function POST(req: Request) {
  let body: { email?: string; answers?: Answers; adult?: boolean; price?: number; notifyFull?: boolean };
  try { body = await req.json(); } catch { return Response.json({ ok: false, error: 'bad request' }, { status: 400 }); }
  const email = (body.email || '').trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 200) return Response.json({ ok: false, error: 'Enter a valid email address.' }, { status: 400 });
  if (body.adult !== true) return Response.json({ ok: false, error: 'You must be 18 or older.' }, { status: 400 });
  const answers = body.answers || {};
  for (const q of QUESTIONS) {
    const i = answers[q.id];
    if (!Number.isInteger(i) || i < 0 || i >= q.options.length) return Response.json({ ok: false, error: 'Incomplete snapshot.' }, { status: 400 });
  }
  const r = score(answers);
  const map: Record<string, string> = {};
  for (const [k, v] of Object.entries(r.map)) map[k] = v.state;
  const stageName = r.yourStage ? STAGES.find((s) => s.id === r.yourStage)!.name : 'All solid';
  const price = [29, 49, 79].includes(body.price as number) ? (body.price as number) : null;
  try {
    const q = await ready();
    if (!q) return Response.json({ ok: false, error: 'Saving is not available yet. Your result is still on this page.' }, { status: 503 });
    await q`insert into saves (email, stage, load, months_of_no, map, price_variant, notify_full)
      values (${email}, ${stageName}, ${r.load}, ${r.monthsOfNo.text}, ${JSON.stringify(map)}::jsonb, ${price}, ${body.notifyFull === true})
      on conflict (email) do update set ts = now(), stage = excluded.stage, load = excluded.load,
        months_of_no = excluded.months_of_no, map = excluded.map, price_variant = excluded.price_variant,
        notify_full = saves.notify_full or excluded.notify_full`;
    const lines = [
      ...STAGES.filter((s) => s.id !== 'formation').map((s) => s.n + ' ' + s.name + ': ' + map[s.id]),
      '',
      'Three next moves:',
      ...(r.yourStage ? NEXT_MOVES[r.yourStage] : NEXT_MOVES.freedom).map((m, i) => i + 1 + '. ' + m),
    ];
    let emailed = 'not attempted';
    try { emailed = await sendResultEmail(email, { stage: stageName, load: r.load, monthsOfNo: r.monthsOfNo.text, lines }); } catch { emailed = 'send failed'; }
    return Response.json({ ok: true, emailed: emailed === 'sent' });
  } catch {
    return Response.json({ ok: false, error: 'Could not save right now. Your result is still on this page.' }, { status: 500 });
  }
}
