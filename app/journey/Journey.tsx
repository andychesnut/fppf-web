'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Mark } from '@/components/Mark.tsx';
import { Track } from '@/components/Track.tsx';
import { track } from '@/lib/client.ts';
import { DISCLAIMER } from '@/lib/site.ts';
import { journey, type JourneyInput } from '@/lib/journey.ts';

// Everything is calculated in the browser. Nothing typed here is sent or stored.
// Analytics events carry a name only: never a number or the sentence.
const FIELDS: { key: keyof JourneyInput; label: string; group: 'now' | 'dip' | 'after' }[] = [
  { key: 'incomeNow', label: 'Monthly take-home pay today', group: 'now' },
  { key: 'costNow', label: 'Monthly spending today', group: 'now' },
  { key: 'cash', label: 'Cash you could reach within a week', group: 'now' },
  { key: 'months', label: 'How many months you expect the change to take', group: 'dip' },
  { key: 'incomeDip', label: 'Monthly income during the change', group: 'dip' },
  { key: 'costDip', label: 'Monthly spending during the change', group: 'dip' },
  { key: 'boundary', label: 'The most cash you are willing to spend on it', group: 'dip' },
  { key: 'incomeAfter', label: 'Monthly income you are aiming for afterward', group: 'after' },
  { key: 'costAfter', label: 'Monthly cost of the life you want', group: 'after' },
];
const GROUPS = [
  { id: 'now', title: 'Where you are' },
  { id: 'dip', title: 'The change, and your boundary' },
  { id: 'after', title: 'Where you want to be' },
] as const;
const START: Record<keyof JourneyInput, string> = { incomeNow: '7000', costNow: '6000', cash: '40000', months: '6', incomeDip: '2000', costDip: '5000', boundary: '27000', incomeAfter: '6000', costAfter: '5000' };

const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

