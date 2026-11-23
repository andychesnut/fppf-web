'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { track } from '@/lib/client.ts';
import { OFFER_PRICE } from '@/lib/waitlist.ts';

export function Offer() {
  const [email, setEmail] = useState('');
  const [adult, setAdult] = useState(false);
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');
  const [err, setErr] = useState('');
  useEffect(() => { track('offer_view', { price: OFFER_PRICE }); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setState('busy');
    try {
      const r = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, adult }) });
      const j = await r.json().catch(() => ({ ok: false, error: 'Something went wrong.' }));
      if (j.ok) { track('waitlist_joined', { price: OFFER_PRICE }); setState('done'); return; }
      setErr(j.error || 'Something went wrong.');
    } catch { setErr('Could not reach the server. Please try again.'); }
    setState('idle');
  }

  if (state === 'done') return <section><h2>You are on the list.</h2><p>We will write once, when the review opens. Nothing was charged.</p></section>;
  return (
    <section>
      <h2>Planned launch price: ${OFFER_PRICE}, one time</h2>
      <p>This is a planned price, shown so you can tell us whether it is fair. <strong>Nothing is charged today and we do not take payment details.</strong> If it launches, it will be a single payment with the refund policy shown before you pay.</p>
      <form onSubmit={submit} className="a-form">
        <div className="a-field">
          <label htmlFor="wl-email">Email</label>
          <input id="wl-email" type="email" autoComplete="email" required value={email} onFocus={() => track('offer_start')} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <p><label><input type="checkbox" checked={adult} onChange={(e) => setAdult(e.target.checked)} /> I am 18 or older.</label></p>
        <p className="small">By joining you agree to the <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>. We store only your email.</p>
        {err ? <p role="alert">{err}</p> : null}
        <button type="submit" className="a-btn" disabled={state === 'busy' || !adult || !email}>Join the waitlist</button>
      </form>
    </section>
  );
}
