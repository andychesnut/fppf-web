import Link from 'next/link';
import { Mark } from '@/components/Mark.tsx';
import { Footer } from '@/components/Footer.tsx';
import { Track } from '@/components/Track.tsx';
import { WantBox } from '@/components/WantBox.tsx';
import { BRAND, TAGLINE } from '@/lib/site.ts';

// One frame: the question nobody asks, a place to answer it, and what you get for answering.
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
            <WantBox />
          </div>
          <div className="card hero-card example">
            <span className="tag">Example plan. Not a real person.</span>
            <p className="quote">I want to leave my job and build furniture full time.</p>
            <p>It would cost me $5,000 a month to live. I think I can earn $2,000 a month while I get going, and I&apos;m willing to put $27,000 of savings into it.</p>
            <p><strong>That gives me 9 months.</strong> If I&apos;ve spent half and the orders aren&apos;t coming, I&apos;ll know early. If I reach $27,000, I stop, and I still have two months of costs set aside.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
