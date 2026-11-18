import Link from 'next/link';
import { Mark } from '@/components/Mark.tsx';
import { Footer } from '@/components/Footer.tsx';
import { Track } from '@/components/Track.tsx';
import { StartButton } from '@/components/StartButton.tsx';
import { BRAND, TAGLINE } from '@/lib/site.ts';

// One frame, one column: the question, what you do, a worked example, one button.
// The example's numbers are checked against the engine in lib/journey.test.ts.
export default function Home() {
  return (
    <>
      <Track name="landing_view" />
      <header className="wrap header">
        <Link href="/" className="brand"><Mark size={22} /><span>{BRAND}</span></Link>
      </header>
      <main className="wrap">
        <section className="home">
          <h1>{TAGLINE}</h1>
          <p className="lede">Answer eight questions about what you want and what you have. You get an answer in months, with the sum written out.</p>
          <figure className="note">
            <figcaption className="tag">An example with made-up numbers</figcaption>
            <p className="quote">Leave my job and build furniture full time.</p>
            <dl className="sum">
              <div><dt>Savings the plan needs</dt><dd>$27,000</dd></div>
              <div><dt>Savings today</dt><dd>$22,000</dd></div>
              <div><dt>Kept each month</dt><dd>$1,000</dd></div>
              <div className="total"><dt>5 months away</dt><dd /></div>
            </dl>
            <p className="after">In October it was 9 months. The car loan ended. Not in the bank: a truck and tools, two people who would send work, three who would take the family in.</p>
          </figure>
          <div className="cta-row">
            <StartButton />
            <span className="muted small">Free. Your answers stay in your browser.</span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
