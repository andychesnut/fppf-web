// Decides whether an event came from a crawler or automated browser.
// Such events are dropped so funnel metrics count people only.
const BOT = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|fetch|curl|wget|python|node|axios|go-http|java\/|httpclient|monitor|uptime|facebookexternalhit|embedly|whatsapp|telegram|discord|slack/i;

export function isAutomated(userAgent: string | null | undefined): boolean {
  if (!userAgent || userAgent.length < 10) return true;
  return BOT.test(userAgent);
}
