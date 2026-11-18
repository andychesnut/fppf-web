// Journey model: a planned transition with a bounded loss.
// Pure functions, no imports. Education and self-assessment only: every number comes from
// the person's own inputs, and every projection is a hypothetical scenario, not a prediction.

export type JourneyInput = {
  incomeNow: number;   // monthly take-home today
  costNow: number;     // monthly spending today
  cash: number;        // cash on hand
  costDip: number;     // monthly spending during the transition
  incomeDip: number;   // monthly income during the transition
  months: number;      // how long the person expects the transition to take
  boundary: number;    // the most cash the person is willing to spend on it
  incomeAfter: number; // monthly income the person is aiming for afterward
  costAfter: number;   // monthly cost of the life the person wants
};

export type Scenario = { name: 'Fast' | 'Expected' | 'Slow'; months: number; cost: number; withinBoundary: boolean; boundaryUsedPct: number };
export type Check = { id: 'funded' | 'reserve' | 'slow' | 'target'; ok: boolean; text: string };

export type Journey = {
  surplusNow: number;
  burn: number;                  // cash used per month during the transition (0 if income covers costs)
  boundaryMonths: number | null; // months the boundary lasts at that burn. null = no burn
  reserve: number;               // cash left untouched if the whole boundary is spent
  reserveMonths: number;
  scenarios: Scenario[];
  needed: number;                // cash this plan needs before starting: the limit, or the slow case if that costs more
  prepMonths: number | null;     // months of saving at today's surplus before the slow case fits. null = cannot get there at today's surplus
  afterSurplus: number;
  checks: Check[];
};

export const SCENARIO_FACTORS = { Fast: 0.67, Expected: 1, Slow: 1.5 } as const;

const round = (n: number) => Math.round(n);

export function journey(i: JourneyInput): Journey {
  for (const [k, v] of Object.entries(i)) if (!Number.isFinite(v) || v < 0) throw new Error('Invalid input: ' + k);
  const surplusNow = i.incomeNow - i.costNow;
  const burn = Math.max(0, i.costDip - i.incomeDip);
  const boundaryMonths = burn > 0 ? Math.floor(i.boundary / burn) : null;
  const reserve = Math.max(0, i.cash - i.boundary);
  const reserveMonths = i.costDip > 0 ? Math.floor(reserve / i.costDip) : 0;

  const scenarios: Scenario[] = (['Fast', 'Expected', 'Slow'] as const).map((name) => {
    const months = Math.max(1, Math.ceil(i.months * SCENARIO_FACTORS[name]));
    const cost = round(burn * months);
    return { name, months, cost, withinBoundary: cost <= i.boundary, boundaryUsedPct: i.boundary > 0 ? round((cost / i.boundary) * 100) : cost > 0 ? Infinity : 0 };
  });
  const slow = scenarios[2];

  // Cash needed before starting: enough to cover the slow case, and the boundary must exist as cash.
  const needed = Math.max(slow.cost, i.boundary);
  const shortfall = Math.max(0, needed - i.cash);
  const prepMonths = shortfall === 0 ? 0 : surplusNow > 0 ? Math.ceil(shortfall / surplusNow) : null;
  const afterSurplus = i.incomeAfter - i.costAfter;

  const checks: Check[] = [
    { id: 'funded', ok: i.boundary <= i.cash,
      text: i.boundary <= i.cash
        ? 'Your limit is covered by cash you already have.'
        : 'Your limit is more than the cash you have. A common rule is to pay for a change like this from savings, not from borrowing.' },
    { id: 'reserve', ok: reserveMonths >= 3,
      text: 'If you used your whole limit, you would have about ' + reserveMonths + (reserveMonths === 1 ? ' month' : ' months') + ' of costs left. Many people keep at least three months aside that the plan never touches.' },
    { id: 'slow', ok: slow.withinBoundary,
      text: slow.withinBoundary
        ? 'Even if it goes slowly, it stays inside your limit.'
        : 'If it goes slowly, it costs more than your limit. People in this spot often save for longer first, spend less along the way, or line up more income before they start.' },
    { id: 'target', ok: afterSurplus >= 0,
      text: afterSurplus >= 0
        ? 'The life you described pays for itself at the income you are aiming for.'
        : 'The life you described costs more than the income you are aiming for. The gap is about ' + round(-afterSurplus) + ' a month.' },
  ];

  return { surplusNow, burn, boundaryMonths, reserve, reserveMonths, scenarios, needed, prepMonths, afterSurplus, checks };
}

// What moved between two sets of answers. Each change is measured on its own: the months it would
// have added or removed if nothing else had changed. The parts are approximate and need not sum to the total.
export type Change = { key: keyof JourneyInput; from: number; to: number; months: number | null };
export type Comparison = { before: number | null; after: number | null; changes: Change[] };

export function compare(prev: JourneyInput, next: JourneyInput): Comparison {
  const before = journey(prev).prepMonths;
  const after = journey(next).prepMonths;
  const changes: Change[] = [];
  for (const key of Object.keys(next) as (keyof JourneyInput)[]) {
    if (prev[key] === next[key]) continue;
    const alone = journey({ ...prev, [key]: next[key] }).prepMonths;
    changes.push({ key, from: prev[key], to: next[key], months: before === null || alone === null ? null : alone - before });
  }
  return { before, after, changes };
}

// Whole-number percentage of a whole, for "how much of your pay goes where". 0 when there is no whole.
export function share(part: number, whole: number): number {
  return whole > 0 ? Math.round((Math.max(0, part) / whole) * 100) : 0;
}
