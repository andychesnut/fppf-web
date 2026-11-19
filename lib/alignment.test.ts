import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mirror, mirrorLines, PRIORITIES, GROUPS, type Alignment } from './alignment.ts';

const a: Alignment = {
  priorities: ['Time with the people I love'],
  amounts: { housing: 2000, debt: 800, food: 600, rest: 600 },
  serves: { housing: 'yes', debt: 'no', food: 'yes', rest: 'partly' },
};

test('shares add to 100 and follow the person\'s own answers', () => {
  const m = mirror(a);
  assert.equal(m.total, 4000);
  assert.deepEqual(m.share, { yes: 65, partly: 15, no: 20, unrated: 0 });
  assert.equal(m.biggestNo?.label, 'Debt payments'); assert.equal(m.biggestNo?.percent, 20);
  assert.equal(m.biggestYes?.label, 'Housing'); assert.equal(m.biggestYes?.percent, 50);
});

test('unrated groups are counted, never guessed, and rounding still sums to 100', () => {
  const odd: Alignment = { priorities: ['My health'], amounts: { housing: 100, food: 100, rest: 100 }, serves: { housing: 'yes' } };
  const m = mirror(odd);
  assert.equal(m.share.yes + m.share.partly + m.share.no + m.share.unrated, 100);
  assert.ok(m.share.unrated >= 66);
});

test('nothing entered: no total, no lines, nothing invented', () => {
  assert.equal(mirror({ priorities: [], amounts: {}, serves: {} }).total, 0);
  assert.deepEqual(mirrorLines({ priorities: [], amounts: {}, serves: {} }), []);
});

test('lines describe and never advise; no em-dashes, no forbidden words', () => {
  const text = [...mirrorLines(a), ...PRIORITIES, ...GROUPS.map((g) => g.label)].join(' ');
  assert.doesNotMatch(text, /—|you should|you must|need to|guarantee|recommend|\bAI\b|\bsmart\b|insights/i);
  assert.match(mirrorLines(a)[0], /Of every \$100 you spend, about \$65 goes/);
});
