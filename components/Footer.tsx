import Link from 'next/link';
import { DISCLAIMER, legalEntity, postalAddress } from '@/lib/site.ts';

export function Footer() {
  const address = postalAddress();
  return (
    <footer className="footer">
      <div className="wrap">
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/delete">Delete my data</Link>
        </nav>
        <span>{legalEntity()}{address ? ' · ' + address : ''}</span>
        <span>{DISCLAIMER}</span>
      </div>
    </footer>
  );
}
