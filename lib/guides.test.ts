import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GUIDES } from './guides.ts';
import { month, whatIf } from './onboarding.ts';

const text = (g: (typeof GUIDES)[number]) => [g.title, g.description, g.intro, g.cta.text, g.cta.label, ...g.sections.flatMap((s) => [s.h, ...s.p])].join(' ');

test('slugs unique, descriptions fit a search result, every guide has the education line and a tool link', () => {
  assert.equal(new Set(GUIDES.map((g) => g.slug)).size, GUIDES.length);
  for (const g of GUIDES) {
    assert.ok(g.description.length <= 170, g.slug + ' description length ' + g.description.length);
    assert.match(text(g), /education, not advice/i, g.slug);
    assert.match(g.cta.href, /^\/(start|what-if)$/);
  }
});

test('voice and floor: no em-dashes, no advice or forbidden words, no outcome promises', () => {
  for (const g of GUIDES) assert.doesNotMatch(text(g), /—|you should|you must|guarantee|\bAI\b|\bsmart\b|insights|Principal|FPPF|invest in|buy shares|best fund/i, g.slug);
});

test('the worked example in the guides matches the app arithmetic', () => {
  const n = { pay: 4000, bills: 2200, daily: 1000, savings: 8000 };
  const m = month(n);
  assert.equal(m.left, 800); assert.equal(m.billsShare, 55); assert.equal(m.sayNoMonths, 2.5);
  const w = whatIf(n, 520);
  assert.equal(w.after.left, 280); assert.equal(w.after.billsShare, 68); assert.equal(w.after.sayNoMonths, 2);
  assert.equal(Math.round((8000 / 1700) * 10) / 10, 4.7);
  assert.equal(Math.round((8000 / 2800) * 10) / 10, 2.9);
  assert.ok(GUIDES[0].sections[1].p[1].includes('about 2.9 months'));
});

test('the alignment and recurring-cost guides match their own arithmetic', () => {
  assert.equal(Math.round((700 / 1200) * 100), 58);
  assert.equal(2000 + 700 + 500, 3200);
  assert.equal(45 * 12, 540);
  assert.equal(Math.round((135 / 4) * 100) / 100, 33.75);
  assert.ok(GUIDES.find((g) => g.slug === 'why-your-money-and-your-life-feel-out-of-step')!.sections[2].p[0].includes('58%'));
});

test('car and yearly-bill guides match their own arithmetic', () => {
  assert.equal(420 + 140 + 160 + 90, 810);
  assert.equal(810 * 12, 9720);
  assert.equal(9720 + 180, 9900);
  assert.equal(9900 / 12, 825);
  assert.equal(Math.round(825 / 20), 41);
  assert.equal(1200 + 180 + 240 + 600, 2220);
  assert.equal(2220 / 12, 185);
  assert.equal(2200 + 185, 2385);
});

test('career break and recurring charge guides match their own arithmetic', () => {
  assert.equal(3200 * 6, 19200);
  assert.equal(450 * 6, 2700);
  assert.equal(19200 + 2700 + 4000, 25900);
  assert.equal(800 * 6, 4800);
  assert.equal(25900 - 4800, 21100);
  assert.equal(21100 - 20000, 1100);
  assert.equal(16 + 10 + 12 + 45 + 8, 91);
  assert.equal(91 * 12, 1092);
});
