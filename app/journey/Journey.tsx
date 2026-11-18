'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Mark } from '@/components/Mark.tsx';
import { Track } from '@/components/Track.tsx';
import { track } from '@/lib/client.ts';
import { DISCLAIMER } from '@/lib/site.ts';
import { journey, type JourneyInput } from '@/lib/journey.ts';
import { clearPlan, loadPlan, savePlan } from '@/lib/plan-store.ts';

// One question at a time, then the plan. Everything is worked out in the browser and saved only there.
// Analytics events carry a step number at most: never a figure and never the sentence.
type Key = 'costAfter' | 'incomeNow' | 'costNow' | 'incomeDip' | 'incomeAfter' | 'cash' | 'boundary' | 'months';
type Step = { title: string; help: string; fields: { key: Key; label: string; unit?: 'months' }[] };
const STEPS: Step[] = [
  { title: 'What would that life cost you each month?', help: 'Housing, food, insurance, everything. If you are not sure, start with what you spend now.',
    fields: [{ key: 'costAfter', label: 'Monthly cost of the life you want' }] },
  { title: 'What comes in and goes out each month today?', help: 'Round numbers are fine.',
    fields: [{ key: 'incomeNow', label: 'Take-home pay' }, { key: 'costNow', label: 'Spending' }] },
  { title: 'What could you earn each month while you make the change?', help: 'From anything: part-time work, a partner’s income, first customers. Zero is a fine answer.',
    fields: [{ key: 'incomeDip', label: 'Monthly income while you get there' }] },
  { title: 'And once it is working?', help: 'The monthly income you are aiming for. It can be less than you earn now.',
    fields: [{ key: 'incomeAfter', label: 'Monthly income you are aiming for' }] },
  { title: 'How much could you put behind it?', help: 'The second number is your limit. If you reach it, you stop.',
    fields: [{ key: 'cash', label: 'Cash you could get to within a week' }, { key: 'boundary', label: 'The most of it you would be willing to use' }] },
  { title: 'How long do you think it would take?', help: 'Your honest guess. You will also see what happens if it takes half as long again.',
    fields: [{ key: 'months', label: 'Months', unit: 'months' }] },
];
const digits = (s: string) => s.replace(/[^0-9]/g, '').slice(0, 9);
const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
const plural = (n: number, w: string) => n + ' ' + w + (n === 1 ? '' : 's');

