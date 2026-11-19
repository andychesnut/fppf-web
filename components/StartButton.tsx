'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loadMe } from '@/lib/me-store.ts';

// One button. It knows whether this browser has already been through the questions.
export function StartButton() {
  const [done, setDone] = useState(false);
  useEffect(() => { setDone(loadMe().done); }, []);
  return <Link href={done ? '/home' : '/start'} className="a-btn">{done ? 'Open mine' : 'See where you stand'}</Link>;
}
