// Site-wide constants and env-backed settings. No secrets are read on the client.
export const BRAND = 'First Principles Personal Finance';
export const TAGLINE = 'How long could you afford to try for the life you want?';
export const DISCLAIMER =
  'Education and self-assessment only. Not investment, tax, or legal advice. For adults 18 and older.';

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://firstprinciplesmoney.com').replace(/\/$/, '');
}
export function legalEntity(): string {
  return process.env.LEGAL_ENTITY_NAME || BRAND;
}
export function postalAddress(): string | null {
  return process.env.LEGAL_POSTAL_ADDRESS || null;
}
