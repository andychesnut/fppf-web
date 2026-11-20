import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanReview, summarize, summaryLines, ready, alignment, inUnits, MAX_ITEMS } from './review.ts';

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

test('alignment score is toward over toward plus against; needs and ending are left out', () => {
  const a = alignment({ items: [
    { name: 'Trips', monthly: 300, again: 'yes' },
    { name: 'Car', monthly: 700, again: 'no', lane: 'big' },
    { name: 'Gym', monthly: 100, again: 'no', lane: 'hands' },
    { name: 'Class', monthly: 200, again: 'no', lane: 'ending' },
    { name: 'Maybe', monthly: 50, again: 'unsure' },
    { name: 'Rent', monthly: 2000, again: 'yes', need: true },
  ], basecamp: 1500 });
  assert.equal(a.toward, 300); assert.equal(a.ending, 200); assert.equal(a.aboveBasecamp, 500);
  assert.equal(a.against, 1300); assert.equal(a.score, Math.round((300 / 1600) * 100));
  assert.deepEqual(a.lanes, { ending: 200, hands: 100, big: 1200 });
});
test('needs at or under the basecamp are not counted at all', () => {
  const a = alignment({ items: [{ name: 'Rent', monthly: 1200, need: true }, { name: 'Trips', monthly: 100, again: 'yes' }], basecamp: 1500 });
  assert.equal(a.against, 0); assert.equal(a.score, 100);
});
test('no scored items means no score', () => {
  assert.equal(alignment({ items: [{ name: 'Rent', monthly: 900, need: true }] }).score, null);
  assert.equal(alignment({ items: [] }).score, null);
});
test('inUnits uses the person\'s own unit and refuses a missing one', () => {
  assert.equal(inUnits(1000, 400), 2.5); assert.equal(inUnits(1000, 0), null); assert.equal(inUnits(0, 400), null);
});
test('need, lane and basecamp survive cleaning; junk does not', () => {
  const r = cleanReview({ items: [{ name: 'a', monthly: 5, need: true, lane: 'big' }, { name: 'b', monthly: 5, need: 'yes', lane: 'x' }], basecamp: 1800.4 });
  assert.equal(r.items[0].need, true); assert.equal(r.items[0].lane, 'big'); assert.equal(r.items[1].need, undefined); assert.equal(r.items[1].lane, undefined); assert.equal(r.basecamp, 1800);
  assert.equal(cleanReview({ items: [], basecamp: -4 }).basecamp, undefined);
});
