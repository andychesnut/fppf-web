import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isAutomated } from './traffic.ts';

test('crawlers and headless browsers are automated', () => {
  assert.equal(isAutomated('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'), true);
  assert.equal(isAutomated('Mozilla/5.0 (X11; Linux x86_64) HeadlessChrome/120.0 Safari/537.36'), true);
  assert.equal(isAutomated('curl/8.4.0'), true);
  assert.equal(isAutomated(''), true);
  assert.equal(isAutomated(null), true);
});

test('ordinary phone and desktop browsers are people', () => {
  assert.equal(isAutomated('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'), false);
  assert.equal(isAutomated('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'), false);
});
