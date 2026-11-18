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
  const shortfall = Math.max(0, Math.max(slow.cost, i.boundary) - i.cash);
  const prepMonths = shortfall === 0 ? 0 : surplusNow > 0 ? Math.ceil(shortfall / surplusNow) : null;
  const afterSurplus = i.incomeAfter - i.costAfter;

  const checks: Check[] = [
    { id: 'funded', ok: i.boundary <= i.cash,
      text: i.boundary <= i.cash
        ? 'Your boundary is covered by cash you already hold.'
        : 'Your boundary is larger than your cash. A common principle is to fund a transition from savings or surplus, not from borrowing.' },
    { id: 'reserve', ok: reserveMonths >= 3,
      text: 'If you spent the whole boundary, about ' + reserveMonths + (reserveMonths === 1 ? ' month' : ' months') + ' of costs would remain untouched. Many people keep a separate cushion of a few months so essentials are never part of the bet.' },
    { id: 'slow', ok: slow.withinBoundary,
      text: slow.withinBoundary
        ? 'Even the slow case stays inside your boundary.'
        : 'The slow case costs more than your boundary. People in this position often lengthen the preparation phase, lower costs during the transition, or raise income during it before starting.' },
    { id: 'target', ok: afterSurplus >= 0,
      text: afterSurplus >= 0
        ? 'The life you described pays for itself at the income you are aiming for.'
        : 'The life you described costs more than the income you are aiming for. The gap is about ' + round(-afterSurplus) + ' a month.' },
  ];

  return { surplusNow, burn, boundaryMonths, reserve, reserveMonths, scenarios, prepMonths, afterSurplus, checks };
}
