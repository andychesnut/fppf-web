import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BRAND, TAGLINE, siteUrl } from '@/lib/site.ts';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: BRAND + ' | A free 6-minute financial self-assessment', template: '%s | ' + BRAND },
  description: 'A free 6-minute self-assessment that shows where you stand across six stages of financial health, and where your next move is. No login. No account numbers.',
  openGraph: { title: TAGLINE, description: 'A free 6-minute self-assessment across six stages of financial health.', siteName: BRAND, type: 'website' },
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
