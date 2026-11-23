// The demand test: a labelled launch price and a waitlist. Nothing is charged.
export const OFFER_PRICE = 49;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type WaitlistInput = { email?: unknown; adult?: unknown };

// Returns the cleaned email, or an error message in plain words.
export function checkWaitlist(b: WaitlistInput): { ok: true; email: string } | { ok: false; error: string } {
  const email = typeof b.email === 'string' ? b.email.trim().toLowerCase() : '';
  if (!EMAIL.test(email) || email.length > 200) return { ok: false, error: 'Enter a valid email address.' };
  if (b.adult !== true) return { ok: false, error: 'You must be 18 or older.' };
  return { ok: true, email };
}
