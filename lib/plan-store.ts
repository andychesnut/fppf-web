// The plan lives in the visitor's own browser and nowhere else. Storage can be blocked, so every access is guarded.
export type StoredPlan = { want: string; raw: Record<string, string>; done: boolean };
const KEY = 'fp_plan';

export function loadPlan(): StoredPlan | null {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY) || 'null');
    if (!v || typeof v !== 'object' || typeof v.want !== 'string' || typeof v.raw !== 'object' || v.raw === null) return null;
    const raw: Record<string, string> = {};
    for (const [k, x] of Object.entries(v.raw)) if (typeof x === 'string' && x.length < 16) raw[k] = x;
    return { want: v.want.slice(0, 140), raw, done: v.done === true };
  } catch { return null; }
}
export function savePlan(p: StoredPlan): void {
  try { window.localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* the plan still works for this visit */ }
}
export function clearPlan(): void {
  try { window.localStorage.removeItem(KEY); } catch { /* nothing to clear */ }
}
