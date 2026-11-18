import { test } from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS, STAGES, score, monthsOfNo, stateFor, loadFor, priceVariantFor, PRICE_VARIANTS, type Answers } from './snapshot.ts';

function all(pick: (n: number, id: string) => number): Answers {
  const a: Answers = {};
  for (const q of QUESTIONS) a[q.id] = pick(q.options.length, q.id);
  return a;
}
// Index of the option with the highest / lowest points for each question.
function best(): Answers {
  const a: Answers = {};
  for (const q of QUESTIONS) {
    const want = q.stage === 'formation' ? Math.min(...q.options.map((o) => o.points)) : Math.max(...q.options.map((o) => o.points));
    a[q.id] = q.options.findIndex((o) => o.points === want);
  }
  return a;
}
function worst(): Answers {
  const a: Answers = {};
  for (const q of QUESTIONS) {
    const want = q.stage === 'formation' ? Math.max(...q.options.map((o) => o.points)) : Math.min(...q.options.map((o) => o.points));
    a[q.id] = q.options.findIndex((o) => o.points === want);
  }
  return a;
}

test('24 questions, 4 per stage, ids unique', () => {
  assert.equal(QUESTIONS.length, 24);
  for (const s of STAGES) assert.equal(QUESTIONS.filter((q) => q.stage === s.id).length, 4, s.id);
  assert.equal(new Set(QUESTIONS.map((q) => q.id)).size, 24);
});

test('every option has points 0 to 2 and no em-dash', () => {
  for (const q of QUESTIONS) {
    assert.ok(!q.text.includes('—'));
    for (const o of q.options) {
      assert.ok(o.points >= 0 && o.points <= 2, q.id);
      assert.ok(!o.label.includes('—'));
    }
  }
});

test('thresholds', () => {
  assert.equal(stateFor(8), 'Solid');
  assert.equal(stateFor(6), 'Solid');
  assert.equal(stateFor(5), 'Building');
  assert.equal(stateFor(3), 'Building');
  assert.equal(stateFor(2), 'Exposed');
  assert.equal(loadFor(6), 'Heavy');
  assert.equal(loadFor(3), 'Moderate');
  assert.equal(loadFor(2), 'Light');
});

test('best answers: all solid, light load, no stage flagged', () => {
  const r = score(best());
  assert.equal(r.load, 'Light');
  assert.equal(r.yourStage, null);
  for (const s of Object.values(r.map)) assert.equal(s.state, 'Solid');
});

test('worst answers: all exposed, heavy load, stage is foundation (lowest in sequence)', () => {
  const r = score(worst());
  assert.equal(r.load, 'Heavy');
  assert.equal(r.yourStage, 'foundation');
  for (const s of Object.values(r.map)) assert.equal(s.state, 'Exposed');
});

test('your stage is the lowest exposed stage, even if a lower one is only building', () => {
  const a = best();
  // Foundation to Building (two answers at 0 points -> 4 points)
  a.q5 = 2; a.q6 = 2;
  // Fundamentals to Exposed
  a.q13 = 3; a.q14 = 3; a.q15 = 0; a.q16 = 3;
  const r = score(a);
  assert.equal(r.map.foundation.state, 'Building');
  assert.equal(r.map.fundamentals.state, 'Exposed');
  assert.equal(r.yourStage, 'fundamentals');
});

test('with nothing exposed, your stage is the lowest building stage', () => {
  const a = best();
  a.q9 = 0; a.q10 = 1; // framing: 0 + 1 + 2 + 2 = 5 -> Building
  const r = score(a);
  assert.equal(r.map.framing.state, 'Building');
  assert.equal(r.yourStage, 'framing');
});

test('months of no: arithmetic', () => {
  const a = best();
  a.q2 = 0; a.q15 = 2; // nearly all (0.95), 3 to 5 months
  assert.equal(monthsOfNo(a).text, '3 to 5');
  a.q2 = 2; // about half (0.5): 6 to 10
  assert.equal(monthsOfNo(a).text, '6 to 10');
  a.q15 = 0; a.q2 = 0; // less than 1 month, nearly all
  assert.equal(monthsOfNo(a).text, 'Less than 1');
  a.q2 = 2; // less than 1 month, about half -> less than 2
  assert.equal(monthsOfNo(a).text, 'Less than 2');
  a.q15 = 4; a.q2 = 0; // 12 or more
  assert.equal(monthsOfNo(a).text, '12 or more');
  a.q2 = 2;
  assert.equal(monthsOfNo(a).text, '24 or more');
  a.q15 = 1; a.q2 = 1; // 1 to 2 months at 0.75 -> floor(1.33)=1 to floor(2.67)=2
  assert.equal(monthsOfNo(a).text, '1 to 2');
});

test('months of no: math sentence reads cleanly', () => {
  const a = best();
  a.q2 = 0; a.q15 = 2;
  const m = monthsOfNo(a).math;
  assert.ok(m.includes('is nearly all of household income'), m);
  assert.ok(!m.includes('of it of'), m);
});

test('missing answer throws', () => {
  const a = best();
  delete a.q7;
  assert.throws(() => score(a));
});

test('price variant is stable and in range', () => {
  for (const id of ['a', 'abc123', 'zzzzzzzz', '0f9e8d7c']) {
    const p = priceVariantFor(id);
    assert.ok((PRICE_VARIANTS as readonly number[]).includes(p));
    assert.equal(priceVariantFor(id), p);
  }
});

test('all() helper covers every question (sanity)', () => {
  const r = score(all(() => 0));
  assert.ok(r.monthsOfNo.text.length > 0);
});
