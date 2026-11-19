import type { Metadata } from 'next';
import { Keep } from './Keep.tsx';

export const metadata: Metadata = { title: 'Still want this?', description: 'List what keeps costing you each month. Say whether you use it and whether you would choose it again today. Nothing you enter leaves your device.' };

export default function Page() {
  return <Keep />;
}
