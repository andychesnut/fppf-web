// Everything the person tells us lives in their own browser and nowhere else.
// Storage can be blocked, so every access is guarded.
import type { Answers, Numbers } from './onboarding.ts';

export type Me = { answers: Answers; want: string; wont: string; first: string; numbers: Numbers | null; done: boolean; at: string | null };
const KEY = 'fp_me';
export const EMPTY: Me = { answers: {}, want: '', wont: '', first: '', numbers: null, done: false, at: null };

const text = (v: unknown) => (typeof v === 'string' ? v.slice(0, 200) : '');
const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 && v < 1e9 ? v : null);

export function loadMe(): Me {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY) || 'null');
    if (!v || typeof v !== 'object') return { ...EMPTY };
    const answers: Answers = {};
    if (v.answers && typeof v.answers === 'object') for (const [k, x] of Object.entries(v.answers)) if (typeof x === 'number' && x >= 0 && x < 10) answers[k] = x;
    const n = v.numbers && typeof v.numbers === 'object' ? { pay: num(v.numbers.pay), bills: num(v.numbers.bills), daily: num(v.numbers.daily), savings: num(v.numbers.savings) } : null;
    const numbers = n && n.pay !== null && n.bills !== null && n.daily !== null && n.savings !== null ? (n as Numbers) : null;
    return { answers, want: text(v.want), wont: text(v.wont), first: text(v.first), numbers, done: v.done === true, at: typeof v.at === 'string' ? v.at.slice(0, 10) : null };
  } catch { return { ...EMPTY }; }
}
export function saveMe(me: Me): void {
  try { window.localStorage.setItem(KEY, JSON.stringify(me)); } catch { /* still works for this visit */ }
}
export function clearMe(): void {
  try { window.localStorage.removeItem(KEY); } catch { /* nothing to clear */ }
}
