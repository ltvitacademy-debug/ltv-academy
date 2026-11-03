#!/usr/bin/env node
// Phase D follow-up — the ONLY way an Admin row gets created. Deliberately
// a local CLI script, not an HTTP endpoint: bootstrapping the first (or
// any) admin account this way means there is no network attack surface
// for "create an admin" at all. Run it locally (or once, carefully, against
// production's DATABASE_URL) whenever you need to add or reset an admin:
//
//   node scripts/create-admin.js bill@ltvacademy.com "a strong password" admin
//
// Re-running with the same email updates that admin's password/role rather
// than erroring — handy for a password reset.
const { PrismaClient } = require("@prisma/client");
const { hashPasswordForScript } = require("./admin-password-hash");

async function main() {
  const [email, password, role] = process.argv.slice(2);
  if (!email || !password) {
    console.error("Usage: node scripts/create-admin.js <email> <password> [role=admin]");
    process.exit(1);
  }
  if (password.length < 12) {
    console.error("Refusing a password shorter than 12 characters — this account can review and resolve real students' grading decisions.");
    process.exit(1);
  }

  const prisma = new PrismaClient();
  const passwordHash = hashPasswordForScript(password);
  const admin = await prisma.admin.upsert({
    where: { email: email.toLowerCase() },
    update: { passwordHash, role: role || "admin" },
    create: { email: email.toLowerCase(), passwordHash, role: role || "admin" },
  });
  console.log(`Admin account ready: ${admin.email} (role: ${admin.role})`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
