import type { Metadata } from 'next';
import { Start } from './Start.tsx';

export const metadata: Metadata = { title: 'Start', description: 'A few questions about you, your situation, and your money. About ten minutes. Nothing you answer leaves your device.' };

export default function Page() {
  return <Start />;
}
