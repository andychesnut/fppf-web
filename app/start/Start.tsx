'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/client.ts';
import { PART_NAME, QUESTIONS, reading, told, type Part } from '@/lib/onboarding.ts';
import { EMPTY, loadMe, saveMe, type Me } from '@/lib/me-store.ts';

// The order of screens. Questions are one per screen. Everything is saved in the browser as you go.
type Screen = { kind: 'welcome' } | { kind: 'q'; id: string } | { kind: 'told' } | { kind: 'draft' } | { kind: 'reading' };
const ids = (p: Part) => QUESTIONS.filter((q) => q.part === p).map((q) => ({ kind: 'q' as const, id: q.id }));
const SCREENS: Screen[] = [{ kind: 'welcome' }, ...ids('you'), { kind: 'told' }, { kind: 'draft' }, ...ids('situation'), ...ids('money'), { kind: 'reading' }];
const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

export function Start() {
  const router = useRouter();
  const [me, setMe] = useState<Me>(EMPTY);
  const [i, setI] = useState(0);
  const [ready, setReady] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => { setMe(loadMe()); setReady(true); track('start_view'); }, []);
  useEffect(() => { if (ready) headingRef.current?.focus(); }, [i, ready]);
  if (!ready) return <main className="a-screen" />;

  const update = (next: Me) => { setMe(next); saveMe(next); };
  const go = (n: number) => { if (n > i) track('start_step', { i: n }); setI(Math.max(0, Math.min(SCREENS.length - 1, n))); };
  const s = SCREENS[i];

  if (s.kind === 'welcome') {
    return (
      <main className="a-screen">
        <Link href="/" className="a-brand">First Principles Money</Link>
        <h1 ref={headingRef} tabIndex={-1} className="a-h1">Before we get to your money, a few questions about you.</h1>
        <div className="a-card a-rows">
          <div className="a-row"><span className="a-dot">1</span><strong>About you</strong><span className="a-quiet">3 min</span></div>
          <div className="a-row"><span className="a-dot">2</span><strong>Your situation</strong><span className="a-quiet">2 min</span></div>
          <div className="a-row"><span className="a-dot">3</span><strong>Your money</strong><span className="a-quiet">2 min</span></div>
        </div>
        <p className="a-note">Nothing you answer leaves this device.</p>
        <div className="a-bottom">
          <button type="button" className="a-btn" onClick={() => go(1)}>Start</button>
          <button type="button" className="a-link" onClick={() => go(SCREENS.findIndex((x) => x.kind === 'q' && x.id === 's1'))}>Skip to the money</button>
        </div>
      </main>
    );
  }

  if (s.kind === 'q') {
    const q = QUESTIONS.find((x) => x.id === s.id)!;
    const inPart = QUESTIONS.filter((x) => x.part === q.part);
    const n = inPart.findIndex((x) => x.id === q.id) + 1;
    const picked = me.answers[q.id];
    return (
      <main className="a-screen">
        <div className="a-progress"><div className="a-bar"><span style={{ width: (n / inPart.length) * 100 + '%' }} /></div><span className="a-quiet">{PART_NAME[q.part]} · {n} of {inPart.length}</span></div>
        <h1 ref={headingRef} tabIndex={-1} className="a-q">{q.text}</h1>
        {q.help ? <p className="a-help">{q.help}</p> : null}
        <div className="a-options">
          {q.options.map((o, k) => (
            <button key={o} type="button" className="a-option" aria-pressed={picked === k} onClick={() => update({ ...me, answers: { ...me.answers, [q.id]: k } })}>{o}</button>
          ))}
        </div>
        <div className="a-bottom a-two">
          <button type="button" className="a-btn a-ghost" onClick={() => go(i - 1)}>Back</button>
          <button type="button" className="a-btn" onClick={() => go(i + 1)}>{picked === undefined ? 'Skip' : 'Next'}</button>
        </div>
      </main>
    );
  }

  if (s.kind === 'told') {
    const lines = told(me.answers);
    return (
      <main className="a-screen">
        <h1 ref={headingRef} tabIndex={-1} className="a-h1">Here&apos;s what you told us</h1>
        {lines.length ? <div className="a-card a-rows">{lines.map((l) => <div className="a-row a-line" key={l}>{l}</div>)}</div>
          : <p className="a-help">You skipped these. That&apos;s fine. You can come back to them.</p>}
        <div className="a-bottom a-two">
          <button type="button" className="a-btn a-ghost" onClick={() => go(i - 1)}>Back</button>
          <button type="button" className="a-btn" onClick={() => go(i + 1)}>Next</button>
        </div>
      </main>
    );
  }

  if (s.kind === 'draft') {
    return (
      <main className="a-screen">
        <h1 ref={headingRef} tabIndex={-1} className="a-h1">Now in your own words</h1>
        <div className="a-form">
          <div className="a-field"><label htmlFor="want">What do you want?</label><textarea id="want" rows={2} maxLength={200} placeholder="To work for myself and be home for dinner" value={me.want} onChange={(e) => update({ ...me, want: e.target.value })} /></div>
          <div className="a-field"><label htmlFor="wont">What won&apos;t you go along with?</label><textarea id="wont" rows={2} maxLength={200} placeholder="Signing off on numbers I don't believe" value={me.wont} onChange={(e) => update({ ...me, wont: e.target.value })} /></div>
          <div className="a-field"><label htmlFor="first">What matters most?</label><textarea id="first" rows={2} maxLength={200} placeholder="My kids, work I'm proud of" value={me.first} onChange={(e) => update({ ...me, first: e.target.value })} /></div>
        </div>
        <p className="a-note">A first draft. Change it whenever you like.</p>
        <div className="a-bottom a-two">
          <button type="button" className="a-btn a-ghost" onClick={() => go(i - 1)}>Back</button>
          <button type="button" className="a-btn" onClick={() => go(i + 1)}>{me.want.trim() ? 'Next' : 'Not sure yet'}</button>
        </div>
      </main>
    );
  }

  const r = reading(me.answers);
  const finish = () => { update({ ...me, done: true, at: today() }); track('start_done'); router.push('/home'); };
  return (
    <main className="a-screen">
      <div className="a-dark">
        <span className="a-label">{me.want.trim() ? 'You said you want' : "You're not sure what you want yet"}</span>
        <h1 ref={headingRef} tabIndex={-1} className="a-want">{me.want.trim() || 'So the first job is room to choose.'}</h1>
      </div>
      {r.inTheWay.length ? (
        <section className="a-section">
          <h2>What&apos;s in the way</h2>
          <div className="a-card a-rows">{r.inTheWay.map((x) => <div className="a-row a-pair" key={x.id}><span>{x.label}</span><strong>{x.value}</strong></div>)}</div>
        </section>
      ) : r.answered ? <p className="a-help">From what you told us, nothing big is in the way.</p> : <p className="a-help">You skipped the money questions, so there&apos;s nothing to show yet.</p>}
      {r.goingForYou.length ? (
        <section className="a-section">
          <h2>What you&apos;ve got going for you</h2>
          <div className="a-chips">{r.goingForYou.map((x) => <span key={x}>{x}</span>)}</div>
        </section>
      ) : null}
      {r.quiet && r.inTheWay.length ? <p className="a-dark a-line">You kept quiet at work {r.quiet} this year. This is why it was hard not to.</p> : null}
      <p className="a-note">A first read from rough answers. It&apos;s education, not advice, and what you do with it is your call.</p>
      <div className="a-bottom a-two">
        <button type="button" className="a-btn a-ghost" onClick={() => go(i - 1)}>Back</button>
        <button type="button" className="a-btn" onClick={finish}>Done</button>
      </div>
    </main>
  );
}
