// Prisma client singleton for the Mock Interview feature. Server-only —
// imported from Netlify Functions (netlify/functions/mock-interview-*.ts),
// never from client components. The "reuse across hot reloads" guard isn't
// actually needed inside a Netlify Function (each invocation is its own
// process), but it's cheap insurance and keeps `netlify dev`'s local Next.js
// dev server from opening a new connection per edit.
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
