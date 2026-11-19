import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site.ts';

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/angles', '/home'] }], sitemap: siteUrl() + '/sitemap.xml' };
}
