// Tests run against the same local dev SQLite database used by `netlify
// dev` (prisma/dev.db) — never a production database. This mirrors the
// fallback already in .env.local; set explicitly here so `npm test` works
// standalone without relying on Next's .env.local auto-loading, which
// vitest doesn't do on its own.
process.env.DATABASE_URL ??= "file:./dev.db";
