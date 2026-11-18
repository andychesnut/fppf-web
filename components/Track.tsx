'use client';
import { useEffect } from 'react';
import { track } from '@/lib/client.ts';

export function Track({ name }: { name: string }) {
  useEffect(() => { track(name); }, [name]);
  return null;
}
