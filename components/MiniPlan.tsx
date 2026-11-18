'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { track } from '@/lib/client.ts';

// The home page shows the product working. Three numbers in, one answer out.
// Everything stays in the browser. The numbers pass to the full planner through session storage, never a URL.
const FIELDS = [
  { key: 'costDip', label: 'Monthly spending' },
  { key: 'incomeDip', label: 'Monthly income while you try' },
  { key: 'boundary', label: 'The most savings you would use' },
] as const;
type Key = (typeof FIELDS)[number]['key'];
export const PLAN_KEY = 'fp_plan';

const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

export function MiniPlan() {
  const [raw, setRaw] = useState<Record<Key, string>>({ costDip: '5000', incomeDip: '2000', boundary: '27000' });
  const edited = useRef(false);
  const n = { costDip: Number(raw.costDip), incomeDip: Number(raw.incomeDip), boundary: Number(raw.boundary) };
  const valid = FIELDS.every((f) => raw[f.key].trim() !== '' && Number.isFinite(n[f.key]) && n[f.key] >= 0);
  const burn = Math.max(0, n.costDip - n.incomeDip);
  const months = burn > 0 ? Math.floor(n.boundary / burn) : null;

  const change = (key: Key, value: string) => {
    if (!edited.current) { edited.current = true; track('landing_edit'); }
    setRaw({ ...raw, [key]: value });
  };
  const carry = () => { try { window.sessionStorage.setItem(PLAN_KEY, JSON.stringify(raw)); } catch { /* the planner still opens with its example */ } };

  return (
    <div className="card hero-card mini">
      <div className="mon" aria-live="polite">
        {!valid ? <p>Put a number in each box.</p> : months === null ? (
          <><span className="num">No limit</span><p>You would earn what you spend, so your savings stay whole.</p></>
        ) : (
          <><span className="num">{months} {months === 1 ? 'month' : 'months'}</span>
            <p>{money(burn)} a month from savings, stopping at {money(n.boundary)}.</p></>
        )}
      </div>
      {FIELDS.map((f) => (
        <div className="field" key={f.key}>
          <label htmlFor={'m-' + f.key}>{f.label}</label>
          <input id={'m-' + f.key} type="number" inputMode="numeric" min={0} value={raw[f.key]} onChange={(e) => change(f.key, e.target.value)} />
        </div>
      ))}
      <Link href="/journey" className="btn" onClick={carry}>See the whole plan</Link>
      <p className="muted small">Your numbers stay in your browser. Not sure where you stand? <Link href="/snapshot">Take the 6-minute snapshot</Link>.</p>
    </div>
  );
}
