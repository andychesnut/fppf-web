'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Mark } from '@/components/Mark.tsx';
import { Track } from '@/components/Track.tsx';
import { track } from '@/lib/client.ts';
import { DISCLAIMER } from '@/lib/site.ts';
import { compare, journey, type Change, type JourneyInput } from '@/lib/journey.ts';
import { clearPlan, loadPlan, longDate, savePlan, today, type Answers } from '@/lib/plan-store.ts';

// One question at a time, then the plan. Everything is worked out in the browser and saved only there.
// Analytics events carry a step number at most: never a figure and never the sentence.
type Field = { key: string; label: string; unit?: 'months' | 'people' };
type Step = { title: string; help: string; fields: Field[] };
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
    fields: [{ key: 'cash', label: 'Savings you could get to within a week' }, { key: 'boundary', label: 'The most of it you would be willing to use' }] },
  { title: 'How long do you think it would take?', help: 'Your honest guess. You will also see what happens if it takes half as long again.',
    fields: [{ key: 'months', label: 'Months', unit: 'months' }] },
  { title: 'What do you have that is not in a bank account?', help: 'These count too. Zero is a fine answer to any of them.',
    fields: [
      { key: 'sellable', label: 'Things you own outright and could sell if you had to (a vehicle, tools, equipment)' },
      { key: 'referrers', label: 'People who would hire you or send you work', unit: 'people' },
      { key: 'housers', label: 'People who would take your household in for a month', unit: 'people' },
    ] },
];
const LABEL: Record<keyof JourneyInput, string> = {
  incomeNow: 'Your take-home pay', costNow: 'Your monthly spending', cash: 'Your savings', costDip: 'The cost of the life you want', costAfter: 'The cost of the life you want',
  incomeDip: 'What you expect to earn along the way', incomeAfter: 'The income you are aiming for', boundary: 'Your limit', months: 'Your guess at how long it takes',
};
const digits = (s: string) => s.replace(/[^0-9]/g, '').slice(0, 9);
const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
const plural = (n: number, w: string) => n + ' ' + w + (n === 1 ? '' : 's');
const people = (n: number) => (n === 1 ? '1 person' : n + ' people');
const complete = (raw: Answers) => STEPS.every((s) => s.fields.every((f) => raw[f.key] !== undefined && raw[f.key] !== ''));

function toInput(raw: Answers): JourneyInput {
  const n = (k: string) => Number(raw[k]);
  return { incomeNow: n('incomeNow'), costNow: n('costNow'), cash: n('cash'), costDip: n('costAfter'), incomeDip: n('incomeDip'), months: Math.max(1, n('months')), boundary: n('boundary'), incomeAfter: n('incomeAfter'), costAfter: n('costAfter') };
}
function changeLine(c: Change): string {
  const amount = c.key === 'months' ? plural(c.from, 'month') + ' to ' + plural(c.to, 'month') : money(c.from) + ' to ' + money(c.to);
  const effect = c.months === null ? '' : c.months === 0 ? ' On its own, that did not change the distance.' : ' On its own, that is ' + plural(Math.abs(c.months), 'month') + (c.months < 0 ? ' closer.' : ' further.');
  return LABEL[c.key] + ' went from ' + amount + '.' + effect;
}

