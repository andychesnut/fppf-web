import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

// One Postgres database, reached over HTTPS. The connection string is injected by
// Vercel's Neon integration. Without it, the site still works and simply stores nothing.
let client: NeonQueryFunction<false, false> | null = null;
let schemaReady: Promise<void> | null = null;

export function sql(): NeonQueryFunction<false, false> | null {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  if (!client) client = neon(url);
  return client;
}

export async function ready(): Promise<NeonQueryFunction<false, false> | null> {
  const q = sql();
  if (!q) return null;
  if (!schemaReady) {
    schemaReady = (async () => {
      await q`create table if not exists events (
        id bigserial primary key,
        ts timestamptz not null default now(),
        name text not null,
        anon_id text,
        props jsonb not null default '{}'::jsonb
      )`;
      await q`create index if not exists events_name_ts on events (name, ts)`;
      // Privacy floor: scores and bands only. No raw answers, no balances.
      await q`create table if not exists saves (
        id bigserial primary key,
        ts timestamptz not null default now(),
        email text not null unique,
        stage text,
        load text,
        months_of_no text,
        map jsonb not null default '{}'::jsonb,
        price_variant int,
        notify_full boolean not null default false,
        unsubscribed boolean not null default false
      )`;
      await q`create table if not exists waitlist (
        id bigserial primary key,
        ts timestamptz not null default now(),
        email text not null unique,
        price int,
        unsubscribed boolean not null default false
      )`;
    })().catch((e) => {
      schemaReady = null;
      throw e;
    });
  }
  await schemaReady;
  return q;
}
