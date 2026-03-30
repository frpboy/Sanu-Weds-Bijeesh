import { neon } from "@neondatabase/serverless";

/** Returns a Neon SQL client. Throws at request-time if DATABASE_URL is missing. */
export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL environment variable is not set.");
  return neon(url);
}

/** Creates the wishes table if it doesn't already exist. */
export async function ensureTable() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS wishes (
      id         SERIAL PRIMARY KEY,
      name       TEXT        NOT NULL,
      message    TEXT        NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}
