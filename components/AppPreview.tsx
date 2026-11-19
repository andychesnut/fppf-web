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

// The same example month, a few months on, if what is left each month goes to savings. Arithmetic on made-up numbers, not a forecast.
export function Future() {
  const steps = [0, 6, 12].map((k) => ({ k, m: month({ ...N, savings: N.savings + k * month(N).left }) }));
  return (
    <section className="wrap p-future" aria-labelledby="p-future-h">
      <h2 id="p-future-h">And where it could go</h2>
      <p className="p-future-sub">The same example month, if the {money(month(N).left)} left each month goes to savings and nothing else changes.</p>
      <ol className="p-steps">
        {steps.map((x) => (
          <li key={x.k}><span>{x.k === 0 ? 'Today' : x.k + ' months on'}</span><strong>{monthsText(x.m.sayNoMonths)}</strong><em>you could say no for</em></li>
        ))}
      </ol>
      <p className="p-trust">An example with made-up numbers, not a forecast. Yours will be different.</p>
    </section>
  );
}

// Facts a visitor can check on this site. No testimonials and no numbers we do not have.
export function Proof() {
  const facts: [string, string][] = [
    ['Your answers stay on your device', 'Nothing you type is sent to us. The privacy page says exactly what is.'],
    ['No account, no email', 'You can use all of it without giving either.'],
    ['Every number is plain arithmetic', 'Savings divided by what you spend. Bills divided by your pay. You can check each one by hand.'],
    ['Nobody pays us to recommend anything', 'We never touch your money, and we never name a product to buy.'],
  ];
  return (
    <section className="wrap p-proof" aria-labelledby="p-proof-h">
      <h2 id="p-proof-h">Why you can trust it</h2>
      <div className="p-facts">{facts.map(([h, t]) => <div key={h}><strong>{h}</strong><p>{t}</p></div>)}</div>
      <Link href="/start" className="a-btn">See where you stand</Link>
      <p className="p-trust">Education and self-assessment only, not advice. What you do is your call.</p>
    </section>
  );
}
