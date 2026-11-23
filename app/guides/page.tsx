import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '@/lib/guides.ts';

export const metadata: Metadata = { title: 'Guides', description: 'Plain answers to the money questions people ask when they feel stuck, with worked sums.', alternates: { canonical: '/guides' } };

export default function Page() {
  return (
    <main className="prose">
      <Link href="/">Back to home</Link>
      <h1>Guides</h1>
      <p>Plain answers to questions people ask when the bills keep coming and something has to change. Each one has a worked sum on made-up numbers.</p>
      <ul className="list">
        {GUIDES.map((g) => <li key={g.slug}><Link href={'/guides/' + g.slug}><strong>{g.title}</strong></Link><br />{g.description}</li>)}
      </ul>
      <p>Want a monthly check on where your money and your mind line up? <Link href="/offer">See the planned monthly review</Link>.</p>
      <p className="muted small">Education and self-assessment only. Not investment, tax, or legal advice.</p>
    </main>
  );
}
