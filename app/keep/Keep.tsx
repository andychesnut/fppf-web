'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { track } from '@/lib/client.ts';
import { MAX_ITEMS, alignment, inUnits, rated, ready, summaryLines, summarize, type Again, type Item, type Lane, type Use } from '@/lib/review.ts';
import { EMPTY, loadMe, saveMe, type Me } from '@/lib/me-store.ts';

const digits = (s: string) => s.replace(/[^0-9]/g, '').slice(0, 7);
const USE: [Use, string][] = [['yes', 'Yes'], ['sometimes', 'Sometimes'], ['no', 'No']];
const LANE: [Lane, string][] = [['ending', 'Ending on its own'], ['hands', 'Small, in my hands'], ['big', 'Big, with obligations']];
const AGAIN: [Again, string][] = [['yes', 'Yes'], ['unsure', 'Not sure'], ['no', 'No']];

// Step 1: list what keeps costing money. Step 2: for each, do I use it and would I choose it again. Then a plain summary.
export function Keep() {
  const [me, setMe] = useState<Me>(EMPTY);
  const [step, setStep] = useState(0);
  const [ok, setOk] = useState(false);
  const [unit, setUnit] = useState({ name: '', cost: 0 });
  useEffect(() => { const m = loadMe(); setMe(m); setStep(ready(m.review) && m.review.items.every((i) => !i.name.trim() || i.monthly <= 0 || i.need || (rated(i) && (i.again !== 'no' || i.lane))) ? 2 : 0); setOk(true); track('keep_view'); }, []);
  if (!ok) return <main className="a-screen" />;

  const items = me.review.items;
  const put = (next: Item[]) => { const m = { ...me, review: { ...me.review, items: next } }; setMe(m); saveMe(m); };
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
    const all = live.every((i) => i.need || (rated(i) && (i.again !== 'no' || i.lane)));
    const anyNeed = live.some((i) => i.need);
    return (
      <main className="a-screen">
        {top}
        <h1 className="a-h1">Do you use it? Would you choose it again today?</h1>
        <p className="a-help">If you were starting from nothing today, knowing what you know now. You decide for each one.</p>
        <div className="a-card a-rows">
          {items.map((it, i) => (!it.name.trim() || it.monthly <= 0 ? null : (
            <div className="a-row a-stack" key={i}>
              <strong>{it.name} <span className="a-quiet">${it.monthly.toLocaleString('en-US')} a month</span></strong>
              <label className="a-help"><input type="checkbox" checked={it.need === true} onChange={(e) => edit(i, { need: e.target.checked ? true : undefined })} /> This is a basic need (food, a roof)</label>
              {it.need ? null : <>
              <span className="a-help">Do you use it?</span>
              <div className="a-three" role="group" aria-label={it.name + ': do you use it'}>{USE.map(([v, l]) => <button type="button" key={v} className="a-option a-small" aria-pressed={it.use === v} onClick={() => edit(i, { use: v })}>{l}</button>)}</div>
              <span className="a-help">Would you choose it again today?</span>
              <div className="a-three" role="group" aria-label={it.name + ': choose it again'}>{AGAIN.map(([v, l]) => <button type="button" key={v} className="a-option a-small" aria-pressed={it.again === v} onClick={() => edit(i, { again: v })}>{l}</button>)}</div>
              {it.again === 'no' ? <>
                <span className="a-help">What would it take to change?</span>
                <div className="a-three" role="group" aria-label={it.name + ': what it would take to change'}>{LANE.map(([v, l]) => <button type="button" key={v} className="a-option a-small" aria-pressed={it.lane === v} onClick={() => edit(i, { lane: v })}>{l}</button>)}</div>
              </> : null}
              </>}
            </div>
          )))}
        </div>
        {anyNeed ? <div className="a-field"><label htmlFor="k-base">What would a basecamp cost you per month for your needs? You set this number.</label><div className="a-money"><span aria-hidden="true">$</span><input id="k-base" type="text" inputMode="numeric" autoComplete="off" placeholder="per month" value={me.review.basecamp ? me.review.basecamp.toLocaleString('en-US') : ''} onChange={(e) => { const v = Number(digits(e.target.value) || 0); const m = { ...me, review: { ...me.review, basecamp: v > 0 ? v : undefined } }; setMe(m); saveMe(m); }} /></div></div> : null}
        <div className="a-bottom a-two"><button type="button" className="a-btn a-ghost" onClick={() => setStep(0)}>Back</button><button type="button" className="a-btn" disabled={!all} onClick={() => { track('keep_done'); setStep(2); }}>See it</button></div>
      </main>
    );
  }

  const s = summarize(me.review);
  const al = alignment(me.review);
  return (
    <main className="a-screen">
      {top}
      <div className="a-dark">
        <span className="a-label">What you would not choose again today</span>
        <p className="a-want">{s.notChosen.length ? '$' + s.notChosenMonthly.toLocaleString('en-US') + ' a month' : 'Nothing on your list'}</p>
      </div>
      {al.score !== null ? (
        <section className="a-card">
          <div className="a-cardhead"><h2>{al.score}% of your listed money goes toward what you chose</h2></div>
          <div className="a-rows">
            <div className="a-row a-line">The rule: toward ${al.toward.toLocaleString('en-US')} divided by (toward plus against ${al.against.toLocaleString('en-US')}). Basic needs and ending costs are left out.</div>
            {al.aboveBasecamp > 0 ? <div className="a-row a-line">Your needs cost ${al.needs.toLocaleString('en-US')} a month. Your basecamp number is ${(me.review.basecamp ?? 0).toLocaleString('en-US')}. The ${al.aboveBasecamp.toLocaleString('en-US')} above it counts as against.</div> : null}
            {al.toward > 0 ? <div className="a-row a-line">Worth noticing: ${al.toward.toLocaleString('en-US')} a month already goes to things you would choose again.</div> : null}
          </div>
        </section>
      ) : null}
      {al.against + al.ending > 0 ? (
        <section className="a-card">
          <div className="a-cardhead"><h2>What moves, and how hard it is</h2></div>
          <div className="a-rows">
            {al.lanes.ending > 0 ? <div className="a-row a-line">Ending on its own: ${al.lanes.ending.toLocaleString('en-US')} a month, with no decision needed.</div> : null}
            {al.lanes.hands > 0 ? <div className="a-row a-line">Small and in your hands: ${al.lanes.hands.toLocaleString('en-US')} a month.</div> : null}
            {al.lanes.big > 0 ? <div className="a-row a-line">Big, with obligations: ${al.lanes.big.toLocaleString('en-US')} a month. These can take months and cost money to change. They are your call.</div> : null}
          </div>
          <div className="a-field">
            <label htmlFor="k-unit">Measure it in something you value (optional). Name it and say what one costs.</label>
            <input id="k-unit" type="text" maxLength={40} autoComplete="off" placeholder="For example, a month of working for myself" value={unit.name} onChange={(e) => setUnit({ ...unit, name: e.target.value })} />
            <div className="a-money"><span aria-hidden="true">$</span><input aria-label="Cost of one" type="text" inputMode="numeric" autoComplete="off" placeholder="cost of one" value={unit.cost ? unit.cost.toLocaleString('en-US') : ''} onChange={(e) => setUnit({ ...unit, cost: Number(digits(e.target.value) || 0) })} /></div>
            {unit.name.trim() && inUnits(al.against + al.ending, unit.cost) !== null ? <p className="a-help">${(al.against + al.ending).toLocaleString('en-US')} a month is about {inUnits((al.against + al.ending) * 12, unit.cost)} of {unit.name.trim()} a year. The price is yours, not ours.</p> : null}
          </div>
        </section>
      ) : null}
      <section className="a-card"><div className="a-cardhead"><h2>What you told us</h2></div><div className="a-rows">{summaryLines(me.review).map((l) => <div className="a-row a-line" key={l}>{l}</div>)}</div></section>
      {s.unused.length ? <p className="a-help">You said you do not use: {s.unused.map((i) => i.name).join(', ')}.</p> : null}
      <p className="a-help">This is a mirror of what you told us. Whether any of it should change is your call.</p>
      <div className="a-bottom a-two"><button type="button" className="a-btn a-ghost" onClick={() => setStep(0)}>Change it</button><Link href={me.done ? '/home' : '/start'} className="a-btn">{me.done ? 'Back to home' : 'Continue'}</Link></div>
      <p className="a-note">Education, not advice. Everything here is saved on this device only.</p>
    </main>
  );
}
