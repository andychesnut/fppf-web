import Link from 'next/link';
import { Mark } from '@/components/Mark.tsx';
import { Footer } from '@/components/Footer.tsx';
import { Track } from '@/components/Track.tsx';
import { BRAND } from '@/lib/site.ts';
import { STAGES } from '@/lib/snapshot.ts';

export default function Home() {
  return (
    <>
      <Track name="landing_view" />
      <header className="wrap header">
        <Link href="/" className="brand"><Mark /><span>{BRAND}</span></Link>
        <Link href="/journey" className="btn btn-ghost btn-small">Plan a way out</Link>
      </header>
      <main>
        <section className="wrap hero">
          <div className="hero-copy">
            <h1>Not broke. Trapped.</h1>
            <p className="lede">A decent income, and obligations that grew to meet it. Say what you want instead, set the most you are willing to risk, and see whether your plan holds.</p>
            <div className="cta-row">
              <Link href="/journey" className="btn">Plan a way out</Link>
              <Link href="/snapshot" className="btn btn-ghost">See where you stand first</Link>
            </div>
            <p className="muted small">Free. No login. Nothing you type in the planner is stored. Education and self-assessment, not financial advice.</p>
          </div>
          <div className="card hero-card">
            <div className="card-head"><h2>Leave my job and work for myself</h2><span className="tag">Sample plan</span></div>
            <ul className="list">
              <li><strong>Boundary: $27,000.</strong> The most this person will spend. It lasts 9 months.</li>
              <li><strong>Expected: 6 months, $18,000.</strong> Uses 67% of the boundary.</li>
              <li><strong>Slow: 9 months, $27,000.</strong> Still inside the boundary.</li>
              <li><strong>Look at this.</strong> Only 2 months of costs would remain untouched.</li>
            </ul>
            <p className="muted small">An example with made-up numbers. Scenarios are hypothetical, not predictions.</p>
          </div>
        </section>
        <section className="band">
          <div className="wrap">
            <h2>The trap is not the job. It is that leaving looks bottomless.</h2>
            <p>Most changes worth making cost something first: lower pay, a gap, savings drawn down. When that cost has no limit, staying put is the only safe choice. Give it a limit, checkpoints, and a decision made in advance, and it becomes a bet you can afford to make or to decline.</p>
          </div>
        </section>
        <section className="wash">
          <div className="wrap section two" style={{ flexDirection: 'row' }}>
            <div>
              <h2>How the planner works</h2>
              <ol className="list">
                <li><strong>Name what you want.</strong> One sentence, and what that life costs a month.</li>
                <li><strong>Set your boundary.</strong> The most cash you are willing to spend getting there.</li>
                <li><strong>See three ways it could go.</strong> Fast, expected, and slow, from your own numbers.</li>
                <li><strong>Get your checkpoints.</strong> When to look up, and when the bet is over.</li>
                <li><strong>Check it against sound principles.</strong> Funded from savings, never from debt. Essentials kept out of the bet.</li>
              </ol>
            </div>
            <div>
              <h2>How we handle what you type</h2>
              <ul className="list">
                <li>The planner runs in your browser. Your numbers are never sent to us.</li>
                <li>The snapshot asks in ranges. We never ask for an account number or a Social Security number.</li>
                <li>No email needed for either. Give one only if you want a snapshot result saved.</li>
                <li>We do not tell you what to do. You set the assumptions and you make the call.</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="wrap section">
          <h2>The principles underneath: six stages, in order</h2>
          <div className="grid">
            {STAGES.map((s) => (
              <div key={s.id} className="stage-card"><h3>{s.n} {s.name}</h3><span>{s.blurb}</span></div>
            ))}
          </div>
        </section>
        <section className="wash">
          <div className="wrap section two" style={{ flexDirection: 'row' }}>
            <div>
              <h2>Not ready to plan? See where you stand.</h2>
              <ol className="list">
                <li><strong>Your map.</strong> Each stage reads Solid, Building, or Exposed.</li>
                <li><strong>Your stage.</strong> The lowest exposed stage, where your next move is.</li>
                <li><strong>Your runway.</strong> How long your household could go without its main paycheck, with the math shown.</li>
                <li><strong>Three next moves.</strong> Plain steps for your stage.</li>
              </ol>
            </div>
            <div>
              <h2>24 questions. About 6 minutes.</h2>
              <ul className="list">
                <li>Questions ask what you did, not how you rate yourself.</li>
                <li>You see your result without giving an email.</li>
                <li>We store your result only if you ask, never your individual answers. Delete it any time.</li>
              </ul>
              <Link href="/snapshot" className="btn btn-ghost">Start the free snapshot</Link>
            </div>
          </div>
        </section>
        <section className="wrap section" style={{ alignItems: 'flex-start', gap: 20 }}>
          <h2>Put a limit on the cost of changing your life.</h2>
          <Link href="/journey" className="btn">Plan a way out</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
