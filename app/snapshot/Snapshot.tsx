'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Mark } from '@/components/Mark.tsx';
import { Stack } from '@/components/Stack.tsx';
import { anonId, track } from '@/lib/client.ts';
import { DISCLAIMER } from '@/lib/site.ts';
import { NEXT_MOVES, QUESTIONS, STAGES, priceVariantFor, score, type Answers, type StageId, type StageState } from '@/lib/snapshot.ts';

type Phase = 'intro' | 'questions' | 'result';

export function Snapshot() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [adult, setAdult] = useState(false);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the heading when the screen changes, so keyboard and screen reader users follow along.
  useEffect(() => { headingRef.current?.focus(); }, [phase, i]);

  if (phase === 'intro') {
    return (
      <main className="narrow flow">
        <Link href="/" className="brand"><Mark size={24} /><span>The Snapshot</span></Link>
        <div className="q">
          <h1 ref={headingRef} tabIndex={-1}>24 questions. About 6 minutes.</h1>
          <p>Each question asks what you did, in ranges. There are no right answers, and nobody sees yours.</p>
        </div>
        <ul className="list">
          <li>No balances, account numbers, or login.</li>
          <li>We never store your individual answers.</li>
          <li>You see your result without giving an email.</li>
        </ul>
        <label className="check">
          <input type="checkbox" checked={adult} onChange={(e) => setAdult(e.target.checked)} />
          <span>I am 18 or older.</span>
        </label>
        <p className="muted small">{DISCLAIMER}</p>
        <div className="nav">
          <button type="button" className="btn" disabled={!adult} onClick={() => { track('snapshot_start'); setPhase('questions'); }}>Start</button>
        </div>
      </main>
    );
  }

  if (phase === 'questions') {
    const q = QUESTIONS[i];
    const stage = STAGES.find((s) => s.id === q.stage)!;
    const picked = answers[q.id];
    const next = () => {
      track('question_answered', { i: i + 1 });
      if (i === QUESTIONS.length - 1) {
        const r = score(answers);
        track('snapshot_complete', { stage: r.yourStage ?? 'all_solid', load: r.load });
        setPhase('result');
      } else setI(i + 1);
    };
    return (
      <main className="narrow flow">
        <div>
          <div className="progress-head"><strong>Part {stage.n} of 6 · {stage.name}</strong><span className="muted">{i + 1} of {QUESTIONS.length}</span></div>
          <div className="progress" role="img" aria-label={'Question ' + (i + 1) + ' of ' + QUESTIONS.length}>
            {STAGES.map((s) => <span key={s.id} className={s.n < stage.n ? 'done' : s.n === stage.n ? 'now' : ''} />)}
          </div>
        </div>
        <div className="q">
          <h1 ref={headingRef} tabIndex={-1}>{q.text}</h1>
          {q.help ? <p className="muted">{q.help}</p> : null}
        </div>
        <div className="options" role="group" aria-label="Answers">
          {q.options.map((o, idx) => (
            <button key={o.label} type="button" className="option" aria-pressed={picked === idx} onClick={() => setAnswers({ ...answers, [q.id]: idx })}>{o.label}</button>
          ))}
        </div>
        <div className="nav">
          <button type="button" className="btn btn-ghost" onClick={() => (i === 0 ? setPhase('intro') : setI(i - 1))}>Back</button>
          <button type="button" className="btn" disabled={picked === undefined} onClick={next}>{i === QUESTIONS.length - 1 ? 'See my result' : 'Next'}</button>
        </div>
      </main>
    );
  }

  return <ResultView answers={answers} adult={adult} headingRef={headingRef} onRestart={() => { setAnswers({}); setI(0); setPhase('intro'); }} />;
}

