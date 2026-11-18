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
          <p className="lede">{BRAND} is a personal finance platform to help you get untrapped from the endless rat race by mapping what you want against what you have and how you spend.</p>
          <figure className="note">
            <figcaption className="tag">An example with made-up numbers</figcaption>
            <p className="quote">Leave my job and build furniture full time.</p>
            <dl className="sum">
              <div><dt>Take-home pay</dt><dd>$7,000</dd></div>
              <div><dt>Fixed commitments</dt><dd>$3,100</dd></div>
              <div><dt>Everyday costs</dt><dd>$2,300</dd></div>
              <div><dt>Everything else</dt><dd>$600</dd></div>
              <div><dt>Left for what I want</dt><dd>$1,000</dd></div>
              <div className="total"><dt>14% toward it. 5 months away.</dt><dd /></div>
            </dl>
            <p className="after">In October it was 9 months. The car loan ended.</p>
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
