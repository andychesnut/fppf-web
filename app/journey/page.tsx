import type { Metadata } from 'next';
import { Journey } from './Journey.tsx';

export const metadata: Metadata = {
  title: 'Your plan',
  description: 'Eight short questions, then a plan: how far you are from the life you want, what stands behind you, and what moves the distance. Saved only in your browser.',
};

export default function Page() {
  return <Journey />;
}
