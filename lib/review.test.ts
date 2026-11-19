import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanReview, summarize, summaryLines, ready, MAX_ITEMS } from './review.ts';

test('summarize adds what the person would not choose again', () => {
  const s = summarize({ items: [{ name: 'Gym', monthly: 40, again: 'no' }, { name: 'Car', monthly: 500, again: 'no' }, { name: 'Phone', monthly: 60, again: 'yes' }] });
  assert.equal(s.count, 3); assert.equal(s.monthly, 600);
  assert.equal(s.notChosenMonthly, 540); assert.equal(s.notChosenYearly, 6480);
  assert.equal(s.notChosen[0].name, 'Car');
});
test('blank or zero rows are ignored', () => {
  const r = { items: [{ name: '', monthly: 10 }, { name: 'X', monthly: 0 }] };
  assert.equal(summarize(r).count, 0); assert.equal(ready(r), false); assert.deepEqual(summaryLines(r), []);
});
test('storage is cleaned and capped', () => {
  const junk = { items: [...Array(20)].map(() => ({ name: 'a'.repeat(200), monthly: -5, use: 'maybe', again: 'no' })).concat([null as never, 7 as never]) };
  const r = cleanReview(junk);
  assert.equal(r.items.length, MAX_ITEMS); assert.equal(r.items[0].name.length, 60); assert.equal(r.items[0].monthly, 0); assert.equal(r.items[0].use, undefined);
  assert.deepEqual(cleanReview('x'), { items: [] });
});
test('sentences describe and never advise', () => {
  const t = summaryLines({ items: [{ name: 'Gym', monthly: 40, again: 'no' }, { name: 'Phone', monthly: 60, again: 'yes' }] }).join(' ');
  assert.match(t, /\$100 a month/); assert.match(t, /\$480 a year/);
  assert.doesNotMatch(t, /should|cancel|you must|best|guarantee|—/i);
  assert.match(summaryLines({ items: [{ name: 'Phone', monthly: 60, again: 'yes' }] }).join(' '), /every one of them again/);
});