function ResultView({ answers, adult, headingRef, onRestart }: { answers: Answers; adult: boolean; headingRef: React.RefObject<HTMLHeadingElement | null>; onRestart: () => void }) {
  const r = useMemo(() => score(answers), [answers]);
  const price = useMemo(() => priceVariantFor(anonId()), []);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ kind: 'idle' | 'busy' | 'ok' | 'error'; text?: string }>({ kind: 'idle' });
  const [wantsFull, setWantsFull] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => { track('price_intent_view', { price }); }, [price]);

  const map: Partial<Record<StageId, StageState>> = {};
  for (const [k, v] of Object.entries(r.map)) map[k as StageId] = v.state;
  const stage = r.yourStage ? STAGES.find((s) => s.id === r.yourStage)! : null;
  const exposed = stage ? r.map[r.yourStage!].state === 'Exposed' : false;
  const below = stage ? stage.n - 2 : 5;
  const moves = NEXT_MOVES[r.yourStage ?? 'freedom'];

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: 'busy' });
    try {
      const res = await fetch('/api/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, answers, adult, price, notifyFull: wantsFull }) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        track('email_saved', { price });
        setStatus({ kind: 'ok', text: data.emailed ? 'Saved. Check your inbox for your map.' : 'Saved. We will email your map as soon as email sending is switched on.' });
      } else setStatus({ kind: 'error', text: data.error || 'Could not save right now. Your result is still on this page.' });
    } catch {
      setStatus({ kind: 'error', text: 'Could not save right now. Your result is still on this page.' });
    }
  }

  return (
    <main className="narrow result">
      <Link href="/" className="brand"><Mark size={24} /><span>Your snapshot</span></Link>
      <div className="q">
        <span className="eyebrow">Where to start</span>
        <h1 ref={headingRef} tabIndex={-1}>{stage ? stage.name : 'Nothing here is holding you back'}</h1>
        <p>
          {!stage
            ? 'Nothing is exposed. What matters to you is where you keep building.'
            : exposed
              ? 'This is the most basic area that is exposed, so this is where your next move is.' + (below > 0 ? ' The ' + (below === 1 ? 'area' : below + ' areas') + ' before it ' + (below === 1 ? 'is' : 'are') + ' holding.' : '')
              : 'Nothing is exposed. This is the most basic area still building, so it is your next move.'}
        </p>
      </div>
      <Stack map={map} load={r.load} yours={r.yourStage} />
      <p className="muted small">Your situation is not a grade. A {r.load.toLowerCase()} load means {r.load === 'Heavy' ? 'more people and fewer incomes rest on each decision, so everything else needs more margin.' : r.load === 'Moderate' ? 'some weight rests on each decision, so everything else needs steady margin.' : 'few obligations rest on each decision, which gives everything else more room.'}</p>

      <div className="mon">
        <span className="label">Your runway, in months (an estimate from your own answers)</span>
        <span className="num">{r.monthsOfNo.text}</span>
        <p>How long your household could go without its largest income source.</p>
        <p className="math">{r.monthsOfNo.math}</p>
      </div>

      <div className="q">
        <h2>Three next moves</h2>
        <ol className="list">{moves.map((m) => <li key={m}>{m}</li>)}</ol>
      </div>

      <div className="card">
        <h2>Plan a way out</h2>
        <p>Knowing where you stand is half of it. Say what you want instead, set the most you are willing to risk, and see whether the plan holds.</p>
        <Link href="/journey" className="btn">Build my plan</Link>
      </div>

      <form className="card" onSubmit={save}>
        <h2>Save your map</h2>
        <p>We email it to you, so you can re-check later and see what moved.</p>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} id="email" type="email" required autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" className="btn" disabled={status.kind === 'busy' || status.kind === 'ok'}>{status.kind === 'busy' ? 'Saving' : 'Save my map'}</button>
        <p className="muted small">By saving your map you agree to the <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.</p>
        <div aria-live="polite">{status.text ? <p className="notice">{status.text}</p> : null}</div>
        <p className="muted small">We store your result, never your individual answers. <Link href="/delete">Delete your data</Link> any time.</p>
      </form>

      <div className="card offer">
        <div className="card-head"><h2>The Full Assessment</h2><span className="tag">Not available yet</span></div>
        <p>A deeper pass on every area: your own income statement, balance sheet, and cash flow, a written report, and a step-by-step plan in the right order.</p>
        <span className="price">${price}, one time</span>
        {wantsFull
          ? <p className="notice">Noted. Enter your email above and save, and we will tell you when it opens. Nothing is charged.</p>
          : <button type="button" className="btn btn-ghost" onClick={() => { track('price_intent_click', { price }); setWantsFull(true); emailRef.current?.focus(); }}>Notify me when it opens</button>}
        <p className="muted small">We are deciding whether to build this. The launch price may differ from the one shown, and nothing is charged now. Your tap tells us it is worth building.</p>
      </div>

      <button type="button" className="btn btn-ghost" onClick={onRestart}>Start over</button>
      <p className="muted small">{DISCLAIMER}</p>
    </main>
  );
}
