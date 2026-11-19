import Link from 'next/link';
import { Footer } from '@/components/Footer.tsx';
import { Track } from '@/components/Track.tsx';
import { StartButton } from '@/components/StartButton.tsx';
import { Maze } from '@/components/Maze.tsx';
import { AppPreview, Future, Proof } from '@/components/AppPreview.tsx';
import { BRAND, TAGLINE } from '@/lib/site.ts';

// The headline is the Principal's. The picture shows the idea. One button.
export default function Home() {
  return (
    <>
      <Track name="landing_view" />
      <header className="wrap p-header"><Link href="/" className="a-brand">{BRAND}</Link></header>
      <main className="wrap p-hero">
        <div className="p-copy">
          <h1>{TAGLINE}</h1>
          <p className="p-lede"><strong>A free app that shows how many months you could go without a paycheck, what&apos;s eating your pay, and what a new payment would do.</strong> So you decide on the numbers, not a guess.</p>
          <ul className="p-gets">
            <li>How many months your savings would cover if the paychecks stopped</li>
            <li>What eats your pay before the month even starts</li>
            <li>What a new payment would do to your month, before you sign</li>
          </ul>
          <div className="p-cta"><StartButton /><span>Free. 15 questions, about ten minutes. No email, no account.</span></div>
        </div>
        <Maze />
      </main>
      <AppPreview />
      <Future />
      <Proof />
      <Footer />
    </>
  );
}
