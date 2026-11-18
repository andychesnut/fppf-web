// Browser helpers. Storage can be blocked, so every access is guarded.
let memoryId: string | null = null;

export function anonId(): string {
  if (memoryId) return memoryId;
  let id: string | null = null;
  try { id = window.localStorage.getItem('fp_anon'); } catch { id = null; }
  if (!id) {
    id = Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
    try { window.localStorage.setItem('fp_anon', id); } catch { /* keep in memory */ }
  }
  memoryId = id;
  return id;
}

export function track(name: string, props: Record<string, string | number> = {}): void {
  try {
    const body = JSON.stringify({ name, anonId: anonId(), props });
    fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
  } catch { /* analytics must never break the page */ }
}
