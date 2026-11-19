// Onboarding questions, the first reading, and the "what if" arithmetic.
// Pure functions, no imports. Education and self-assessment only: nothing here tells anyone what to do.
// Eighteen of the original 24 Snapshot questions were kept in spirit; this first build uses fifteen, reworded.

export type Part = 'you' | 'situation' | 'money';
export type Q = { id: string; part: Part; text: string; help?: string; options: string[] };

export const QUESTIONS: Q[] = [
  // About you. Nothing here is scored.
  { id: 'a1', part: 'you', text: "Say you lost your job tomorrow. What's your gut reaction?", options: ['Panic', 'Relief', 'Honestly, both'] },
  { id: 'a2', part: 'you', text: 'Have you kept quiet at work this year because you needed the paycheck?', options: ['No', 'Once', 'More than once'] },
  { id: 'a3', part: 'you', text: "When a bill shows up that you don't want to see, how long before you open it?", options: ['Same day', 'Within a week', 'Longer than that', "There's one I still haven't opened"] },
  { id: 'a4', part: 'you', text: "If money were handled for a year, do you know what you'd do?", options: ["Yes, and I've started", "Yes, but I haven't started", 'Not yet'] },
  { id: 'a5', part: 'you', text: 'In the last year, did you spend money on something just because it mattered to you?', options: ['Yes, and I could afford it', 'Yes, but it was a stretch', 'No'] },
  // Your situation. Ranges only.
  { id: 's1', part: 'situation', text: 'How many people count on your income, besides you?', options: ['None', '1 or 2', '3 or 4', '5 or more'] },
  { id: 's2', part: 'situation', text: "How much of your household's income comes from one job?", options: ['Pretty much all of it', 'Most of it', 'About half', 'Less than half'] },
  { id: 's3', part: 'situation', text: 'After work and everything you have to do, how many hours a week are yours?', options: ['Under 5', '5 to 10', '11 to 20', 'More than 20'] },
  { id: 's4', part: 'situation', text: 'How many people would take your household in for a month?', options: ['None', '1 or 2', '3 or 4', '5 or more'] },
  { id: 's5', part: 'situation', text: 'In the last 3 years, has anyone besides your employer paid you for something you can do?', options: ['No', 'Once', 'More than once'] },
  { id: 's6', part: 'situation', text: 'Last time you looked for work, how long did it take?', options: ['Under 3 months', '3 to 6 months', 'Longer than 6 months', "I haven't looked in 5 years or more"] },
  // Your money. Ranges only.
  { id: 'm1', part: 'money', text: 'Of the last 3 months, how many ended with money left over?', options: ['All 3', '2', '1', 'None'] },
  { id: 'm2', part: 'money', text: "How much of your take-home pay goes to bills you can't skip?", help: 'Rent or mortgage, loans, insurance, childcare.', options: ['Under half', '50 to 65%', '66 to 80%', 'Over 80%'] },
  { id: 'm3', part: 'money', text: 'If the paychecks stopped, how many months could you cover?', options: ['Less than one', '1 or 2', '3 to 5', '6 to 11', 'A year or more'] },
  { id: 'm4', part: 'money', text: "What's the highest interest rate on any debt you have?", options: ['No debt', 'Under 7%', '7 to 15%', 'Over 15%'] },
];

export const PART_NAME: Record<Part, string> = { you: 'About you', situation: 'Your situation', money: 'Your money' };
export const partQuestions = (p: Part) => QUESTIONS.filter((q) => q.part === p);

export type Answers = Record<string, number>; // question id -> option index. A missing id means skipped.

// What the person told us in part one, said back plainly. One line per answered question.
const TOLD: Record<string, string[]> = {
  a1: ['Losing your job would mean panic.', 'Losing your job would be a relief.', 'Losing your job would be panic and relief at once.'],
  a2: ["You haven't had to keep quiet at work for the paycheck.", 'You kept quiet at work once this year because you needed the paycheck.', 'You kept quiet at work more than once this year because you needed the paycheck.'],
  a3: ['You open bad news the day it arrives.', 'Bad news waits a few days before you open it.', 'Bad news sits a while before you open it.', "There's something you still haven't opened."],
  a4: ["You know what you'd do with a year, and you've started.", "You know what you'd do with a year. You haven't started.", "You don't know yet what you'd do with a year."],
  a5: ['You spent on something that mattered, and you could afford it.', 'You spent on something that mattered, and it was a stretch.', "You didn't spend on anything just because it mattered to you."],
};
export function told(a: Answers): string[] {
  return Object.keys(TOLD).filter((id) => a[id] !== undefined && TOLD[id][a[id]]).map((id) => TOLD[id][a[id]]);
}

export type Item = { id: string; label: string; value: string };
export type Reading = {
  inTheWay: Item[];       // most pressing first
  goingForYou: string[];
  sayNo: string | null;   // how long savings would last, from the range answer
  quiet: string | null;   // 'once' | 'more than once' when the person kept quiet at work
  answered: number;       // situation and money questions answered
};

