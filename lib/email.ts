import { BRAND, DISCLAIMER, legalEntity, postalAddress, siteUrl } from './site.ts';

// Sends the saved-result email through Postmark. Returns a reason string when it does not send.
// It refuses to send without a postal address, because US email law (CAN-SPAM) expects one.
export async function sendResultEmail(to: string, body: { stage: string; load: string; monthsOfNo: string; lines: string[] }): Promise<'sent' | string> {
  const token = process.env.POSTMARK_SERVER_TOKEN;
  const from = process.env.EMAIL_FROM;
  const address = postalAddress();
  if (!token || !from) return 'email not configured';
  if (!address) return 'postal address not set';
  const text = [
    'Your snapshot from ' + BRAND,
    '',
    'Your stage: ' + body.stage,
    'Your structure: ' + body.load + ' load',
    'Runway, in months: ' + body.monthsOfNo,
    '',
    ...body.lines,
    '',
    'Take it again any time: ' + siteUrl() + '/snapshot',
    'Delete your data: ' + siteUrl() + '/delete',
    '',
    DISCLAIMER,
    legalEntity() + ', ' + address,
  ].join('\n');
  const res = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-Postmark-Server-Token': token },
    body: JSON.stringify({ From: from, To: to, Subject: 'Your six-stage snapshot', TextBody: text, MessageStream: 'outbound' }),
  });
  return res.ok ? 'sent' : 'postmark error ' + res.status;
}
