import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BRAND, TAGLINE, siteUrl } from '@/lib/site.ts';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: BRAND + ' | Put your money where your mind is', template: '%s | ' + BRAND },
  description: 'First Principles Money is a personal finance platform to help you get untrapped from the endless rat race by mapping what you want against what you have and how you spend.',
  openGraph: { title: TAGLINE, description: 'Get untrapped from the endless rat race by mapping what you want against what you have and how you spend.', siteName: BRAND, type: 'website' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
