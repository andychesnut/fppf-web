import type { Metadata } from 'next';
import { WhatIf } from './WhatIf.tsx';

export const metadata: Metadata = { title: 'What if?', robots: { index: false, follow: false } };

export default function Page() {
  return <WhatIf />;
}
