import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BRAND, TAGLINE, siteUrl } from '@/lib/site.ts';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: BRAND + ' | How long could you afford to try for the life you want?', template: '%s | ' + BRAND },
  description: 'Leaving a job, starting something of your own, or cutting back your hours all cost money before they pay. Put in three numbers and see how long you could give it. Free, and nothing you type is stored.',
  openGraph: { title: TAGLINE, description: 'Free tools to plan a change you can afford: a bounded plan and a 6-minute self-assessment.', siteName: BRAND, type: 'website' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
