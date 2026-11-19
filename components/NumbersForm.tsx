'use client';
import { useState } from 'react';
import type { Numbers } from '@/lib/onboarding.ts';

const FIELDS: { key: keyof Numbers; label: string }[] = [
  { key: 'pay', label: 'Take-home pay each month' },
  { key: 'bills', label: "Bills you can't skip" },
  { key: 'daily', label: 'Everything else you spend' },
  { key: 'savings', label: 'Savings you could get to this week' },
];
const digits = (s: string) => s.replace(/[^0-9]/g, '').slice(0, 9);
const show = (s: string) => (s ? Number(s).toLocaleString('en-US') : '');

// Four numbers. They are kept in this browser and never sent anywhere.
export function NumbersForm({ start, onSave, cta }: { start: Numbers | null; onSave: (n: Numbers) => void; cta: string }) {
  const [raw, setRaw] = useState<Record<keyof Numbers, string>>({
    pay: start ? String(start.pay) : '', bills: start ? String(start.bills) : '', daily: start ? String(start.daily) : '', savings: start ? String(start.savings) : '',
  });
  const ready = FIELDS.every((f) => raw[f.key] !== '');
  return (
    <form className="a-form" onSubmit={(e) => { e.preventDefault(); if (ready) onSave({ pay: Number(raw.pay), bills: Number(raw.bills), daily: Number(raw.daily), savings: Number(raw.savings) }); }}>
      {FIELDS.map((f) => (
        <div className="a-field" key={f.key}>
          <label htmlFor={'n-' + f.key}>{f.label}</label>
          <div className="a-money"><span aria-hidden="true">$</span><input id={'n-' + f.key} type="text" inputMode="numeric" autoComplete="off" value={show(raw[f.key])} onChange={(e) => setRaw({ ...raw, [f.key]: digits(e.target.value) })} /></div>
        </div>
      ))}
      <button type="submit" className="a-btn" disabled={!ready}>{cta}</button>
      <p className="a-note">These stay on this device.</p>
    </form>
  );
}