export function Journey() {
  const [ready, setReady] = useState(false);
  const [want, setWant] = useState('');
  const [raw, setRaw] = useState<Record<string, string>>({});
  const [step, setStep] = useState(-1); // -1 = the sentence, 0..5 = questions, 6 = the plan
  const [fb, setFb] = useState<{ fresh?: boolean; trapped?: boolean }>({});
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const p = loadPlan();
    if (p) { setWant(p.want); setRaw(p.raw); setStep(p.done ? STEPS.length : p.want ? 0 : -1); }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) headingRef.current?.focus(); }, [step, ready]);

  const input = useMemo(() => {
    const n = (k: Key) => Number(raw[k]);
    if (STEPS.some((s) => s.fields.some((f) => !raw[f.key]))) return null;
    const i: JourneyInput = { incomeNow: n('incomeNow'), costNow: n('costNow'), cash: n('cash'), costDip: n('costAfter'), incomeDip: n('incomeDip'), months: Math.max(1, n('months')), boundary: n('boundary'), incomeAfter: n('incomeAfter'), costAfter: n('costAfter') };
    return i;
  }, [raw]);

  if (!ready) return <main className="narrow flow" />;

  const shell = (children: React.ReactNode) => (
    <main className="narrow flow">
      <Track name="journey_view" />
      <Link href="/" className="brand"><Mark size={24} /><span>Your plan</span></Link>
      {children}
    </main>
  );

  if (step === -1) {
    return shell(
      <form className="q" onSubmit={(e) => { e.preventDefault(); savePlan({ want: want.trim(), raw, done: false }); setStep(0); }}>
        <h1 ref={headingRef} tabIndex={-1}>What would you be doing if money weren&apos;t holding you in place?</h1>
        <div className="field">
          <label htmlFor="want">Say it in a sentence</label>
          <input id="want" type="text" maxLength={140} required value={want} onChange={(e) => setWant(e.target.value)} />
        </div>
        <div className="nav"><button type="submit" className="btn">Next</button></div>
      </form>,
    );
  }

  if (step < STEPS.length) {
    const s = STEPS[step];
    const filled = s.fields.every((f) => raw[f.key] !== undefined && raw[f.key] !== '');
    const next = (e: React.FormEvent) => {
      e.preventDefault();
      const done = step === STEPS.length - 1;
      track(done ? 'journey_complete' : 'journey_step', { i: step + 1 });
      savePlan({ want, raw, done });
      setStep(step + 1);
    };
    return shell(
      <form className="q" onSubmit={next}>
        <span className="eyebrow">{want}</span>
        <h1 ref={headingRef} tabIndex={-1}>{s.title}</h1>
        <p>{s.help}</p>
        {s.fields.map((f, n) => (
          <div className="field" key={f.key}>
            <label htmlFor={f.key}>{f.label}</label>
            <div className="money">
              {f.unit ? null : <span aria-hidden="true">$</span>}
              <input id={f.key} type="text" inputMode="numeric" autoComplete="off" autoFocus={n === 0} value={raw[f.key] ? Number(raw[f.key]).toLocaleString('en-US') : raw[f.key] ?? ''}
                onChange={(e) => setRaw({ ...raw, [f.key]: digits(e.target.value) })} />
            </div>
          </div>
        ))}
        <div className="nav">
          <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>Back</button>
          <button type="submit" className="btn" disabled={!filled}>{step === STEPS.length - 1 ? 'Show my plan' : 'Next'}</button>
        </div>
        <p className="muted small">Question {step + 1} of {STEPS.length}. Your answers stay in this browser.</p>
      </form>,
    );
  }

  if (!input) { return shell(<div className="q"><h1 ref={headingRef} tabIndex={-1}>A few answers are missing.</h1><div className="nav"><button type="button" className="btn" onClick={() => setStep(0)}>Go through the questions</button></div></div>); }

  const j = journey(input);
  const [fast, expected, slow] = j.scenarios;
  const worries = j.checks.filter((c) => !c.ok);
  const diff = input.costAfter - input.costNow;
  return (
    <main className="narrow result">
      <Link href="/" className="brand"><Mark size={24} /><span>Your plan</span></Link>
      <div className="q">
        <span className="eyebrow">What you want</span>
        <h1 ref={headingRef} tabIndex={-1}>{want}</h1>
        <p>{diff === 0 ? 'That life costs about what you spend today.' : 'That life costs ' + money(Math.abs(diff)) + ' a month ' + (diff < 0 ? 'less' : 'more') + ' than the one you have now.'}{' '}
          {j.afterSurplus >= 0 ? 'At the income you are aiming for, it pays for itself' + (j.afterSurplus > 0 ? ' with ' + money(j.afterSurplus) + ' a month to spare.' : '.') : 'At the income you are aiming for, it runs ' + money(-j.afterSurplus) + ' a month short.'}</p>
      </div>

      <div className="mon">
        <span className="label">How long you could give it</span>
        <span className="num">{j.burn === 0 ? 'As long as it takes' : plural(j.boundaryMonths!, 'month')}</span>
        <p>{j.burn === 0
          ? 'You would earn what you spend while you get there, so your savings stay whole.'
          : 'You would draw ' + money(j.burn) + ' a month from savings (' + money(input.costAfter) + ' of costs, ' + money(input.incomeDip) + ' of income) and stop at ' + money(input.boundary) + '.'}</p>
      </div>

      {j.burn > 0 ? (
        <div className="q">
          <h2>Three ways it could go</h2>
          <ul className="list">
            {([['If it goes quickly', fast], ['If it goes the way you expect', expected], ['If it goes slowly', slow]] as const).map(([label, s]) => (
              <li key={s.name}><strong>{label}:</strong> {plural(s.months, 'month')} and {money(s.cost)}. {s.withinBoundary ? 'That is ' + s.boundaryUsedPct + '% of your limit.' : 'That is ' + money(s.cost - input.boundary) + ' past your limit.'}</li>
            ))}
          </ul>
          <p className="muted small">These come from your own guess of {plural(input.months, 'month')}: two thirds of it, all of it, and half as long again. They are scenarios, not predictions.</p>
        </div>
      ) : null}

      <div className="q">
        <h2>When to look up</h2>
        <ol className="list">
          <li><strong>Before you start.</strong> {j.prepMonths === 0 ? 'You already have the cash this plan needs.' : j.prepMonths === null ? 'You do not have the cash this plan needs yet, and nothing is left over each month to build it. That is the first thing to change.' : 'You are ' + plural(j.prepMonths, 'month') + ' of saving away, at the ' + money(j.surplusNow) + ' a month you keep today.'}</li>
          {j.burn > 0 ? <li><strong>When {money(input.boundary / 2)} is gone.</strong> Halfway. Is the income showing up the way you thought it would?</li> : null}
          {j.burn > 0 ? <li><strong>When {money(input.boundary)} is gone.</strong> You stop. Decide now what stopping looks like, while it is easy to decide.</li> : null}
          <li><strong>When you are earning {money(input.incomeAfter)} a month.</strong> You are there.</li>
        </ol>
      </div>

      <div className="q">
        <h2>{worries.length ? 'What to look at first' : 'Nothing in this plan breaks a basic rule'}</h2>
        {worries.length
          ? <ul className="list">{worries.map((c) => <li key={c.id}>{c.text}</li>)}</ul>
          : <p>It is paid for from cash you have, it leaves a cushion untouched, it survives going slowly, and the life at the end pays for itself.</p>}
      </div>

      <div className="nav no-print">
        <button type="button" className="btn btn-ghost" onClick={() => setStep(0)}>Change my answers</button>
        <button type="button" className="btn" onClick={() => window.print()}>Save or print</button>
      </div>
      <p className="muted small no-print">Your plan is saved in this browser only, so you can come back and update it. <button type="button" className="linkish" onClick={() => { clearPlan(); setWant(''); setRaw({}); setFb({}); setStep(-1); }}>Erase it and start over</button>.</p>

      <div className="card no-print">
        <h2>Two quick questions</h2>
        <p className="muted small">Your taps are counted without your name or your numbers. They tell us whether this is worth building further.</p>
        <Ask q="Did this show you something you did not already know?" value={fb.fresh} onPick={(v) => { track(v ? 'journey_new_yes' : 'journey_new_no'); setFb({ ...fb, fresh: v }); }} />
        <Ask q="Do you feel trapped between how you spend your time and money and how you want to?" value={fb.trapped} onPick={(v) => { track(v ? 'journey_trapped_yes' : 'journey_trapped_no'); setFb({ ...fb, trapped: v }); }} />
      </div>

      <p className="muted small">This runs on your own numbers and guesses. It does not know your full situation and it does not tell you what to do. {DISCLAIMER}</p>
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
