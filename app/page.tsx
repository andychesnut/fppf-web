import Link from 'next/link';
import { Footer } from '@/components/Footer.tsx';
import { Track } from '@/components/Track.tsx';
import { StartButton } from '@/components/StartButton.tsx';
import { Maze } from '@/components/Maze.tsx';
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
          <p className="p-lede">You know something has to change. The bills still have to get paid. This shows you whether you can afford the change you want, and what&apos;s standing in the way.</p>
          <div className="p-cta"><StartButton /><span>It&apos;s free. About ten minutes.</span></div>
          <p className="p-trust">We never touch your money. Nobody pays us to recommend anything.</p>
        </div>
        <Maze />
      </main>
      <Footer />
    </>
  );
}
