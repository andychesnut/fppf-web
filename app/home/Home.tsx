'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NumbersForm } from '@/components/NumbersForm.tsx';
import { track } from '@/lib/client.ts';
import { month, reading, sharpen } from '@/lib/onboarding.ts';
import { EMPTY, clearMe, loadMe, saveMe, type Me } from '@/lib/me-store.ts';

const money = (n: number) => (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US');

export function Home() {
  const [me, setMe] = useState<Me>(EMPTY);
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState(false);
  useEffect(() => { setMe(loadMe()); setReady(true); track('home_view'); }, []);
  if (!ready) return <main className="a-screen" />;

  if (!me.done) {
    return (
      <main className="a-screen">
        <Link href="/" className="a-brand">First Principles Money</Link>
        <h1 className="a-h1">Nothing here yet.</h1>
        <p className="a-help">Answer a few questions first. It takes about ten minutes.</p>
        <div className="a-bottom"><Link href="/start" className="a-btn">Start</Link></div>
      </main>
    );
  }

  const m = me.numbers ? month(me.numbers) : null;
  const r = me.numbers ? sharpen(reading(me.answers), me.numbers) : reading(me.answers);
  const sayNo = r.sayNo;
  const share = (part: number) => (me.numbers && me.numbers.pay > 0 ? Math.max(0, Math.min(100, (part / me.numbers.pay) * 100)) : 0);

  return (
    <main className="a-screen a-home">
      <div className="a-top"><Link href="/" className="a-brand">First Principles Money</Link><Link href="/start" className="a-link">Change my answers</Link></div>

      <div className="a-dark">
        <span className="a-label">{me.want.trim() ? 'You said you want' : "You're not sure what you want yet"}</span>
        <p className="a-want">{me.want.trim() || 'So the first job is room to choose.'}</p>
        {sayNo ? <p className="a-big"><span>You could say no for</span><strong>{sayNo}</strong></p> : null}
      </div>

      {m && me.numbers ? (
        <section className="a-card">
          <div className="a-cardhead"><h2>This month</h2><button type="button" className="a-link" onClick={() => setEditing(!editing)}>{editing ? 'Close' : 'Change'}</button></div>
          {editing ? <NumbersForm start={me.numbers} cta="Save" onSave={(n) => { const next = { ...me, numbers: n }; setMe(next); saveMe(next); setEditing(false); track('numbers_saved'); }} /> : (
            <>
              <div className="a-three">
                <div><span>Money in</span><strong>{money(me.numbers.pay)}</strong></div>
                <div><span>Money out</span><strong>{money(me.numbers.bills + me.numbers.daily)}</strong></div>
                <div><span>{m.left >= 0 ? 'Left' : 'Short'}</span><strong className={m.left >= 0 ? 'a-live' : 'a-warn'}>{money(Math.abs(m.left))}</strong></div>
              </div>
              <div className="a-split" aria-hidden="true"><span style={{ width: share(me.numbers.bills) + '%' }} className="s1" /><span style={{ width: share(me.numbers.daily) + '%' }} className="s2" /><span style={{ width: share(Math.max(0, m.left)) + '%' }} className="s3" /></div>
              <div className="a-legend"><span><i className="s1" />Bills you can&apos;t skip {m.billsShare}%</span><span><i className="s2" />Everything else</span><span><i className="s3" />Left</span></div>
            </>
          )}
        </section>
      ) : (
        <section className="a-card">
          <div className="a-cardhead"><h2>Want real numbers?</h2></div>
          {editing
            ? <NumbersForm start={null} cta="Save" onSave={(n) => { const next = { ...me, numbers: n }; setMe(next); saveMe(next); setEditing(false); track('numbers_saved'); }} />
            : <><p className="a-help">So far this is from rough answers. Four numbers make it exact.</p><button type="button" className="a-btn a-ghost" onClick={() => setEditing(true)}>Add my numbers</button></>}
        </section>
      )}

      {r.inTheWay.length ? (
        <section className="a-card">
          <div className="a-cardhead"><h2>What&apos;s in the way</h2></div>
          <div className="a-rows">{r.inTheWay.map((x) => <div className="a-row a-pair" key={x.id}><span>{x.label}</span><strong>{x.value}</strong></div>)}</div>
        </section>
      ) : null}

      {r.goingForYou.length ? (
        <section className="a-section">
          <h2>What you&apos;ve got going for you</h2>
          <div className="a-chips">{r.goingForYou.map((x) => <span key={x}>{x}</span>)}</div>
        </section>
      ) : null}

      <section className="a-card a-cta">
        <div><h2>Thinking about a new payment?</h2><p className="a-help">See what it does before you sign.</p></div>
        <Link href="/what-if" className="a-btn">What if?</Link>
      </section>

      {me.wont.trim() || me.first.trim() ? (
        <section className="a-card a-rows">
          {me.wont.trim() ? <div className="a-row a-stack"><span>You won&apos;t go along with</span><strong>{me.wont}</strong></div> : null}
          {me.first.trim() ? <div className="a-row a-stack"><span>What matters most</span><strong>{me.first}</strong></div> : null}
        </section>
      ) : null}

      <p className="a-note">Education, not advice. What you do is your call. Everything here is saved on this device only. <button type="button" className="a-link a-inline" onClick={() => { clearMe(); setMe({ ...EMPTY }); }}>Erase it</button>.</p>
    </main>
  );
}
