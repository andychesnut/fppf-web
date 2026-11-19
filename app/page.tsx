import Link from 'next/link';
import { Footer } from '@/components/Footer.tsx';
import { Track } from '@/components/Track.tsx';
import { StartButton } from '@/components/StartButton.tsx';
import { Maze } from '@/components/Maze.tsx';
import { AppPreview, Proof } from '@/components/AppPreview.tsx';
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
          <p className="p-lede"><strong>A free app that shows where your money and your mind don&apos;t line up.</strong> You say what matters most to you and where your money goes, and it shows you the gap.</p>
          <ul className="p-gets">
            <li>What matters most to you, next to where your money actually goes</li>
            <li>Where the two don&apos;t line up</li>
            <li>How long you could go without a paycheck, and what a new payment would do</li>
          </ul>
          <div className="p-cta"><StartButton /><span>Free. 15 questions, about ten minutes. No email, no account.</span></div>
        </div>
        <Maze />
      </main>
      <AppPreview />
      <Proof />
      <Footer />
    </>
  );
}