export function Journey() {
  const [raw, setRaw] = useState(START);
  const [want, setWant] = useState('');
  const [fb, setFb] = useState<{ fresh?: boolean; trapped?: boolean }>({});
  const edited = useRef(false);
  // Pick up the three numbers typed on the home page. They live in this browser tab only.
  useEffect(() => {
    try {
      const saved = JSON.parse(window.sessionStorage.getItem('fp_plan') || 'null');
      if (saved && typeof saved === 'object') setRaw((r) => ({ ...r, ...Object.fromEntries(['costDip', 'incomeDip', 'boundary'].filter((k) => typeof saved[k] === 'string' && saved[k].length < 12).map((k) => [k, saved[k]])) }));
    } catch { /* keep the example numbers */ }
  }, []);
  const change = (key: keyof JourneyInput, value: string) => {
    if (!edited.current) { edited.current = true; track('journey_edit'); }
    setRaw({ ...raw, [key]: value });
  };
  const j = useMemo(() => {
    const input = {} as JourneyInput;
    for (const f of FIELDS) {
      const v = Number(raw[f.key]);
      if (raw[f.key].trim() === '' || !Number.isFinite(v) || v < 0) return null;
      input[f.key] = v;
    }
    return { input, out: journey(input) };
  }, [raw]);

  return (
    <main className="narrow result">
      <Track name="journey_view" />
      <Link href="/" className="brand"><Mark size={24} /><span>Plan a way out</span></Link>
      <div className="q">
        <span className="eyebrow">Free. No login. Nothing stored.</span>
        <h1>See what the change would cost you, and where you would stop.</h1>
        <p>Fill in what you want and what you have. You will see how it goes if things move quickly, as expected, or slowly, and when to check whether it is working.</p>
        <p className="muted small">The numbers below are an example until you change them. Nothing you type leaves this page.</p>
      </div>

      <div className="card">
        <h2>What you want</h2>
        <div className="field">
          <label htmlFor="want">In one sentence, what would you change?</label>
          <input id="want" type="text" maxLength={140} placeholder="Leave my job and work for myself" value={want} onChange={(e) => setWant(e.target.value)} />
        </div>
      </div>

      {GROUPS.map((g) => (
        <div className="card" key={g.id}>
          <h2>{g.title}</h2>
          {FIELDS.filter((f) => f.group === g.id).map((f) => (
            <div className="field" key={f.key}>
              <label htmlFor={f.key}>{f.label}</label>
              <input id={f.key} type="number" inputMode="numeric" min={0} value={raw[f.key]} onChange={(e) => change(f.key, e.target.value)} />
            </div>
          ))}
        </div>
      ))}

      {!j ? <p className="notice" role="status">Fill in every box with a number of zero or more to see your plan.</p> : (
        <>
          <div className="mon">
            <span className="label">{want.trim() || 'Your plan'}</span>
            <span className="num">{j.out.burn === 0 ? 'No cash used' : j.out.boundaryMonths + (j.out.boundaryMonths === 1 ? ' month' : ' months')}</span>
            <p>{j.out.burn === 0
              ? 'Your income during the change covers your spending, so the plan does not draw on your cash.'
              : 'How long your boundary of ' + money(j.input.boundary) + ' lasts. The change uses about ' + money(j.out.burn) + ' of cash a month: ' + money(j.input.costDip) + ' spending minus ' + money(j.input.incomeDip) + ' income.'}</p>
          </div>

          <div className="q">
            <h2>Three ways it could go</h2>
            <p className="muted small">Hypothetical scenarios from your own numbers: the time you expect, two thirds of it, and one and a half times it. Not a prediction.</p>
            <ul className="list">
              {j.out.scenarios.map((s) => (
                <li key={s.name}>
                  <strong>{s.name}: {s.months} {s.months === 1 ? 'month' : 'months'}, {money(s.cost)}.</strong>{' '}
                  {s.cost === 0 ? 'No cash used.' : s.withinBoundary ? 'Uses ' + s.boundaryUsedPct + '% of your boundary.' : 'Goes past your boundary by ' + money(s.cost - j.input.boundary) + '.'}
                </li>
              ))}
            </ul>
          </div>

          <div className="q">
            <h2>Checkpoints</h2>
            <ol className="list">
              <li><strong>Before you start.</strong> {j.out.prepMonths === 0 ? 'You already hold the cash for your boundary and the slow case.' : j.out.prepMonths === null ? 'You do not yet hold the cash for this plan, and today there is no monthly surplus to build it from. That is the first thing to change.' : 'About ' + j.out.prepMonths + (j.out.prepMonths === 1 ? ' month' : ' months') + ' of saving at today\'s surplus of ' + money(j.out.surplusNow) + ' a month would cover it.'}</li>
              <li><strong>Halfway through your boundary.</strong> {j.out.burn === 0 ? 'Not applicable: no cash is used.' : 'When ' + money(j.input.boundary / 2) + ' is spent, compare your income with what you expected by then.'}</li>
              <li><strong>At your boundary.</strong> {j.out.burn === 0 ? 'Not applicable: no cash is used.' : 'When ' + money(j.input.boundary) + ' is spent, the bet is over. Decide now what you will do at that point, while it is easy to decide.'}</li>
              <li><strong>Arrived.</strong> Income reaches {money(j.input.incomeAfter)} a month against {money(j.input.costAfter)} of costs.</li>
            </ol>
          </div>

          <div className="q">
            <h2>How the plan sits against sound principles</h2>
            <ul className="list">
              {j.out.checks.map((c) => <li key={c.id}><strong>{c.ok ? 'Holds. ' : 'Look at this. '}</strong>{c.text}</li>)}
            </ul>
          </div>
        </>
      )}

      <div className="card">
        <h2>Two quick questions</h2>
        <p className="muted small">Your taps are counted anonymously. They tell us whether this is worth building further.</p>
        <Ask q="Did this show you something you did not already know?" value={fb.fresh} onPick={(v) => { track(v ? 'journey_new_yes' : 'journey_new_no'); setFb({ ...fb, fresh: v }); }} />
        <Ask q="Do you feel trapped between how you spend your time and money and how you want to?" value={fb.trapped} onPick={(v) => { track(v ? 'journey_trapped_yes' : 'journey_trapped_no'); setFb({ ...fb, trapped: v }); }} />
      </div>

      <div className="card">
        <h2>Not sure where you stand?</h2>
        <p>The snapshot is 24 questions in ranges. It shows which part of your finances is holding you in place.</p>
        <Link href="/snapshot" className="btn btn-ghost">Take the 6-minute snapshot</Link>
      </div>

      <p className="muted small">This is a calculator that runs on your own assumptions. It does not know your full situation and does not tell you what to do. {DISCLAIMER}</p>
    </main>
  );
}

function Ask({ q, value, onPick }: { q: string; value: boolean | undefined; onPick: (v: boolean) => void }) {
  return (
    <div className="field">
      <span style={{ fontWeight: 600 }}>{q}</span>
      {value === undefined
        ? <div className="cta-row"><button type="button" className="btn btn-ghost btn-small" onClick={() => onPick(true)}>Yes</button><button type="button" className="btn btn-ghost btn-small" onClick={() => onPick(false)}>No</button></div>
        : <p className="notice" role="status">Counted: {value ? 'yes' : 'no'}. Thank you.</p>}
    </div>
  );
}
