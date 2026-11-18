import Link from 'next/link';
import { Mark } from '@/components/Mark.tsx';
import { Footer } from '@/components/Footer.tsx';
import { Track } from '@/components/Track.tsx';
import { StartButton } from '@/components/StartButton.tsx';
import { BRAND, TAGLINE } from '@/lib/site.ts';

// One frame: what we offer in a sentence, and an example of exactly what you get.
// The example's numbers are checked against the engine in lib/journey.test.ts.
export default function Home() {
  return (
    <>
      <Track name="landing_view" />
      <header className="wrap header">
        <Link href="/" className="brand"><Mark /><span>{BRAND}</span></Link>
      </header>
      <main>
        <section className="wrap hero one-frame">
          <div className="hero-copy">
            <h1>{TAGLINE}</h1>
            <p className="lede">Tell us what you want and what you have, including what a bank account never shows. See the distance in months, and what moves it.</p>
            <div className="cta-row">
              <StartButton />
              <span className="muted small">Free. Four minutes. Your answers stay in your browser.</span>
            </div>
          </div>
          <div className="card hero-card example">
            <span className="tag">Example. Not a real person.</span>
            <p className="quote">Leave my job and build furniture full time.</p>
            <div className="mon">
              <span className="num">5 months away</span>
              <p>4 months closer than in October. The car loan ended, so $400 more is left each month.</p>
            </div>
            <p className="small"><strong>Also counted:</strong> a truck and tools worth about $9,000, 2 people who would send work, and 3 who would take the family in.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
