#!/usr/bin/env node
// Phase D, priority 7 — Prisma's `datasource.provider` has to be a literal
// ("sqlite" / "postgresql"), it can't be read from an env var like `url`
// can, so local dev (SQLite) and production (Postgres) can't share one
// schema file at the datasource level. Rather than hand-maintaining a
// second copy that can silently drift from the real one, this GENERATES
// prisma/schema.production.prisma from prisma/schema.prisma every time it's
// run, swapping only the datasource block — every model, field, and index
// stays byte-for-byte identical because it's mechanically derived, not
// hand-copied. Run it (via `npm run prisma:postgres`) before
// `prisma generate --schema=prisma/schema.production.prisma` in the
// production build; local dev keeps using the default prisma/schema.prisma
// (SQLite) completely untouched. lib/__tests__/prismaSchemaParity.test.ts
// fails the suite if the committed file ever drifts from this transform.
const fs = require("fs");
const path = require("path");
const { generateProductionSchema } = require("./prisma-production-schema");

const schemaPath = path.join(__dirname, "..", "prisma", "schema.prisma");
const outPath = path.join(__dirname, "..", "prisma", "schema.production.prisma");

const src = fs.readFileSync(schemaPath, "utf8");
const out = generateProductionSchema(src);

if (out === null) {
  console.error("generate-production-schema: prisma/schema.prisma's datasource block didn't match the expected sqlite shape — aborting rather than guessing.");
  process.exit(1);
}

fs.writeFileSync(outPath, out, "utf8");
console.log(`Wrote ${path.relative(process.cwd(), outPath)} from ${path.relative(process.cwd(), schemaPath)} (datasource swapped to postgresql).`);
