'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/client.ts';
import { loadPlan, savePlan } from '@/lib/plan-store.ts';

// The first question. The answer stays in this browser and is carried into the plan.
export function WantBox() {
  const router = useRouter();
  const [want, setWant] = useState('');
  const [hasPlan, setHasPlan] = useState(false);
  const typed = useRef(false);
  useEffect(() => { const p = loadPlan(); if (p) { setWant(p.want); setHasPlan(p.done); } }, []);

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const prev = loadPlan();
    savePlan({ want: want.trim(), raw: prev?.raw ?? {}, done: prev?.done ?? false });
    router.push('/journey');
  };
  return (
    <form className="want" onSubmit={go}>
      <label htmlFor="want" className="sr-only">What you would be doing</label>
      <textarea id="want" rows={2} maxLength={140} required placeholder="Work for myself. Go part time while the kids are small. Move back home."
        value={want} onChange={(e) => { if (!typed.current) { typed.current = true; track('landing_edit'); } setWant(e.target.value); }} />
      <button type="submit" className="btn">{hasPlan ? 'Open my plan' : 'Work out what it would take'}</button>
      <p className="muted small">About three minutes. What you type stays in your browser.</p>
    </form>
  );
}
