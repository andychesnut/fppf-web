import type { Metadata } from 'next';
import Link from 'next/link';
import { DeleteForm } from './DeleteForm.tsx';

export const metadata: Metadata = { title: 'Delete my data' };

export default function Page() {
  return (
    <main className="prose">
      <Link href="/">Back to home</Link>
      <h1>Delete my data</h1>
      <p>Enter the email you used to save your map. We delete the saved result tied to it. Anonymous usage counts hold no email and cannot be linked to you.</p>
      <DeleteForm />
    </main>
  );
}
