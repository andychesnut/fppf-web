// Question bank and scoring for The Snapshot.
// Pure functions, no imports, so the rules are easy to test and to audit.
// Education and self-assessment only. Nothing here is personalized advice.

export type StageId = 'formation' | 'foundation' | 'framing' | 'fundamentals' | 'features' | 'freedom';
export type StageState = 'Solid' | 'Building' | 'Exposed';
export type Load = 'Light' | 'Moderate' | 'Heavy';

export type Option = {
  label: string;
  // For scored stages: 0 (weak evidence) to 2 (strong evidence).
  // For Formation: 0 (light load) to 2 (heavy load).
  points: number;
  // Only on the income-concentration question: share of income from the largest source.
  share?: number;
  // Only on the cash question: months of essential expenses held in cash. hi null = open ended.
  months?: [number, number | null];
};

export type Question = { id: string; stage: StageId; text: string; help?: string; options: Option[] };

export const STAGES: { id: StageId; n: number; name: string; blurb: string }[] = [
  { id: 'formation', n: 1, name: 'Your situation', blurb: 'Your structure: who depends on you, how many incomes, how much time is yours.' },
  { id: 'foundation', n: 2, name: 'How you handle hard things', blurb: 'Who you are when things fail: facing reality, community, adaptability, practical skills.' },
  { id: 'framing', n: 3, name: 'What your skills earn', blurb: 'What your skills are worth: income they can earn and costs they can remove.' },
  { id: 'fundamentals', n: 4, name: 'Money in and out', blurb: 'Income against expenses: surplus, fixed obligations, cash on hand, debt.' },
  { id: 'features', n: 5, name: 'Investing', blurb: 'Investing in the right order, and telling building apart from gambling.' },
  { id: 'freedom', n: 6, name: 'What matters to you', blurb: 'Money and time spent on what matters to you, funded from surplus and never from debt.' },
];

