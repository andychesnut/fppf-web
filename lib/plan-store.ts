// The plan lives in the visitor's own browser and nowhere else. Storage can be blocked, so every access is guarded.
export type Answers = Record<string, string>;
export type StoredPlan = { want: string; raw: Answers; done: boolean; at?: string; prev?: { raw: Answers; at: string } };
const KEY = 'fp_plan';

function clean(v: unknown): Answers {
  const raw: Answers = {};
  if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (typeof x === 'string' && x.length < 16) raw[k] = x;
  return raw;
}
const day = (v: unknown) => (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : undefined);

export function loadPlan(): StoredPlan | null {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY) || 'null');
    if (!v || typeof v !== 'object' || typeof v.want !== 'string') return null;
    const prevAt = v.prev ? day(v.prev.at) : undefined;
    return { want: v.want.slice(0, 140), raw: clean(v.raw), done: v.done === true, at: day(v.at), prev: prevAt ? { raw: clean(v.prev.raw), at: prevAt } : undefined };
  } catch { return null; }
}
export function savePlan(p: StoredPlan): void {
  try { window.localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* the plan still works for this visit */ }
}
export function clearPlan(): void {
  try { window.localStorage.removeItem(KEY); } catch { /* nothing to clear */ }
}
export function today(): string {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
export function longDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
