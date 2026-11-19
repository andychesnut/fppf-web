'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { track } from '@/lib/client.ts';
import { MAX_ITEMS, rated, ready, summaryLines, summarize, type Again, type Item, type Use } from '@/lib/review.ts';
import { EMPTY, loadMe, saveMe, type Me } from '@/lib/me-store.ts';

const digits = (s: string) => s.replace(/[^0-9]/g, '').slice(0, 7);
const USE: [Use, string][] = [['yes', 'Yes'], ['sometimes', 'Sometimes'], ['no', 'No']];
const AGAIN: [Again, string][] = [['yes', 'Yes'], ['unsure', 'Not sure'], ['no', 'No']];

// Step 1: list what keeps costing money. Step 2: for each, do I use it and would I choose it again. Then a plain summary.
export function Keep() {
  const [me, setMe] = useState<Me>(EMPTY);
  const [step, setStep] = useState(0);
  const [ok, setOk] = useState(false);
  useEffect(() => { const m = loadMe(); setMe(m); setStep(ready(m.review) && m.review.items.every((i) => !i.name.trim() || i.monthly <= 0 || rated(i)) ? 2 : 0); setOk(true); track('keep_view'); }, []);
  if (!ok) return <main className="a-screen" />;

  const items = me.review.items;
  const put = (next: Item[]) => { const m = { ...me, review: { items: next } }; setMe(m); saveMe(m); };
  const edit = (i: number, patch: Partial<Item>) => put(items.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const top = <div className="a-top"><Link href="/" className="a-brand">First Principles Money</Link>{me.done ? <Link href="/home" className="a-link">Home</Link> : null}</div>;
  const live = items.filter((i) => i.name.trim() && i.monthly > 0);

  if (step === 0) {
    const rows = items.length ? items : [{ name: '', monthly: 0 }];
    return (
      <main className="a-screen">
        {top}
        <h1 className="a-h1">What keeps costing you money?</h1>
        <p className="a-help">Things that renew or come out on their own: a car payment, a subscription, a membership, a second home. Up to {MAX_ITEMS}. Rough amounts are fine.</p>
        <form className="a-form" onSubmit={(e) => { e.preventDefault(); if (ready(me.review)) setStep(1); }}>
          {rows.map((it, i) => (
            <div className="a-field" key={i}>
              <label htmlFor={'k-n' + i}>Thing {i + 1}</label>
              <input id={'k-n' + i} type="text" maxLength={60} autoComplete="off" placeholder="For example, gym membership" value={it.name} onChange={(e) => (items.length ? edit(i, { name: e.target.value }) : put([{ name: e.target.value, monthly: 0 }]))} />
              <div className="a-money"><span aria-hidden="true">$</span><input aria-label={'Per month for thing ' + (i + 1)} type="text" inputMode="numeric" autoComplete="off" placeholder="per month" value={it.monthly ? it.monthly.toLocaleString('en-US') : ''} onChange={(e) => { const v = Number(digits(e.target.value) || 0); items.length ? edit(i, { monthly: v }) : put([{ name: '', monthly: v }]); }} /></div>
            </div>
          ))}
          {items.length < MAX_ITEMS ? <button type="button" className="a-btn a-ghost" onClick={() => put([...items, { name: '', monthly: 0 }])}>Add another</button> : null}
          <div className="a-bottom"><button type="submit" className="a-btn" disabled={!ready(me.review)}>Next</button><p className="a-note">Stays on this device.</p></div>
        </form>
      </main>
    );
  }

  if (step === 1) {
    const all = live.every(rated);
    return (
      <main className="a-screen">
        {top}
        <h1 className="a-h1">Do you use it? Would you choose it again today?</h1>
        <p className="a-help">If you were starting from nothing today, knowing what you know now. You decide for each one.</p>
        <div className="a-card a-rows">
          {items.map((it, i) => (!it.name.trim() || it.monthly <= 0 ? null : (
            <div className="a-row a-stack" key={i}>
              <strong>{it.name} <span className="a-quiet">${it.monthly.toLocaleString('en-US')} a month</span></strong>
              <span className="a-help">Do you use it?</span>
              <div className="a-three" role="group" aria-label={it.name + ': do you use it'}>{USE.map(([v, l]) => <button type="button" key={v} className="a-option a-small" aria-pressed={it.use === v} onClick={() => edit(i, { use: v })}>{l}</button>)}</div>
              <span className="a-help">Would you choose it again today?</span>
              <div className="a-three" role="group" aria-label={it.name + ': choose it again'}>{AGAIN.map(([v, l]) => <button type="button" key={v} className="a-option a-small" aria-pressed={it.again === v} onClick={() => edit(i, { again: v })}>{l}</button>)}</div>
            </div>
          )))}
        </div>
        <div className="a-bottom a-two"><button type="button" className="a-btn a-ghost" onClick={() => setStep(0)}>Back</button><button type="button" className="a-btn" disabled={!all} onClick={() => { track('keep_done'); setStep(2); }}>See it</button></div>
      </main>
    );
  }

  const s = summarize(me.review);
  return (
    <main className="a-screen">
      {top}
      <div className="a-dark">
        <span className="a-label">What you would not choose again today</span>
        <p className="a-want">{s.notChosen.length ? '$' + s.notChosenMonthly.toLocaleString('en-US') + ' a month' : 'Nothing on your list'}</p>
      </div>
      <section className="a-card"><div className="a-cardhead"><h2>What you told us</h2></div><div className="a-rows">{summaryLines(me.review).map((l) => <div className="a-row a-line" key={l}>{l}</div>)}</div></section>
      {s.unused.length ? <p className="a-help">You said you do not use: {s.unused.map((i) => i.name).join(', ')}.</p> : null}
      <p className="a-help">This is a mirror of what you told us. Whether any of it should change is your call.</p>
      <div className="a-bottom a-two"><button type="button" className="a-btn a-ghost" onClick={() => setStep(0)}>Change it</button><Link href={me.done ? '/home' : '/start'} className="a-btn">{me.done ? 'Back to home' : 'Continue'}</Link></div>
      <p className="a-note">Education, not advice. Everything here is saved on this device only.</p>
    </main>
  );
}
