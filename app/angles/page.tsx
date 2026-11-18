import type { Metadata } from 'next';
import Link from 'next/link';

// Internal comparison page for choosing a brand angle. Not linked and not indexed.
export const metadata: Metadata = { title: 'Brand angles', robots: { index: false, follow: false } };

const ANGLES = [
  {
    id: 'A', name: 'Alignment',
    h: 'Put your money where your mind is.',
    p: 'Say what you want. First Principles Money maps it against what you have and how you spend, and shows you how closely they line up.',
    rows: [['Take-home pay', '$7,000'], ['Fixed commitments', '$3,100'], ['Everyday costs', '$2,300'], ['Everything else', '$600'], ['Left for what I want', '$1,000']],
    total: '14% of my pay goes where my mind is.',
    them: 'They show where your money went. This shows whether it went where you meant it to.',
  },
  {
    id: 'B', name: 'Everything you have',
    h: 'Your bank only knows about your money.',
    p: 'You also have things you own, work you can do, and people who would back you. First Principles Money counts all of it against the life you want.',
    rows: [['Savings', '$22,000'], ['Truck and tools, owned outright', '$9,000'], ['A trade licence', '1'], ['People who would send work', '2'], ['People who would take the family in', '3']],
    total: 'More than the $22,000 a bank can see.',
    them: 'Their promise is every account in one place. This starts where accounts stop.',
  },
  {
    id: 'C', name: 'Reason it through',
    h: 'Start with what you want. Work backwards.',
    p: 'Most money tools start with a budget. First Principles Money starts with the life you want and reasons back to what has to be true, with every step shown.',
    rows: [['Build furniture full time', ''], ['costs, each month', '$5,000'], ['so it needs behind it', '$27,000'], ['of which I have', '$22,000'], ['and I keep, each month', '$1,000']],
    total: 'So it is 5 months away.',
    them: 'They give you charts. This gives you the reasoning, and you can check it.',
  },
  {
    id: 'D', name: 'Leave the race',
    h: 'Other apps help you run the rat race more efficiently.',
    p: 'First Principles Money helps you get untrapped from it, by mapping what you want against what you have and how you spend.',
    rows: [['In August', '14 months away'], ['In October', '9 months away'], ['Today', '5 months away']],
    total: 'The car loan ended. The first two orders came in.',
    them: 'It names what the others are for: a tidier version of the life you already have.',
  },
];

export default function Page() {
  return (
    <main className="wrap" style={{ paddingTop: 32, paddingBottom: 64, display: 'flex', flexDirection: 'column', gap: 72 }}>
      <p className="tag">Four brand angles, same product. For internal comparison. <Link href="/">Current home page</Link></p>
      {ANGLES.map((a) => (
        <section key={a.id} className="home" style={{ minHeight: 0, padding: 0 }}>
          <span className="tag">{a.id}. {a.name}</span>
          <h1>{a.h}</h1>
          <p className="lede">{a.p}</p>
          <figure className="note">
            <figcaption className="tag">An example with made-up numbers</figcaption>
            <dl className="sum">
              {a.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              <div className="total"><dt>{a.total}</dt><dd /></div>
            </dl>
          </figure>
          <p className="small muted">Against the others: {a.them}</p>
        </section>
      ))}
    </main>
  );
}
