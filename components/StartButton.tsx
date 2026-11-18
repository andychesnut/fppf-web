'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loadPlan } from '@/lib/plan-store.ts';

// One button. It knows whether this browser already holds a plan.
export function StartButton() {
  const [hasPlan, setHasPlan] = useState(false);
  useEffect(() => { setHasPlan(loadPlan()?.done === true); }, []);
  return <Link href="/journey" className="btn">{hasPlan ? 'Open my plan' : 'Map mine'}</Link>;
}
