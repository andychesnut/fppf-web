'use client';
import { useState } from 'react';

export function DeleteForm() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      setMsg(res.ok ? 'Done. If a saved result existed for that email, it is deleted.' : 'That did not work. Try again in a minute.');
    } catch { setMsg('That did not work. Try again in a minute.'); }
  }
  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <div className="field">
        <label htmlFor="del-email">Email</label>
        <input id="del-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit" className="btn">Delete my saved result</button>
      <div aria-live="polite">{msg ? <p className="notice">{msg}</p> : null}</div>
    </form>
  );
}
