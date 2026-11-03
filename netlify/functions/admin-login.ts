// Phase D follow-up — real administrator login, replacing the
// shared-secret-only gate. The Admin row itself is created by
// scripts/create-admin.js (a local CLI script, run once by Bill) — this
// endpoint only ever verifies an existing credential, it never creates one.
//
// POST /api/admin-login  { email, password }
//   -> { token, email, role } on success
//   -> 401 on any failure (wrong email, wrong password, or no such admin —
//      deliberately the SAME response either way, so a login attempt can
//      never be used to enumerate which admin emails exist)
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { verifyPassword, signAdminSessionToken } from "../../lib/adminAuth";

export default async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const password = body.password ?? "";
  if (!email || !password) return json({ error: "Invalid email or password." }, 401);

  const admin = await prisma.admin.findUnique({ where: { email } });
  // Always run verifyPassword, even with a dummy hash, when no admin
  // matches — otherwise "no such email" responds measurably faster than
  // "wrong password", which is itself a (minor) email-enumeration leak via
  // timing. scrypt's cost dominates either way, but there's no reason to
  // skip it.
  const passwordOk = verifyPassword(password, admin?.passwordHash ?? "0".repeat(32) + ":" + "0".repeat(128));
  if (!admin || !passwordOk) {
    return json({ error: "Invalid email or password." }, 401);
  }

  const token = signAdminSessionToken({ adminId: admin.id, email: admin.email, role: admin.role });
  if (!token) {
    console.error("admin-login: ADMIN_SESSION_SECRET is not configured — cannot issue a session.");
    return json({ error: "Admin login is not configured on the server yet." }, 503);
  }

  return json({ token, email: admin.email, role: admin.role });
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/admin-login",
};
