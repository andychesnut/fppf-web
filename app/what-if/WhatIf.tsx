'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { NumbersForm } from '@/components/NumbersForm.tsx';
import { track } from '@/lib/client.ts';
import { monthsText, whatIf } from '@/lib/onboarding.ts';
import { EMPTY, loadMe, saveMe, withNumbers, type Me } from '@/lib/me-store.ts';
import { today } from '@/lib/plan-store.ts';

const money = (n: number) => (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US');
const digits = (s: string) => s.replace(/[^0-9]/g, '').slice(0, 7);

// A new monthly payment, tried against the person's own numbers. Arithmetic only. Nothing is sent anywhere.
export function WhatIf() {
  const [me, setMe] = useState<Me>(EMPTY);
  const [ready, setReady] = useState(false);
  const [what, setWhat] = useState('');
  const [pay, setPay] = useState('');
  const tried = useRef(false);
  useEffect(() => { setMe(loadMe()); setReady(true); track('whatif_view'); }, []);
  if (!ready) return <main className="a-screen" />;

  if (!me.numbers) {
    return (
      <main className="a-screen">
        <Link href="/home" className="a-back">Home</Link>
        <h1 className="a-h1">First, four numbers.</h1>
        <p className="a-help">To show what a new payment does, we need to know where you are now.</p>
        <NumbersForm start={null} cta="Next" onSave={(n) => { const next = withNumbers(me, n, today()); setMe(next); saveMe(next); track('numbers_saved'); }} />
      </main>
    );
  }

  const p = Number(pay);
  const w = pay ? whatIf(me.numbers, p) : null;
  return (
    <main className="a-screen">
      <Link href="/home" className="a-back">Home</Link>
      <h1 className="a-h1">What if you took this on?</h1>
      <div className="a-card a-form">
        <div className="a-field"><label htmlFor="what">What is it?</label><input id="what" type="text" maxLength={40} placeholder="A car loan" value={what} onChange={(e) => setWhat(e.target.value)} /></div>
        <div className="a-field"><label htmlFor="pay">How much a month?</label><div className="a-money"><span aria-hidden="true">$</span><input id="pay" type="text" inputMode="numeric" autoComplete="off" value={pay ? Number(pay).toLocaleString('en-US') : ''} onChange={(e) => { if (!tried.current) { tried.current = true; track('whatif_try'); } setPay(digits(e.target.value)); }} /></div></div>
      </div>

      {w ? (
        <>
          <div className="a-dark">
            <span className="a-label">{what.trim() || 'This payment'}</span>
            <p className="a-big"><span>{w.after.left >= 0 ? "You'd have left each month" : "You'd be short each month by"}</span><strong>{money(Math.abs(w.after.left))}</strong></p>
            <p className="a-sub">Today it&apos;s {w.before.left >= 0 ? money(w.before.left) + ' left' : money(-w.before.left) + ' short'}.</p>
          </div>
          <div className="a-card a-rows">
            <div className="a-row a-pair"><span>Bills you can&apos;t skip</span><strong>{w.before.billsShare}%, then {w.after.billsShare}%</strong></div>
            <div className="a-row a-pair"><span>You could say no for</span><strong>{monthsText(w.before.sayNoMonths)}, then {monthsText(w.after.sayNoMonths).replace(/ months?$/, '')}</strong></div>
          </div>
          <p className="a-note">This is just the math on your own numbers. It&apos;s your call.</p>
        </>
      ) : <p className="a-help">Put in a monthly amount and you&apos;ll see what changes.</p>}
    </main>
  );
}