export function Journey() {
  const [ready, setReady] = useState(false);
  const [want, setWant] = useState('');
  const [raw, setRaw] = useState<Answers>({});
  const [at, setAt] = useState<string | undefined>();
  const [prev, setPrev] = useState<{ raw: Answers; at: string } | undefined>();
  const [step, setStep] = useState(-1); // -1 = the sentence, 0..6 = questions, 7 = the plan
  const [fb, setFb] = useState<{ fresh?: boolean; trapped?: boolean }>({});
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const p = loadPlan();
    if (p) { setWant(p.want); setRaw(p.raw); setAt(p.at); setPrev(p.prev); setStep(p.done && complete(p.raw) ? STEPS.length : p.want ? 0 : -1); }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) headingRef.current?.focus(); }, [step, ready]);

  const plan = useMemo(() => (complete(raw) ? { input: toInput(raw), out: journey(toInput(raw)) } : null), [raw]);
  const since = useMemo(() => (prev && plan && complete(prev.raw) ? compare(toInput(prev.raw), plan.input) : null), [prev, plan]);

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
      <form className="q" onSubmit={(e) => { e.preventDefault(); savePlan({ want: want.trim(), raw, done: false, at, prev }); setStep(0); }}>
        <h1 ref={headingRef} tabIndex={-1}>What would you be doing if money weren&apos;t holding you in place?</h1>
        <div className="field">
          <label htmlFor="want">Say it in a sentence</label>
          <input id="want" type="text" maxLength={140} required autoFocus placeholder="Work for myself. Go part time. Move back home." value={want} onChange={(e) => setWant(e.target.value)} />
        </div>
        <div className="nav"><button type="submit" className="btn">Next</button></div>
        <p className="muted small">Eight short questions. Your answers stay in this browser.</p>
      </form>,
    );
  }

  if (step < STEPS.length) {
    const s = STEPS[step];
    const filled = s.fields.every((f) => raw[f.key] !== undefined && raw[f.key] !== '');
    const next = (e: React.FormEvent) => {
      e.preventDefault();
      const done = step === STEPS.length - 1;
      const stamp = done ? today() : at;
      track(done ? 'journey_complete' : 'journey_step', { i: step + 1 });
      savePlan({ want, raw, done: done || complete(raw), at: stamp, prev });
      setAt(stamp);
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
        <p className="muted small">Question {step + 2} of {STEPS.length + 1}. Your answers stay in this browser.</p>
      </form>,
    );
  }

  if (!plan) { return shell(<div className="q"><h1 ref={headingRef} tabIndex={-1}>A few answers are missing.</h1><div className="nav"><button type="button" className="btn" onClick={() => setStep(0)}>Go through the questions</button></div></div>); }

  const { input, out: j } = plan;
  const [fast, expected, slow] = j.scenarios;
  const worries = j.checks.filter((c) => !c.ok);
  const diff = input.costAfter - input.costNow;
  const sellable = Number(raw.sellable), referrers = Number(raw.referrers), housers = Number(raw.housers);
  const moved = since && since.before !== null && since.after !== null ? since.after - since.before : null;

  // Keep today's answers as the point to compare against, then walk the questions again.
  const update = () => {
    const kept = { raw: { ...raw }, at: at ?? today() };
    track('journey_update');
    savePlan({ want, raw, done: true, at, prev: kept });
    setPrev(kept);
    setStep(0);
  };

  return (
    <main className="narrow result">
      <Link href="/" className="brand"><Mark size={24} /><span>Your plan</span></Link>
      <div className="q">
        <span className="eyebrow">What you want</span>
        <h1 ref={headingRef} tabIndex={-1}>{want}</h1>
      </div>

      <div className="mon">
        <span className="label">How far away you are</span>
        <dl className="sum">
          <div><dt>Savings the plan needs</dt><dd>{money(j.needed)}</dd></div>
          <div><dt>Savings today</dt><dd>{money(input.cash)}</dd></div>
          <div><dt>Kept each month</dt><dd>{money(Math.max(0, j.surplusNow))}</dd></div>
          <div className="total"><dt>{j.prepMonths === 0 ? 'You could start now' : j.prepMonths === null ? 'No date yet' : plural(j.prepMonths, 'month') + ' away'}</dt><dd /></div>
        </dl>
        {j.prepMonths === null ? <p>Nothing is left over each month to close the gap, so that is the first thing to change.</p> : null}
      </div>

      {since && prev ? (
        <div className="card">
          <h2>Since {longDate(prev.at)}</h2>
          <p>{since.changes.length === 0 ? 'Nothing in your answers changed.'
            : moved === null ? 'Your answers changed, but the distance cannot be compared in months for both dates.'
            : moved === 0 ? 'You are the same distance away.'
            : 'You are ' + plural(Math.abs(moved), 'month') + (moved < 0 ? ' closer.' : ' further away.')}</p>
          {since.changes.length ? <ul className="list">{since.changes.map((c) => <li key={c.key}>{changeLine(c)}</li>)}</ul> : null}
        </div>
      ) : null}

      <div className="q">
        <h2>Once you start</h2>
        <p>{j.burn === 0
          ? 'You would earn what you spend while you get there, so your savings stay whole.'
          : 'You would draw ' + money(j.burn) + ' a month from savings (' + money(input.costAfter) + ' of costs, ' + money(input.incomeDip) + ' of income). Your limit of ' + money(input.boundary) + ' lasts ' + plural(j.boundaryMonths!, 'month') + '.'}</p>
        {j.burn > 0 ? (
          <ul className="list">
            {([['If it goes quickly', fast], ['If it goes the way you expect', expected], ['If it goes slowly', slow]] as const).map(([label, s]) => (
              <li key={s.name}><strong>{label}:</strong> {plural(s.months, 'month')} and {money(s.cost)}. {s.withinBoundary ? 'That is ' + s.boundaryUsedPct + '% of your limit.' : 'That is ' + money(s.cost - input.boundary) + ' past your limit.'}</li>
            ))}
          </ul>
        ) : null}
        {j.burn > 0 ? <p className="muted small">These come from your own guess of {plural(input.months, 'month')}: two thirds of it, all of it, and half as long again. They are scenarios, not predictions.</p> : null}
      </div>

      {j.burn > 0 ? (
        <div className="q">
          <h2>When to stop and check</h2>
          <ol className="list">
            <li><strong>When {money(input.boundary / 2)} is spent.</strong> Is the income arriving the way you thought it would?</li>
            <li><strong>When {money(input.boundary)} is spent.</strong> You stop. Decide now what stopping means, while it is easy to decide.</li>
          </ol>
        </div>
      ) : null}

      <div className="q">
        <h2>What you have that is not in a bank account</h2>
        <ul className="list">
          <li>{sellable > 0 ? 'You own about ' + money(sellable) + ' in things you could sell. If you reached your limit, that is roughly ' + plural(Math.floor(sellable / Math.max(1, input.costAfter)), 'more month') + ' of costs.' : 'You listed nothing you could sell, so your savings are the whole of what stands behind this plan.'}</li>
          <li>{referrers > 0 ? people(referrers) + ' would hire you or send you work.' : 'You named no one who would hire you or send you work.'}{input.incomeDip > 0 ? (referrers > 0 ? ' The ' + money(input.incomeDip) + ' a month you expect along the way probably starts with them.' : ' You are counting on ' + money(input.incomeDip) + ' a month along the way, so it is worth knowing where the first of it comes from.') : ''}</li>
          <li>{housers > 0 ? people(housers) + ' would take your household in for a month. Reaching your limit would be hard, but you would have somewhere to go.' : 'You named no one who would take your household in. That makes reaching your limit more serious than the dollars suggest.'}</li>
        </ul>
      </div>

      <div className="q">
        <h2>{worries.length ? 'What to look at first' : 'How the plan holds up'}</h2>
        {worries.length
          ? <ul className="list">{worries.map((c) => <li key={c.id}>{c.text}</li>)}</ul>
          : <p>It is paid for from savings you have, it leaves at least three months of costs untouched, it stays inside your limit even if it goes slowly, and the life at the end pays for itself.</p>}
        <p>{diff === 0 ? 'The life you want costs about what you spend today.' : 'The life you want costs ' + money(Math.abs(diff)) + ' a month ' + (diff < 0 ? 'less' : 'more') + ' than the one you have now.'}{' '}
          {j.afterSurplus >= 0 ? 'At the income you are aiming for, it pays for itself' + (j.afterSurplus > 0 ? ' with ' + money(j.afterSurplus) + ' a month to spare.' : '.') : ''}</p>
      </div>

      <div className="card no-print">
        <h2>Come back when something changes</h2>
        <p>A raise, a debt paid off, a new expense, a first customer. Update your numbers and you will see how far it moved you and why.</p>
        <div className="nav">
          <button type="button" className="btn" onClick={update}>Update my numbers</button>
        </div>
        <p className="muted small">Answered {at ? 'on ' + longDate(at) : 'today'}. Saved in this browser only. You can <button type="button" className="linkish" onClick={() => window.print()}>save or print it</button>, <button type="button" className="linkish" onClick={() => setStep(0)}>fix a mistake</button> without starting a new comparison, or <button type="button" className="linkish" onClick={() => { clearPlan(); setWant(''); setRaw({}); setAt(undefined); setPrev(undefined); setFb({}); setStep(-1); }}>erase everything</button>.</p>
      </div>

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
