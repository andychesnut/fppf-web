import Link from 'next/link';
import { Mark } from '@/components/Mark.tsx';
import { Stack } from '@/components/Stack.tsx';
import { Footer } from '@/components/Footer.tsx';
import { Track } from '@/components/Track.tsx';
import { BRAND, TAGLINE } from '@/lib/site.ts';
import { STAGES } from '@/lib/snapshot.ts';

export default function Home() {
  return (
    <>
      <Track name="landing_view" />
      <header className="wrap header">
        <Link href="/" className="brand"><Mark /><span>{BRAND}</span></Link>
        <Link href="/snapshot" className="btn btn-ghost btn-small">Take the snapshot</Link>
      </header>
      <main>
        <section className="wrap hero">
          <div className="hero-copy">
            <h1>{TAGLINE}</h1>
            <p className="lede">A 6-minute self-assessment that shows where you stand across six stages of financial health, and where your next move is.</p>
            <div className="cta-row">
              <Link href="/snapshot" className="btn">Start the free snapshot</Link>
              <span className="muted small">Free. No login. No account numbers.</span>
            </div>
            <p className="muted small">Education and self-assessment. Not financial advice.</p>
          </div>
          <div className="card hero-card">
            <div className="card-head"><h2>Your six-stage map</h2><span className="tag">Sample result</span></div>
            <Stack load="Moderate" yours="fundamentals" map={{ foundation: 'Solid', framing: 'Building', fundamentals: 'Exposed', features: 'Building', freedom: 'Exposed' }} />
            <p className="muted small">Each stage rests on the one below it. Your next move is at the lowest stage that is exposed.</p>
          </div>
        </section>
        <section className="band">
          <div className="wrap">
            <h2>A credit score measures how good a debtor you are. This measures how free you are.</h2>
            <p>Most people are not broke. They are trapped: a decent income, and obligations that grew to meet it. The snapshot shows how much of your life depends on one paycheck, and what to work on first.</p>
          </div>
        </section>
        <section className="wrap section">
          <h2>The six stages, in order</h2>
          <div className="grid">
            {STAGES.map((s) => (
              <div key={s.id} className="stage-card"><h3>{s.n} {s.name}</h3><span>{s.blurb}</span></div>
            ))}
          </div>
        </section>
        <section className="wash">
          <div className="wrap section two" style={{ flexDirection: 'row' }}>
            <div>
              <h2>What you get in 6 minutes</h2>
              <ol className="list">
                <li><strong>Your map.</strong> Each stage reads Solid, Building, or Exposed.</li>
                <li><strong>Your stage.</strong> The lowest exposed stage, where your next move is.</li>
                <li><strong>Your Months of No.</strong> How long your household could go without its main paycheck, with the math shown.</li>
                <li><strong>Three next moves.</strong> Plain steps for your stage.</li>
              </ol>
            </div>
            <div>
              <h2>How we handle your answers</h2>
              <ul className="list">
                <li>You answer in ranges. We never ask for a balance, an account number, or a Social Security number.</li>
                <li>Questions ask what you did, not how you rate yourself.</li>
                <li>No email needed to see your result. Give one only if you want it saved.</li>
                <li>We store your result, never your individual answers. Delete it any time.</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="wrap section" style={{ alignItems: 'flex-start', gap: 20 }}>
          <h2>See where you stand</h2>
          <Link href="/snapshot" className="btn">Start the free snapshot</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