// Where the lines sit. These are common rules of thumb, not advice, and they are the GM's assumptions:
// under 3 months of savings, half or more of pay going to must-pay bills, most income from one job,
// one or no months with money left over, any debt above 15%.
const SAVINGS = ['less than a month', '1 or 2 months', '3 to 5 months', '6 to 11 months', 'a year or more'];
const BILLS = ['under half', '50 to 65%', '66 to 80%', 'over 80%'];

export function reading(a: Answers): Reading {
  const inTheWay: Item[] = [];
  const goingForYou: string[] = [];
  const has = (id: string) => a[id] !== undefined;

  if (has('m3')) {
    if (a.m3 <= 1) inTheWay.push({ id: 'savings', label: 'Your savings would last', value: SAVINGS[a.m3] });
    else goingForYou.push(a.m3 === 2 ? 'A few months of savings' : 'Six months or more of savings');
  }
  if (has('m2')) {
    if (a.m2 >= 1) inTheWay.push({ id: 'bills', label: "Bills you can't skip take", value: BILLS[a.m2] });
    else goingForYou.push('Bills take less than half your pay');
  }
  if (has('s2')) {
    if (a.s2 <= 1) inTheWay.push({ id: 'onejob', label: 'One job pays for', value: a.s2 === 0 ? 'pretty much everything' : 'most of it' });
    else goingForYou.push('More than one income');
  }
  if (has('m1')) {
    if (a.m1 >= 2) inTheWay.push({ id: 'leftover', label: 'Months with money left over', value: a.m1 === 2 ? '1 of the last 3' : 'none of the last 3' });
    else if (a.m1 === 0) goingForYou.push('Money left over every month');
  }
  if (has('m4')) {
    if (a.m4 === 3) inTheWay.push({ id: 'debt', label: 'Your priciest debt charges', value: 'over 15%' });
    else if (a.m4 <= 1) goingForYou.push('No expensive debt');
  }
  if (has('s5')) {
    if (a.s5 === 0) inTheWay.push({ id: 'skill', label: 'Paid for your skills outside your job', value: 'not yet' });
    else goingForYou.push('A skill people pay you for');
  }
  if (has('s4')) {
    if (a.s4 === 0) inTheWay.push({ id: 'people', label: "People who'd take you in", value: 'none yet' });
    else goingForYou.push("People who'd take you in");
  }
  const answered = QUESTIONS.filter((q) => q.part !== 'you' && has(q.id)).length;
  return { inTheWay, goingForYou, sayNo: has('m3') ? SAVINGS[a.m3] : null, quiet: a.a2 === 1 ? 'once' : a.a2 === 2 ? 'more than once' : null, answered };
}

// Exact numbers are optional. They stay on the person's device.
export type Numbers = { pay: number; bills: number; daily: number; savings: number };
export type Month = { left: number; billsShare: number; sayNoMonths: number | null };

export function month(n: Numbers): Month {
  for (const [k, v] of Object.entries(n)) if (!Number.isFinite(v) || v < 0) throw new Error('Invalid number: ' + k);
  const out = n.bills + n.daily;
  return {
    left: n.pay - out,
    billsShare: n.pay > 0 ? Math.round((n.bills / n.pay) * 100) : 0,
    sayNoMonths: out > 0 ? Math.floor((n.savings / out) * 2) / 2 : null, // rounded down to the half month
  };
}

// A new monthly payment, added to the bills you can't skip. Arithmetic only.
export function whatIf(n: Numbers, payment: number): { before: Month; after: Month } {
  if (!Number.isFinite(payment) || payment < 0) throw new Error('Invalid payment');
  return { before: month(n), after: month({ ...n, bills: n.bills + payment }) };
}

export function monthsText(m: number | null): string {
  if (m === null) return 'as long as you like';
  if (m < 0.5) return 'less than a month';
  const whole = Math.floor(m);
  const half = m - whole >= 0.5;
  if (whole === 0) return 'half a month';
  return whole + (half ? '½' : '') + (whole === 1 && !half ? ' month' : ' months');
}

// When the person has given exact numbers, those replace the rough ranges for savings and bills.
// Same lines as above: under 3 months of savings, half or more of pay going to must-pay bills.
export function sharpen(r: Reading, n: Numbers): Reading {
  const m = month(n);
  const inTheWay = r.inTheWay.filter((x) => x.id !== 'savings' && x.id !== 'bills');
  const goingForYou = r.goingForYou.filter((x) => !/of savings$/.test(x) && x !== 'Bills take less than half your pay');
  const first: Item[] = [];
  if (m.sayNoMonths !== null && m.sayNoMonths < 3) first.push({ id: 'savings', label: 'Your savings would last', value: monthsText(m.sayNoMonths) });
  else goingForYou.unshift(m.sayNoMonths !== null && m.sayNoMonths < 6 ? 'A few months of savings' : 'Six months or more of savings');
  if (m.billsShare >= 50) first.push({ id: 'bills', label: "Bills you can't skip take", value: m.billsShare + '% of your pay' });
  else goingForYou.push('Bills take less than half your pay');
  return { ...r, inTheWay: [...first, ...inTheWay], goingForYou, sayNo: monthsText(m.sayNoMonths) };
}
