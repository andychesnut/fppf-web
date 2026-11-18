import type { Metadata } from 'next';
import { Journey } from './Journey.tsx';

export const metadata: Metadata = {
  title: 'Your plan',
  description: 'Six questions, then a plan: what the life you want costs, how long you could give it, and where you would stop. Saved only in your browser.',
};

export default function Page() {
  return <Journey />;
}
