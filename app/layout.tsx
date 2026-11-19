import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BRAND, TAGLINE, siteUrl } from '@/lib/site.ts';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: BRAND + ' | Put your money where your mind is', template: '%s | ' + BRAND },
  description: 'You know something has to change, and the bills still have to get paid. See whether you can afford the change you want, and what is standing in the way. Free, and your answers stay on your device.',
  openGraph: { title: TAGLINE, description: 'See whether you can afford the change you want, and what is standing in the way.', siteName: BRAND, type: 'website' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Source+Sans+3:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
