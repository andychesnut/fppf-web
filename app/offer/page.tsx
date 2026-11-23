import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer.tsx';
import { Offer } from './Offer.tsx';

export const metadata: Metadata = {
  title: 'The monthly money and mind review',
  description: 'A planned monthly review that shows where your money and what matters to you do not line up. Join the waitlist. Nothing is charged.',
  alternates: { canonical: '/offer' },
};

export default function Page() {
  return (
    <>
      <main className="prose">
        <Link href="/">Back to home</Link>
        <h1>The monthly money and mind review</h1>
        <p><strong>Once a month, ten minutes: see where your money and what matters to you line up, and where they do not.</strong> You go through your biggest costs, newest first, and answer one question for each: would you choose this again today?</p>
        <ul className="list">
          <li>A share you can check: spending you would choose again, month by month.</li>
          <li>The few big costs that pull away from what you care about, in your own words.</li>
          <li>What is already right, so the good part gets said out loud.</li>
        </ul>
        <p>The free version is live now. <Link href="/start">Try it first</Link>. The monthly review is not built yet, and this page is how we find out whether it is worth building.</p>
        <Offer />
        <p className="muted small">Education and self-assessment only. Not investment, tax, or legal advice. For adults 18 and older. No outcome is promised.</p>
      </main>
      <Footer />
    </>
  );
}
