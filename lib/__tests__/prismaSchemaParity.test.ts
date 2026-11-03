// Phase D, priority 7 — Postgres (production) and SQLite (local dev) must
// stay structurally identical; prisma/schema.production.prisma is a
// GENERATED file (scripts/generate-production-schema.js), and this test
// fails the moment someone edits prisma/schema.prisma without regenerating
// it — catching drift before it ever reaches a deploy.
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { generateProductionSchema } from "../../scripts/prisma-production-schema.js";

const DEV_SCHEMA_PATH = path.join(__dirname, "..", "..", "prisma", "schema.prisma");
const PRODUCTION_SCHEMA_PATH = path.join(__dirname, "..", "..", "prisma", "schema.production.prisma");

describe("prisma/schema.production.prisma", () => {
  it("is byte-for-byte what regenerating from prisma/schema.prisma right now would produce", () => {
    const devSchema = fs.readFileSync(DEV_SCHEMA_PATH, "utf8");
    const expected = generateProductionSchema(devSchema);
    expect(expected).not.toBeNull();

    const committed = fs.readFileSync(PRODUCTION_SCHEMA_PATH, "utf8");
    expect(committed).toBe(expected);
  });

  it("declares postgresql, never sqlite, as its provider", () => {
    const committed = fs.readFileSync(PRODUCTION_SCHEMA_PATH, "utf8");
    expect(committed).toMatch(/provider\s*=\s*"postgresql"/);
    expect(committed).not.toMatch(/provider\s*=\s*"sqlite"/);
  });

  it("the dev schema still declares sqlite (local dev functionality preserved)", () => {
    const devSchema = fs.readFileSync(DEV_SCHEMA_PATH, "utf8");
    expect(devSchema).toMatch(/provider\s*=\s*"sqlite"/);
  });
});
