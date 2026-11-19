// A review of things that keep costing money: do I use it, would I choose it again today.
// The person is the judge. No scores, no advice. Everything stays on the device.
export const MAX_ITEMS = 10;
export type Use = 'yes' | 'sometimes' | 'no';
export type Again = 'yes' | 'unsure' | 'no';
export type Item = { name: string; monthly: number; use?: Use; again?: Again };
export type Review = { items: Item[] };
export const EMPTY_REVIEW: Review = { items: [] };

export const cleanItem = (v: unknown): Item | null => {
  if (!v || typeof v !== 'object') return null;
  const o = v as Record<string, unknown>;
  const name = typeof o.name === 'string' ? o.name.slice(0, 60) : '';
  const monthly = typeof o.monthly === 'number' && Number.isFinite(o.monthly) && o.monthly >= 0 && o.monthly < 1e9 ? Math.round(o.monthly) : 0;
  const use = o.use === 'yes' || o.use === 'sometimes' || o.use === 'no' ? o.use : undefined;
  const again = o.again === 'yes' || o.again === 'unsure' || o.again === 'no' ? o.again : undefined;
  return { name, monthly, use, again };
};
export const cleanReview = (v: unknown): Review => {
  const list = v && typeof v === 'object' && Array.isArray((v as { items?: unknown }).items) ? (v as { items: unknown[] }).items : [];
  return { items: list.map(cleanItem).filter((x): x is Item => x !== null).slice(0, MAX_ITEMS) };
};

export const ready = (r: Review) => r.items.some((i) => i.name.trim() && i.monthly > 0);
export const rated = (i: Item) => i.use !== undefined && i.again !== undefined;

export type Summary = { count: number; monthly: number; notChosen: Item[]; notChosenMonthly: number; notChosenYearly: number; unused: Item[] };
export function summarize(r: Review): Summary {
  const items = r.items.filter((i) => i.name.trim() && i.monthly > 0);
  const notChosen = items.filter((i) => i.again === 'no').sort((a, b) => b.monthly - a.monthly);
  const sum = (xs: Item[]) => xs.reduce((s, i) => s + i.monthly, 0);
  return { count: items.length, monthly: sum(items), notChosen, notChosenMonthly: sum(notChosen), notChosenYearly: sum(notChosen) * 12, unused: items.filter((i) => i.use === 'no') };
}

// Plain sentences. They describe what the person said; they never say what to do.
export function summaryLines(r: Review): string[] {
  const s = summarize(r);
  if (!s.count) return [];
  const usd = (n: number) => '$' + n.toLocaleString('en-US');
  const out = ['You listed ' + s.count + (s.count === 1 ? ' thing' : ' things') + ' that cost ' + usd(s.monthly) + ' a month.'];
  if (s.notChosen.length) {
    out.push('You said you would not choose ' + (s.notChosen.length === 1 ? 'this' : 'these') + ' again today: ' + s.notChosen.map((i) => i.name.trim()).join(', ') + '. Together that is ' + usd(s.notChosenMonthly) + ' a month, or ' + usd(s.notChosenYearly) + ' a year.');
  } else if (r.items.filter((i) => i.name.trim() && i.monthly > 0).every((i) => i.again === 'yes')) out.push('You would choose every one of them again today.');
  return out;
}
