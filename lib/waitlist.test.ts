import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkWaitlist } from './waitlist.ts';

test('accepts a valid adult email and lowercases it', () => {
  assert.deepEqual(checkWaitlist({ email: '  A@B.co ', adult: true }), { ok: true, email: 'a@b.co' });
});
test('rejects bad email, missing adult, non-strings', () => {
  assert.equal(checkWaitlist({ email: 'nope', adult: true }).ok, false);
  assert.equal(checkWaitlist({ email: 'a@b.co', adult: false }).ok, false);
  assert.equal(checkWaitlist({ email: 5, adult: true }).ok, false);
  assert.equal(checkWaitlist({ email: 'a@b.co' + 'x'.repeat(250), adult: true }).ok, false);
});
