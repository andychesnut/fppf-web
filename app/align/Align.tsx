'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { track } from '@/lib/client.ts';
import { GROUPS, MAX_PRIORITIES, PRIORITIES, complete, mirror, mirrorLines, type Alignment, type Serves } from '@/lib/alignment.ts';
import { EMPTY, loadMe, saveMe, type Me } from '@/lib/me-store.ts';

const digits = (s: string) => s.replace(/[^0-9]/g, '').slice(0, 9);
const show = (n: number | undefined) => (n ? n.toLocaleString('en-US') : '');
const SERVES: [Serves, string][] = [['yes', 'Yes'], ['partly', 'Partly'], ['no', 'No']];

// Three short steps, then the result. Everything is kept in this browser and nowhere else.
export function Align() {
  const [me, setMe] = useState<Me>(EMPTY);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => { const m = loadMe(); setMe(m); setStep(complete(m.align) && Object.keys(m.align.serves).length ? 3 : 0); setReady(true); track('align_view'); }, []);
  if (!ready) return <main className="a-screen" />;

  const a = me.align;
  const set = (next: Alignment) => { const m = { ...me, align: next }; setMe(m); saveMe(m); };
  const filled = GROUPS.filter((g) => (a.amounts[g.id] ?? 0) > 0);
  const top = (
    <div className="a-top"><Link href="/" className="a-brand">First Principles Money</Link>{me.done ? <Link href="/home" className="a-link">Home</Link> : null}</div>
  );

  if (step === 0) {
    return (
      <main className="a-screen">
        {top}
        <h1 className="a-h1">What matters most to you?</h1>
        <p className="a-help">Pick up to {MAX_PRIORITIES}. Your call, and nobody sees it.</p>
        <div className="a-options">
          {PRIORITIES.map((p) => {
            const on = a.priorities.includes(p);
            return <button type="button" key={p} className="a-option" aria-pressed={on} onClick={() => set({ ...a, priorities: on ? a.priorities.filter((x) => x !== p) : a.priorities.length < MAX_PRIORITIES ? [...a.priorities, p] : a.priorities })}>{p}</button>;
          })}
        </div>
        <div className="a-bottom"><button type="button" className="a-btn" disabled={!a.priorities.length} onClick={() => setStep(1)}>Next</button><p className="a-note">Stays on this device.</p></div>
      </main>
    );
  }

  if (step === 1) {
    return (
      <main className="a-screen">
        {top}
        <h1 className="a-h1">Where does your money go in a month?</h1>
        <p className="a-help">Rough is fine. Leave blank anything that does not apply.</p>
        <form className="a-form" onSubmit={(e) => { e.preventDefault(); if (filled.length) setStep(2); }}>
          {GROUPS.map((g) => (
            <div className="a-field" key={g.id}>
              <label htmlFor={'g-' + g.id}>{g.label}</label>
              <div className="a-money"><span aria-hidden="true">$</span><input id={'g-' + g.id} type="text" inputMode="numeric" autoComplete="off" value={show(a.amounts[g.id])} onChange={(e) => { const v = digits(e.target.value); set({ ...a, amounts: { ...a.amounts, [g.id]: v === '' ? undefined : Number(v) } }); }} /></div>
            </div>
          ))}
          <div className="a-bottom a-two"><button type="button" className="a-btn a-ghost" onClick={() => setStep(0)}>Back</button><button type="submit" className="a-btn" disabled={!filled.length}>Next</button></div>
        </form>
      </main>
    );
  }

  if (step === 2) {
    const allAnswered = filled.every((g) => a.serves[g.id]);
    return (
      <main className="a-screen">
        {top}
        <h1 className="a-h1">Does it serve what matters most to you?</h1>
        <p className="a-help">{a.priorities.join(', ')}. You decide for each one.</p>
        <div className="a-card a-rows">
          {filled.map((g) => (
            <div className="a-row a-stack" key={g.id}>
              <strong>{g.label} <span className="a-quiet">${(a.amounts[g.id] ?? 0).toLocaleString('en-US')}</span></strong>
              <div className="a-three" role="group" aria-label={g.label + ' serves what matters most'}>
                {SERVES.map(([v, label]) => <button type="button" key={v} className="a-option a-small" aria-pressed={a.serves[g.id] === v} onClick={() => set({ ...a, serves: { ...a.serves, [g.id]: v } })}>{label}</button>)}
              </div>
            </div>
          ))}
        </div>
        <div className="a-bottom a-two"><button type="button" className="a-btn a-ghost" onClick={() => setStep(1)}>Back</button><button type="button" className="a-btn" disabled={!allAnswered} onClick={() => { track('align_done'); setStep(3); }}>See it</button></div>
      </main>
    );
  }

  const m = mirror(a);
  const lines = mirrorLines(a);
  const bar = (k: 'yes' | 'partly' | 'no' | 'unrated') => ({ width: m.share[k] + '%' });
  return (
    <main className="a-screen">
      {top}
      <div className="a-dark">
        <span className="a-label">What matters most to you</span>
        <p className="a-want">{a.priorities.join(', ')}</p>
      </div>
      {m.total > 0 ? (
        <section className="a-card">
          <div className="a-cardhead"><h2>Where your money goes</h2></div>
          <div className="a-split" aria-hidden="true"><span style={bar('yes')} className="s3" /><span style={bar('partly')} className="s2" /><span style={bar('no')} className="s1" /><span style={bar('unrated')} className="s0" /></div>
          <div className="a-legend"><span><i className="s3" />Serves it {m.share.yes}%</span><span><i className="s2" />Partly {m.share.partly}%</span><span><i className="s1" />Does not {m.share.no}%</span></div>
          <div className="a-rows">{lines.map((l) => <div className="a-row a-line" key={l}>{l}</div>)}</div>
        </section>
      ) : <p className="a-help">Nothing entered yet.</p>}
      <p className="a-help">This is a mirror of what you told us. Whether any of it should change is your call.</p>
      <div className="a-bottom a-two"><button type="button" className="a-btn a-ghost" onClick={() => setStep(0)}>Change it</button><Link href={me.done ? '/home' : '/start'} className="a-btn">{me.done ? 'Back to home' : 'Continue'}</Link></div>
      <p className="a-note">Education, not advice. Everything here is saved on this device only.</p>
    </main>
  );
}
