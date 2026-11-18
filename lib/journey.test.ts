import { test } from 'node:test';
import assert from 'node:assert/strict';
import { journey, type JourneyInput } from './journey.ts';

const base: JourneyInput = { incomeNow: 7000, costNow: 6000, cash: 40000, costDip: 5000, incomeDip: 2000, months: 6, boundary: 27000, incomeAfter: 6000, costAfter: 5000 };

test('burn, boundary months, and scenarios', () => {
  const j = journey(base);
  assert.equal(j.surplusNow, 1000);
  assert.equal(j.burn, 3000);
  assert.equal(j.boundaryMonths, 9);
  assert.deepEqual(j.scenarios.map((s) => [s.name, s.months, s.cost, s.withinBoundary]), [['Fast', 5, 15000, true], ['Expected', 6, 18000, true], ['Slow', 9, 27000, true]]);
  assert.equal(j.scenarios[1].boundaryUsedPct, 67);
  assert.equal(j.prepMonths, 0);
  assert.ok(j.checks.every((c) => c.ok === (c.id !== 'reserve')), 'only the reserve check fails: 13000 left is 2 months');
});

test('slow case over the boundary is flagged', () => {
  const j = journey({ ...base, boundary: 20000 });
  assert.equal(j.scenarios[2].withinBoundary, false);
  assert.equal(j.checks.find((c) => c.id === 'slow')!.ok, false);
});

test('boundary larger than cash is flagged and needs preparation', () => {
  const j = journey({ ...base, cash: 10000 });
  assert.equal(j.checks.find((c) => c.id === 'funded')!.ok, false);
  assert.equal(j.prepMonths, 17); // 27000 needed, 10000 held, 1000 a month saved
});

test('no surplus means preparation cannot be projected', () => {
  assert.equal(journey({ ...base, cash: 10000, incomeNow: 6000 }).prepMonths, null);
});

test('no burn when transition income covers costs', () => {
  const j = journey({ ...base, incomeDip: 5000 });
  assert.equal(j.burn, 0);
  assert.equal(j.boundaryMonths, null);
  assert.ok(j.scenarios.every((s) => s.cost === 0 && s.withinBoundary));
});

test('target that does not pay for itself is flagged', () => {
  const c = journey({ ...base, incomeAfter: 4000 }).checks.find((x) => x.id === 'target')!;
  assert.equal(c.ok, false);
  assert.match(c.text, /1000 a month/);
});

test('rejects negative or non-numeric input', () => {
  assert.throws(() => journey({ ...base, cash: -1 }));
  assert.throws(() => journey({ ...base, months: NaN }));
});

test('no advice or guarantee wording in any check', () => {
  for (const v of [base, { ...base, boundary: 20000 }, { ...base, cash: 0 }, { ...base, incomeAfter: 0 }])
    for (const c of journey(v).checks) assert.doesNotMatch(c.text, /you should|you must|guarantee|will earn|—/i);
});

import { compare } from './journey.ts';

// The example on the home page must be true to the engine.
const october: JourneyInput = { incomeNow: 7000, costNow: 6400, cash: 22000, costDip: 5000, incomeDip: 2000, months: 6, boundary: 27000, incomeAfter: 6000, costAfter: 5000 };
const november: JourneyInput = { ...october, costNow: 6000 };

test('home page example: 9 months away, then 5 after the car loan ends', () => {
  const c = compare(october, november);
  assert.equal(c.before, 9);
  assert.equal(c.after, 5);
  assert.deepEqual(c.changes, [{ key: 'costNow', from: 6400, to: 6000, months: -4 }]);
  assert.equal(journey(november).needed, 27000);
});

test('compare measures each change on its own', () => {
  const c = compare(october, { ...november, cash: 24000 });
  assert.equal(c.after, 3);
  assert.deepEqual(c.changes.map((x) => [x.key, x.months]), [['costNow', -4], ['cash', -4]]);
});

test('compare reports no months when nothing is left over each month', () => {
  const c = compare({ ...october, incomeNow: 6400 }, november);
  assert.equal(c.before, null);
  assert.equal(c.changes.find((x) => x.key === 'incomeNow')!.months, null);
});
