import test from 'node:test';
import assert from 'node:assert/strict';
import { indexNowPayload, INDEXNOW_KEY } from './indexnow.ts';

test('indexnow payload lists every guide on the right host', () => {
  const p = indexNowPayload('https://www.example.com');
  assert.equal(p.host, 'www.example.com');
  assert.equal(p.key, INDEXNOW_KEY);
  assert.match(INDEXNOW_KEY, /^[0-9a-f]{32}$/);
  assert.ok(p.urlList.length >= 8);
  assert.ok(p.urlList.every((u) => u.startsWith('https://www.example.com')));
  assert.equal(new Set(p.urlList).size, p.urlList.length);
});