export const QUESTIONS: Question[] = [
  // Formation (load)
  { id: 'q1', stage: 'formation', text: "How many people depend on your household's income, not counting you?",
    options: [{ label: 'None', points: 0 }, { label: '1 to 2', points: 1 }, { label: '3 to 4', points: 2 }, { label: '5 or more', points: 2 }] },
  { id: 'q2', stage: 'formation', text: 'About how much of your household income comes from its single largest source?',
    options: [{ label: 'Nearly all of it', points: 2, share: 0.95 }, { label: 'Most of it', points: 1, share: 0.75 }, { label: 'About half', points: 0, share: 0.5 }, { label: 'Less than half', points: 0, share: 0.3 }] },
  { id: 'q3', stage: 'formation', text: 'After work and essential duties, how many hours a week are truly yours?',
    options: [{ label: 'Under 5', points: 2 }, { label: '5 to 10', points: 1 }, { label: '11 to 20', points: 0 }, { label: 'More than 20', points: 0 }] },
  { id: 'q4', stage: 'formation', text: 'How many big changes do you expect in the next 5 years?', help: 'For example: a new child, a move, caring for a parent, a job change.',
    options: [{ label: 'None', points: 0 }, { label: 'One', points: 1 }, { label: 'Two or more', points: 2 }] },

  // Foundation
  { id: 'q5', stage: 'foundation', text: 'The last time a hard money fact arrived, how long before you looked at it?', help: 'A bill, a statement, a notice.',
    options: [{ label: 'The same day', points: 2 }, { label: 'Within a week', points: 1 }, { label: 'Longer than a week', points: 0 }, { label: 'I still have not', points: 0 }] },
  { id: 'q6', stage: 'foundation', text: 'In the last 30 days, how many evenings went mostly to numbing out to avoid something?',
    options: [{ label: 'Almost none', points: 2 }, { label: 'A few', points: 1 }, { label: 'About half', points: 0 }, { label: 'Most', points: 0 }] },
  { id: 'q7', stage: 'foundation', text: 'How many people could you call tomorrow who would take your household in for a month?',
    options: [{ label: 'None', points: 0 }, { label: '1 to 2', points: 1 }, { label: '3 to 4', points: 2 }, { label: '5 or more', points: 2 }] },
  { id: 'q8', stage: 'foundation', text: 'In the last 12 months, how many of these did you do yourself?', help: 'Fixed a vehicle. Repaired your home. Grew food. Trained in first aid or self-defense.',
    options: [{ label: 'None', points: 0 }, { label: 'One', points: 1 }, { label: 'Two', points: 2 }, { label: 'Three or four', points: 2 }] },

  // Framing
  { id: 'q9', stage: 'framing', text: 'In the last 3 years, how many of your skills has someone other than your employer paid you for?',
    options: [{ label: 'None', points: 0 }, { label: 'One', points: 1 }, { label: 'Two or more', points: 2 }] },
  { id: 'q10', stage: 'framing', text: 'The last time you looked for work, how long did it take to land something?',
    options: [{ label: 'Under 3 months', points: 2 }, { label: '3 to 6 months', points: 1 }, { label: 'Longer than 6 months', points: 0 }, { label: 'I have not looked in 5 or more years', points: 0 }] },
  { id: 'q11', stage: 'framing', text: 'How many regular household jobs do you do yourself that many people pay for?', help: 'For example: repairs, cooking most meals, childcare, taxes, yard work.',
    options: [{ label: 'None or one', points: 0 }, { label: 'Two or three', points: 1 }, { label: 'Four or more', points: 2 }] },
  { id: 'q12', stage: 'framing', text: 'In the last downturn you worked through, what happened to demand for your main skill?',
    options: [{ label: 'It held or grew', points: 2 }, { label: 'It dipped, then recovered', points: 1 }, { label: 'It dropped hard', points: 0 }, { label: 'I have not worked through one', points: 1 }] },

  // Fundamentals
  { id: 'q13', stage: 'fundamentals', text: 'In the last 3 months, in how many did you spend less than you earned?',
    options: [{ label: 'All 3', points: 2 }, { label: '2', points: 1 }, { label: '1', points: 0 }, { label: 'None', points: 0 }] },
  { id: 'q14', stage: 'fundamentals', text: 'About what share of take-home pay goes to fixed obligations?', help: 'Housing, debt payments, insurance, childcare.',
    options: [{ label: 'Under 50%', points: 2 }, { label: '50 to 65%', points: 1 }, { label: '66 to 80%', points: 0 }, { label: 'Over 80%', points: 0 }] },
  { id: 'q15', stage: 'fundamentals', text: 'How many months of essential expenses do you hold in cash?', help: 'Count only money you could reach within a week.',
    options: [{ label: 'Less than 1 month', points: 0, months: [0, 1] }, { label: '1 to 2 months', points: 1, months: [1, 2] }, { label: '3 to 5 months', points: 1, months: [3, 5] }, { label: '6 to 11 months', points: 2, months: [6, 11] }, { label: '12 months or more', points: 2, months: [12, null] }] },
  { id: 'q16', stage: 'fundamentals', text: 'What is the highest interest rate on any debt you carry?',
    options: [{ label: 'I carry no debt', points: 2 }, { label: 'Under 7%', points: 2 }, { label: '7 to 15%', points: 1 }, { label: 'Over 15%', points: 0 }] },

  // Features
  { id: 'q17', stage: 'features', text: 'If your employer offers a retirement match, how much of it do you capture?',
    options: [{ label: 'All of it', points: 2 }, { label: 'Some of it', points: 1 }, { label: 'None of it', points: 0 }, { label: 'No match is offered, or I am self-employed', points: 1 }] },
  { id: 'q18', stage: 'features', text: 'Are you adding money to investments while carrying debt above about 7%?',
    options: [{ label: 'I carry no debt above 7%', points: 2 }, { label: 'No. I am paying that debt down first', points: 2 }, { label: 'Yes, some', points: 1 }, { label: 'Yes, regularly', points: 0 }] },
  { id: 'q19', stage: 'features', text: 'How many kinds of tax-advantaged account do you put money into?', help: 'For example: a 401(k), an IRA, an HSA.',
    options: [{ label: 'None', points: 0 }, { label: 'One', points: 1 }, { label: 'Two or more', points: 2 }] },
  { id: 'q20', stage: 'features', text: 'About what share of your investable money sits in speculation?', help: 'Day trading, crypto, options, betting markets.',
    options: [{ label: 'None', points: 2 }, { label: 'Under 10%', points: 2 }, { label: '10 to 25%', points: 1 }, { label: 'Over 25%', points: 0 }] },

  // Freedom
  { id: 'q21', stage: 'freedom', text: 'In the last 12 months, did you put money into something only because it mattered to you?',
    options: [{ label: 'Yes, and it came from surplus', points: 2 }, { label: 'Yes, but it strained the budget', points: 1 }, { label: 'No', points: 0 }] },
  { id: 'q22', stage: 'freedom', text: 'In the last 12 months, did you stay silent or go along with something at work because you could not afford the consequences?',
    options: [{ label: 'No', points: 2 }, { label: 'Once', points: 1 }, { label: 'More than once', points: 0 }] },
  { id: 'q23', stage: 'freedom', text: 'Where does the money for your riskier bets come from?',
    options: [{ label: 'Surplus only', points: 2 }, { label: 'I make none', points: 1 }, { label: 'Savings', points: 1 }, { label: 'Debt or credit', points: 0 }] },
  { id: 'q24', stage: 'freedom', text: 'If money were handled for one year, have you taken a step in the last 12 months toward what you would do?',
    options: [{ label: 'Yes, a real step', points: 2 }, { label: 'I have a plan but no step yet', points: 1 }, { label: 'No', points: 0 }, { label: 'I do not know what I would do', points: 0 }] },
];

