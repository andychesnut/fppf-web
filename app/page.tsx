import Link from 'next/link';
import { Mark } from '@/components/Mark.tsx';
import { Footer } from '@/components/Footer.tsx';
import { Track } from '@/components/Track.tsx';
import { MiniPlan } from '@/components/MiniPlan.tsx';
import { BRAND, TAGLINE } from '@/lib/site.ts';

// One frame. The product is on the page, working, with example numbers the visitor can change.
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
            <p className="lede">A change like leaving a job costs money before it pays. Put in your numbers.</p>
          </div>
          <MiniPlan />
        </section>
      </main>
      <Footer />
    </>
  );
}
