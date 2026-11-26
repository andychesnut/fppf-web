import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GUIDES, bySlug, relatedGuides } from '@/lib/guides.ts';
import { BRAND, DISCLAIMER, siteUrl } from '@/lib/site.ts';

export const dynamicParams = false;
export function generateStaticParams() { return GUIDES.map((g) => ({ slug: g.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = bySlug((await params).slug);
  if (!g) return {};
  return { title: g.title, description: g.description, alternates: { canonical: '/guides/' + g.slug }, openGraph: { title: g.title, description: g.description, type: 'article' } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const g = bySlug((await params).slug);
  if (!g) notFound();
  const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.description, mainEntityOfPage: siteUrl() + '/guides/' + g.slug, publisher: { '@type': 'Organization', name: BRAND } };
  return (
    <main className="prose">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Link href="/guides">All guides</Link>
      <h1>{g.title}</h1>
      <p>{g.intro}</p>
      {g.sections.map((s) => (
        <section key={s.h}><h2>{s.h}</h2>{s.p.map((t) => <p key={t}>{t}</p>)}</section>
      ))}
      <p>{g.cta.text}</p>
      <p><Link href={g.cta.href} className="a-btn">{g.cta.label}</Link></p>
      <h2>More guides</h2>
      <ul>{relatedGuides(g.slug).map((r) => <li key={r.slug}><Link href={'/guides/' + r.slug}>{r.title}</Link></li>)}</ul>
      <p className="small">Planning a monthly check? <Link href="/offer">See the planned monthly review</Link>.</p>
      <p className="muted small">{DISCLAIMER}</p>
    </main>
  );
}
