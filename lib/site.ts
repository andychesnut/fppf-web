// Site-wide constants and env-backed settings. No secrets are read on the client.
export const BRAND = 'First Principles Money';
export const TAGLINE = 'Put your money where your mind is.';
export const DISCLAIMER =
  'Education and self-assessment only. Not investment, tax, or legal advice. For adults 18 and older.';

export function siteUrl(): string {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
}
// The bare domain 308-redirects to www, so sitemap, robots and canonical addresses must name www.
export function normalizeSiteUrl(raw?: string | null): string {
  const base = (raw || 'https://www.firstprinciplesmoney.com').trim().replace(/\/$/, '');
  return base.replace(/^(https?:\/\/)firstprinciplesmoney\.com(?=$|[\/:])/i, '$1www.firstprinciplesmoney.com');
}
export function legalEntity(): string {
  return process.env.LEGAL_ENTITY_NAME || BRAND;
}
export function postalAddress(): string | null {
  return process.env.LEGAL_POSTAL_ADDRESS || null;
}
