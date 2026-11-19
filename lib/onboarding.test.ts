import { test } from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS, partQuestions, reading, sharpen, told, month, whatIf, monthsText, type Answers } from './onboarding.ts';

test('15 questions, ids unique, parts sized 5, 6, 4', () => {
  assert.equal(QUESTIONS.length, 15);
  assert.equal(new Set(QUESTIONS.map((q) => q.id)).size, 15);
  assert.deepEqual([partQuestions('you').length, partQuestions('situation').length, partQuestions('money').length], [5, 6, 4]);
});

test('no em-dashes, advice words, or the six F names in any question', () => {
  for (const q of QUESTIONS) for (const t of [q.text, q.help ?? '', ...q.options])
    assert.doesNotMatch(t, /—|you should|you must|guarantee|Formation|Foundation|Framing|Fundamentals|Features|Freedom/);
});

const all = (i: number): Answers => Object.fromEntries(QUESTIONS.map((q) => [q.id, Math.min(i, q.options.length - 1)]));

test('nothing answered: empty reading, nothing invented', () => {
  const r = reading({});
  assert.deepEqual(r, { inTheWay: [], goingForYou: [], sayNo: null, quiet: null, answered: 0 });
  assert.deepEqual(told({}), []);
});

test('a hard situation: seven things in the way, most pressing first', () => {
  const r = reading({ a2: 2, s2: 0, s4: 0, s5: 0, m1: 3, m2: 3, m3: 0, m4: 3 });
  assert.deepEqual(r.inTheWay.map((i) => i.id), ['savings', 'bills', 'onejob', 'leftover', 'debt', 'skill', 'people']);
  assert.equal(r.inTheWay[0].value, 'less than a month');
  assert.equal(r.inTheWay[1].value, 'over 80%');
  assert.deepEqual(r.goingForYou, []);
  assert.equal(r.quiet, 'more than once');
  assert.equal(r.sayNo, 'less than a month');
});

test('a solid situation: nothing in the way', () => {
  const r = reading({ a2: 0, s2: 3, s4: 2, s5: 2, m1: 0, m2: 0, m3: 4, m4: 0 });
  assert.deepEqual(r.inTheWay, []);
  assert.equal(r.goingForYou.length, 7);
  assert.equal(r.quiet, null);
});

test('middle answers land where the comments say', () => {
  const r = reading({ m3: 2, m1: 1, m4: 2, s2: 1 });
  assert.deepEqual(r.inTheWay.map((i) => [i.id, i.value]), [['onejob', 'most of it']]);
  assert.deepEqual(r.goingForYou, ['A few months of savings']);
});

test('told: one plain line per answered question, in order', () => {
  assert.deepEqual(told({ a2: 2, a1: 2 }), ['Losing your job would be panic and relief at once.', 'You kept quiet at work more than once this year because you needed the paycheck.']);
  assert.equal(told(all(0)).length, 5);
});

test('month: what is left, share to bills, how long you could say no', () => {
  assert.deepEqual(month({ pay: 7000, bills: 3780, daily: 1520, savings: 11000 }), { left: 1700, billsShare: 54, sayNoMonths: 2 });
  assert.deepEqual(month({ pay: 0, bills: 0, daily: 0, savings: 500 }), { left: 0, billsShare: 0, sayNoMonths: null });
  assert.throws(() => month({ pay: -1, bills: 0, daily: 0, savings: 0 }));
});

test('what if: a $520 payment', () => {
  const w = whatIf({ pay: 7000, bills: 3780, daily: 1520, savings: 11000 }, 520);
  assert.deepEqual(w.after, { left: 1180, billsShare: 61, sayNoMonths: 1.5 });
  assert.equal(w.before.left - w.after.left, 520);
  assert.throws(() => whatIf({ pay: 1, bills: 1, daily: 1, savings: 1 }, NaN));
});

test('months in words', () => {
  assert.deepEqual([0, 0.5, 1, 1.5, 2, 2.5, 12].map(monthsText), ['less than a month', 'half a month', '1 month', '1½ months', '2 months', '2½ months', '12 months']);
  assert.equal(monthsText(null), 'as long as you like');
});

test('exact numbers replace the rough ranges for savings and bills', () => {
  const rough = reading({ m3: 1, m2: 1, s2: 0, m4: 0 });
  const r = sharpen(rough, { pay: 7000, bills: 3780, daily: 1520, savings: 11000 });
  assert.deepEqual(r.inTheWay.map((i) => [i.id, i.value]), [['savings', '2 months'], ['bills', '54% of your pay'], ['onejob', 'pretty much everything']]);
  assert.equal(r.sayNo, '2 months');
  const well = sharpen(rough, { pay: 7000, bills: 2000, daily: 1500, savings: 30000 });
  assert.deepEqual(well.inTheWay.map((i) => i.id), ['onejob']);
  assert.deepEqual(well.goingForYou, ['Six months or more of savings', 'No expensive debt', 'Bills take less than half your pay']);
});
