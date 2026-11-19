import type { MetadataRoute } from 'next';
import { GUIDES } from '@/lib/guides.ts';
import { siteUrl } from '@/lib/site.ts';

export default function sitemap(): MetadataRoute.Sitemap {
  const u = siteUrl();
  const pages = ['', '/start', '/what-if', '/guides', '/privacy', '/terms'];
  return [...pages.map((p) => ({ url: u + p })), ...GUIDES.map((g) => ({ url: u + '/guides/' + g.slug }))];
}
