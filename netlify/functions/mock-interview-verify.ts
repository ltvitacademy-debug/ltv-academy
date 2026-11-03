// Public certificate verification (spec Phase C requirement 7).
//
// GET /api/mock-interview-verify?number=<certificateNumber>
//   -> { valid: true, certificateNumber, studentName, careerPath, difficulty, issuedAt }
//   -> { valid: false, certificateNumber }
//
// Deliberately unauthenticated — this is meant to be checkable by anyone
// holding a printed certificate or its QR code, same as a real credential
// verification service. lib/certificateVerification.ts is the ONLY place
// allowed to decide what's safe to return here, and it never returns a
// score, a transcript, or the student's email (spec requirement 7).
import type { Config } from "@netlify/functions";
import { verifyCertificate } from "../../lib/certificateVerification";

export default async (req: Request) => {
  if (req.method !== "GET") return json({ error: "Method not allowed" }, 405);

  const number = (new URL(req.url).searchParams.get("number") ?? "").trim();
  if (!number) return json({ error: "Missing certificate number" }, 400);

  const result = await verifyCertificate(number);
  return json(result);
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/mock-interview-verify",
};
