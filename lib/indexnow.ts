import { GUIDES } from './guides.ts';

// IndexNow key. Public by design: it only proves we control the host.
export const INDEXNOW_KEY = 'a485540e9c769c7f3e60dcc629e22357';

export function indexNowUrls(base: string): string[] {
  const pages = ['', '/start', '/what-if', '/guides', '/offer', '/privacy', '/terms'];
  return [...pages.map((p) => base + p), ...GUIDES.map((g) => base + '/guides/' + g.slug)];
}

export function indexNowPayload(base: string) {
  const host = new URL(base).host;
  return { host, key: INDEXNOW_KEY, keyLocation: base + '/api/indexnow-key', urlList: indexNowUrls(base) };
}
