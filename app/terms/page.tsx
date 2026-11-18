import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND, legalEntity } from '@/lib/site.ts';

export const metadata: Metadata = { title: 'Terms' };

export default function Page() {
  return (
    <main className="prose">
      <Link href="/">Back to home</Link>
      <h1>Terms</h1>
      <p className="muted small">Last updated November 17, 2026.</p>
      <p>{BRAND} is operated by {legalEntity()}. By using this site you agree to these terms.</p>
      <h2>Education, not advice</h2>
      <p>This site provides general education and a self-assessment. It is not investment, tax, legal, or accounting advice, and it is not a recommendation to buy or sell anything. It does not know your full situation. Talk to a qualified professional before making financial decisions.</p>
      <h2>No guarantees</h2>
      <p>Results are estimates built from the ranges you choose. We make no promise about any financial outcome.</p>
      <h2>Who can use it</h2>
      <p>Adults 18 and older.</p>
      <h2>The site</h2>
      <p>The site is provided as is. We may change or stop it at any time. To the extent the law allows, {legalEntity()} is not liable for losses that result from using it.</p>
      <h2>Privacy</h2>
      <p>See the <Link href="/privacy">privacy page</Link>.</p>
    </main>
  );
}
