import type { Metadata } from 'next';
import { Snapshot } from './Snapshot.tsx';

export const metadata: Metadata = { title: 'The Snapshot' };

export default function Page() {
  return <Snapshot />;
}
