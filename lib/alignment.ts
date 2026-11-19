// Where a person's money and what they say matters to them line up, and where they don't.
// The person is the judge: they pick what matters, enter what goes where, and say whether each thing serves it.
// There are no scores and no thresholds. Everything stays on the device.
export const PRIORITIES = [
  'Time with the people I love', 'Freedom to leave a job', 'Feeling secure', 'My health',
  'Learning and growing', 'Giving back', 'Making something of my own', 'Seeing the world',
] as const;
export const MAX_PRIORITIES = 3;

export const GROUPS = [
  { id: 'housing', label: 'Housing' }, { id: 'debt', label: 'Debt payments' }, { id: 'food', label: 'Food' },
  { id: 'transport', label: 'Getting around' }, { id: 'family', label: 'Kids and family' }, { id: 'health', label: 'Health and insurance' },
  { id: 'giving', label: 'Giving' }, { id: 'aside', label: 'Money put aside' }, { id: 'rest', label: 'Fun and everything else' },
] as const;
export type GroupId = (typeof GROUPS)[number]['id'];
export type Serves = 'yes' | 'partly' | 'no';
export type Alignment = { priorities: string[]; amounts: Partial<Record<GroupId, number>>; serves: Partial<Record<GroupId, Serves>> };
export const EMPTY_ALIGN: Alignment = { priorities: [], amounts: {}, serves: {} };

export type Mirror = {
  total: number;
  share: Record<Serves | 'unrated', number>; // whole percent of spending, summing to 100 when total > 0
  biggestNo: { label: string; percent: number } | null;
  biggestYes: { label: string; percent: number } | null;
};

export function mirror(a: Alignment): Mirror {
  const rows = GROUPS.map((g) => ({ label: g.label, amount: Math.max(0, a.amounts[g.id] ?? 0), serves: a.serves[g.id] })).filter((r) => r.amount > 0);
  const total = rows.reduce((s, r) => s + r.amount, 0);
  const share: Mirror['share'] = { yes: 0, partly: 0, no: 0, unrated: 0 };
  if (total === 0) return { total, share, biggestNo: null, biggestYes: null };
  const sums: Record<string, number> = { yes: 0, partly: 0, no: 0, unrated: 0 };
  for (const r of rows) sums[r.serves ?? 'unrated'] += r.amount;
  // Largest remainder rounding so the four shares always add to 100.
  const keys = ['yes', 'partly', 'no', 'unrated'] as const;
  const raw = keys.map((k) => (sums[k] / total) * 100);
  const floor = raw.map(Math.floor);
  let left = 100 - floor.reduce((s, x) => s + x, 0);
  raw.map((x, i) => ({ i, r: x - Math.floor(x) })).sort((p, q) => q.r - p.r).forEach(({ i }) => { if (left > 0) { floor[i]++; left--; } });
  keys.forEach((k, i) => { share[k] = floor[i]; });
  const top = (s: Serves) => { const r = rows.filter((x) => x.serves === s).sort((p, q) => q.amount - p.amount)[0]; return r ? { label: r.label, percent: Math.round((r.amount / total) * 100) } : null; };
  return { total, share, biggestNo: top('no'), biggestYes: top('yes') };
}

// Plain sentences for the result. They describe; they never tell the person what to do.
export function mirrorLines(a: Alignment): string[] {
  const m = mirror(a);
  if (m.total === 0) return [];
  const out: string[] = [];
  const named = a.priorities.length ? 'what matters most to you' : 'what you said matters';
  out.push('Of every $100 you spend, about $' + m.share.yes + ' goes to things that serve ' + named + ', $' + m.share.partly + ' partly, and $' + m.share.no + ' to things that do not.');
  if (m.biggestNo) out.push('The biggest thing you said does not serve it: ' + m.biggestNo.label.toLowerCase() + ', ' + m.biggestNo.percent + '% of your spending.');
  if (m.biggestYes) out.push('The biggest thing that does: ' + m.biggestYes.label.toLowerCase() + ', ' + m.biggestYes.percent + '%.');
  if (m.share.unrated > 0) out.push(m.share.unrated + '% of your spending has no answer yet.');
  return out;
}

export const complete = (a: Alignment) => a.priorities.length > 0 && Object.values(a.amounts).some((v) => (v ?? 0) > 0);
