import type { Metadata } from 'next';
import { Journey } from './Journey.tsx';

export const metadata: Metadata = {
  title: 'Plan a way out',
  description: 'Say what you want to change, how long it might take, and the most you are willing to spend. See whether the plan holds if it goes slowly. Nothing you type is stored.',
};

export default function Page() {
  return <Journey />;
}
