import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BRAND, TAGLINE, siteUrl } from '@/lib/site.ts';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: BRAND + ' | Work out what the life you want would take', template: '%s | ' + BRAND },
  description: 'Say what you would be doing if money were not holding you in place. In about three minutes, see what it would cost, how long you could give it, and where you would stop.',
  openGraph: { title: TAGLINE, description: 'Say what you want. See what it would cost, how long you could give it, and where you would stop.', siteName: BRAND, type: 'website' },
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
