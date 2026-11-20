// A review of things that keep costing money: do I use it, would I choose it again today.
// The person is the judge. No scores, no advice. Everything stays on the device.
export const MAX_ITEMS = 10;
export type Use = 'yes' | 'sometimes' | 'no';
export type Again = 'yes' | 'unsure' | 'no';
export type Lane = 'ending' | 'hands' | 'big';
export type Item = { name: string; monthly: number; use?: Use; again?: Again; need?: boolean; lane?: Lane };
export type Review = { items: Item[]; basecamp?: number };
export const EMPTY_REVIEW: Review = { items: [] };

export const cleanItem = (v: unknown): Item | null => {
  if (!v || typeof v !== 'object') return null;
  const o = v as Record<string, unknown>;
  const name = typeof o.name === 'string' ? o.name.slice(0, 60) : '';
  const monthly = typeof o.monthly === 'number' && Number.isFinite(o.monthly) && o.monthly >= 0 && o.monthly < 1e9 ? Math.round(o.monthly) : 0;
  const use = o.use === 'yes' || o.use === 'sometimes' || o.use === 'no' ? o.use : undefined;
  const again = o.again === 'yes' || o.again === 'unsure' || o.again === 'no' ? o.again : undefined;
  const need = o.need === true ? true : undefined;
  const lane = o.lane === 'ending' || o.lane === 'hands' || o.lane === 'big' ? o.lane : undefined;
  return { name, monthly, use, again, need, lane };
};
export const cleanReview = (v: unknown): Review => {
  const list = v && typeof v === 'object' && Array.isArray((v as { items?: unknown }).items) ? (v as { items: unknown[] }).items : [];
  const b = v && typeof v === 'object' ? (v as { basecamp?: unknown }).basecamp : undefined;
  const basecamp = typeof b === 'number' && Number.isFinite(b) && b > 0 && b < 1e9 ? Math.round(b) : undefined;
  const items = list.map(cleanItem).filter((x): x is Item => x !== null).slice(0, MAX_ITEMS);
  return basecamp ? { items, basecamp } : { items };
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

// The alignment reading. The structure is fixed: needs, toward, ending, against.
// Needs are not scored; only what the person's needs cost above their own basecamp number counts against.
// Ending costs and "not sure" answers are left out. Score = toward / (toward + against), a rule the person can check.
export type Alignment = { toward: number; against: number; ending: number; needs: number; aboveBasecamp: number; score: number | null; lanes: Record<Lane, number>; againstItems: Item[] };
export function alignment(r: Review): Alignment {
  const items = r.items.filter((i) => i.name.trim() && i.monthly > 0);
  const sum = (xs: Item[]) => xs.reduce((s, i) => s + i.monthly, 0);
  const needItems = items.filter((i) => i.need);
  const rest = items.filter((i) => !i.need);
  const needs = sum(needItems);
  const aboveBasecamp = r.basecamp ? Math.max(0, needs - r.basecamp) : 0;
  const toward = sum(rest.filter((i) => i.again === 'yes'));
  const noItems = rest.filter((i) => i.again === 'no');
  const ending = sum(noItems.filter((i) => i.lane === 'ending'));
  const againstItems = noItems.filter((i) => i.lane !== 'ending').sort((a, b) => b.monthly - a.monthly);
  const against = sum(againstItems) + aboveBasecamp;
  const lanes: Record<Lane, number> = { ending, hands: sum(againstItems.filter((i) => i.lane === 'hands')), big: sum(againstItems.filter((i) => i.lane !== 'hands')) + aboveBasecamp };
  const score = toward + against > 0 ? Math.round((toward / (toward + against)) * 100) : null;
  return { toward, against, ending, needs, aboveBasecamp, score, lanes, againstItems };
}
// What the misaligned money could be, in a unit the person set (for example the cost of a month of their own bet). Never a recommendation.
export function inUnits(monthly: number, unitCost: number): number | null {
  if (!(unitCost > 0) || !(monthly > 0)) return null;
  return Math.round((monthly / unitCost) * 10) / 10;
}