export const NEXT_MOVES: Record<Exclude<StageId, 'formation'>, string[]> = {
  foundation: [
    'Open the one money document you have been avoiding, and read it today.',
    'Write down the names of the people you could call in a crisis. Call one this week.',
    'Pick one practical skill from the list and do it once this month.',
  ],
  framing: [
    'List every skill someone has paid you for, and what they paid.',
    'Ask one person outside your employer what they would pay for your best skill.',
    'Pick one household cost you pay others for and learn to do it yourself.',
  ],
  fundamentals: [
    'List every fixed obligation and what it costs each month.',
    'Find the highest interest rate you pay on any debt, and write it down.',
    'Set one more month of essential expenses as your next cash target.',
  ],
  features: [
    'Check whether your employer offers a retirement match and how much of it you capture.',
    'Write your accounts in order: match, high-interest debt, cash buffer, tax-advantaged, taxable. Mark where you are.',
    'Add up what share of your investable money is speculation, and name it as speculation.',
  ],
  freedom: [
    'Name the one thing you would do if money were handled for a year.',
    'Take the smallest real step toward it this month, paid from surplus.',
    'Write down the last time you stayed silent because of money, and what would have changed it.',
  ],
};

export type Answers = Record<string, number>; // question id -> option index

export type Result = {
  load: Load;
  loadPoints: number;
  map: Record<Exclude<StageId, 'formation'>, { points: number; state: StageState }>;
  yourStage: Exclude<StageId, 'formation'> | null; // null = every scored stage is Solid
  monthsOfNo: { text: string; math: string };
};

const SCORED: Exclude<StageId, 'formation'>[] = ['foundation', 'framing', 'fundamentals', 'features', 'freedom'];

export function stateFor(points: number): StageState {
  if (points >= 6) return 'Solid';
  if (points >= 3) return 'Building';
  return 'Exposed';
}

export function loadFor(points: number): Load {
  if (points >= 6) return 'Heavy';
  if (points >= 3) return 'Moderate';
  return 'Light';
}

function stagePoints(stage: StageId, answers: Answers): number {
  let sum = 0;
  for (const q of QUESTIONS) {
    if (q.stage !== stage) continue;
    const opt = q.options[answers[q.id]];
    if (!opt) throw new Error('Missing answer for ' + q.id);
    sum += opt.points;
  }
  return sum;
}

export function monthsOfNo(answers: Answers): { text: string; math: string } {
  const shareOpt = QUESTIONS.find((q) => q.id === 'q2')!.options[answers.q2];
  const cashOpt = QUESTIONS.find((q) => q.id === 'q15')!.options[answers.q15];
  if (!shareOpt?.share || !cashOpt?.months) throw new Error('Missing answer for q2 or q15');
  const share = shareOpt.share;
  const [lo, hi] = cashOpt.months;
  const adjLo = Math.floor(lo / share);
  const adjHi = hi === null ? null : Math.floor(hi / share);
  let text: string;
  if (adjHi === null) text = adjLo + ' or more';
  else if (adjLo === 0) text = 'Less than ' + Math.max(adjHi, 1);
  else if (adjLo === adjHi) text = String(adjLo);
  else text = adjLo + ' to ' + adjHi;
  const cashLabel = cashOpt.label.charAt(0).toLowerCase() + cashOpt.label.slice(1);
  const shareLabel = (shareOpt.label.charAt(0).toLowerCase() + shareOpt.label.slice(1)).replace(' of it', '');
  const pct = Math.round(share * 100);
  const math =
    'The math: you hold ' + cashLabel + ' of essential expenses in cash. Your largest income source is ' + shareLabel +
    ' of household income (we use ' + pct + '%). Losing it leaves a gap of about ' + pct +
    '% of your expenses each month, so your cash stretches to about ' + text.toLowerCase() +
    ' months. This assumes your other income continues and your expenses stay the same.';
  return { text, math };
}

export function score(answers: Answers): Result {
  const loadPoints = stagePoints('formation', answers);
  const map = {} as Result['map'];
  for (const s of SCORED) {
    const points = stagePoints(s, answers);
    map[s] = { points, state: stateFor(points) };
  }
  const yourStage =
    SCORED.find((s) => map[s].state === 'Exposed') ?? SCORED.find((s) => map[s].state === 'Building') ?? null;
  return { load: loadFor(loadPoints), loadPoints, map, yourStage, monthsOfNo: monthsOfNo(answers) };
}

export const PRICE_VARIANTS = [29, 49, 79] as const;

// Deterministic price variant from an anonymous id, so one visitor always sees one price.
export function priceVariantFor(anonId: string): number {
  let h = 0;
  for (let i = 0; i < anonId.length; i++) h = (h * 31 + anonId.charCodeAt(i)) >>> 0;
  return PRICE_VARIANTS[h % PRICE_VARIANTS.length];
}
