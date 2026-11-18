import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND, legalEntity, postalAddress } from '@/lib/site.ts';

export const metadata: Metadata = { title: 'Privacy' };

export default function Page() {
  const address = postalAddress();
  return (
    <main className="prose">
      <Link href="/">Back to home</Link>
      <h1>Privacy</h1>
      <p className="muted small">Last updated November 18, 2026.</p>
      <p>{BRAND} is operated by {legalEntity()}{address ? ', ' + address : ''}. This page says what we collect and what we do with it.</p>
      <h2>What we collect</h2>
      <ul className="list">
        <li><strong>Your snapshot answers.</strong> They are scored in your browser. If you save your map, they are sent once to be scored again and are then discarded. We do not store individual answers.</li>
        <li><strong>Your saved result,</strong> only if you ask us to save it: your email address, the state of each stage, your structure load, and your runway range in months.</li>
        <li><strong>The way-out planner.</strong> The numbers and the sentence you type are used in your browser only. They are never sent to us and never stored.</li>
        <li><strong>Anonymous usage counts:</strong> which step of the snapshot was reached, whether the planner was opened or changed, your yes or no to its two feedback questions, and whether a button was tapped, tied to a random identifier kept in your browser. They hold no email and no answers.</li>
      </ul>
      <h2>What we never collect</h2>
      <p>Account balances, account numbers, Social Security numbers, or passwords.</p>
      <h2>How we use it</h2>
      <p>To show and email your result, to tell you when something you asked about opens, and to learn which parts of the snapshot work. We do not sell personal information.</p>
      <h2>Who processes it for us</h2>
      <p>Hosting and database providers, an email delivery provider, and Google Fonts, which serves the typefaces and receives your IP address when the page loads.</p>
      <h2>Your choices</h2>
      <p>You can <Link href="/delete">delete your saved result</Link> at any time. You can clear the random identifier by clearing this site&apos;s data in your browser.</p>
      <h2>Age</h2>
      <p>This site is for adults 18 and older.</p>
    </main>
  );
}
