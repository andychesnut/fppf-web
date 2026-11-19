import Link from 'next/link';
import { month, monthsText, whatIf } from '@/lib/onboarding.ts';

// A picture of the real Home screen on made-up numbers, drawn with the same arithmetic the app uses.
const N = { pay: 4000, bills: 2200, daily: 1000, savings: 8000 };
const money = (n: number) => '$' + Math.abs(Math.round(n)).toLocaleString('en-US');

export function AppPreview() {
  const m = month(N);
  const w = whatIf(N, 520);
  const pct = (v: number) => Math.max(0, Math.min(100, (v / N.pay) * 100)) + '%';
  return (
    <section className="wrap p-app" aria-labelledby="p-app-h">
      <div className="p-phone" aria-hidden="true">
        <div className="p-screen">
          <div className="a-dark">
            <span className="a-label">You said you want</span>
            <p className="a-want">To leave my job and try something new</p>
            <p className="a-big"><span>You could say no for</span><strong>{monthsText(m.sayNoMonths)}</strong></p>
          </div>
          <div className="a-card">
            <div className="a-cardhead"><h3>This month</h3></div>
            <div className="a-three">
              <div><span>Money in</span><strong>{money(N.pay)}</strong></div>
              <div><span>Money out</span><strong>{money(N.bills + N.daily)}</strong></div>
              <div><span>Left</span><strong className="a-live">{money(m.left)}</strong></div>
            </div>
            <div className="a-split"><span style={{ width: pct(N.bills) }} className="s1" /><span style={{ width: pct(N.daily) }} className="s2" /><span style={{ width: pct(m.left) }} className="s3" /></div>
            <div className="a-legend"><span><i className="s1" />Bills you can&apos;t skip {m.billsShare}%</span><span><i className="s2" />Everything else</span><span><i className="s3" />Left</span></div>
          </div>
          <div className="a-card">
            <div className="a-cardhead"><h3>What if you took on $520 a month?</h3></div>
            <div className="a-three">
              <div><span>Left</span><strong className="a-live">{money(w.after.left)}</strong></div>
              <div><span>Bills take</span><strong>{w.after.billsShare}%</strong></div>
              <div><span>Savings last</span><strong>{monthsText(w.after.sayNoMonths)}</strong></div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-app-copy">
        <h2 id="p-app-h">It works like an app, and it stays on your device.</h2>
        <p>Answer the questions once. You get a home screen like this one, with your own numbers. Come back any time, change a number, and see what moved.</p>
        <p className="p-trust">The screen shown is an example with made-up numbers.</p>
        <Link href="/start" className="a-btn">See where you stand</Link>
      </div>
    </section>
  );
}
