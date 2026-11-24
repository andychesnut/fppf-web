import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSiteUrl } from './site.ts';

test('site address always names www, because the bare domain redirects', () => {
  assert.equal(normalizeSiteUrl('https://firstprinciplesmoney.com'), 'https://www.firstprinciplesmoney.com');
  assert.equal(normalizeSiteUrl('https://firstprinciplesmoney.com/'), 'https://www.firstprinciplesmoney.com');
  assert.equal(normalizeSiteUrl('https://www.firstprinciplesmoney.com'), 'https://www.firstprinciplesmoney.com');
  assert.equal(normalizeSiteUrl(undefined), 'https://www.firstprinciplesmoney.com');
  assert.equal(normalizeSiteUrl('http://localhost:3000'), 'http://localhost:3000');
});
