import type { Metadata } from 'next';
import { Home } from './Home.tsx';

export const metadata: Metadata = { title: 'Home', robots: { index: false, follow: false } };

export default function Page() {
  return <Home />;
}
