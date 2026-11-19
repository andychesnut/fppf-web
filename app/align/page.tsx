import type { Metadata } from 'next';
import { Align } from './Align.tsx';

export const metadata: Metadata = { title: 'Money and mind', description: 'Say what matters most to you, say where your money goes, and see where the two do not line up. Nothing you enter leaves your device.' };

export default function Page() {
  return <Align />;
}
