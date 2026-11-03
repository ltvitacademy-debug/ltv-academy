// Interview history (spec Phase C requirement 5; secured for real in Phase D).
//
// GET /api/mock-interview-history
//   Identity comes from a verified Wix member token (header
//   x-wix-member-token or the ltv_wm cookie) — devStudentEmail is accepted
//   ONLY outside production (spec Phase D priority 1: never authorize
//   access to student history using an email address alone). In
//   production, a request with no valid Wix identity gets 401, full stop —
//   there is no email fallback to fall back TO.
//   -> { history: HistoryEntryDTO[] } — every past attempt, most recent first.
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { resolveWixIdentity, isProductionEnvironment } from "../../lib/mockInterviewAuth";
import { wixStudentKey } from "../../lib/wixMemberToken";
import type { HistoryEntryDTO, InterviewDifficulty, InterviewOutcome, SessionStatus } from "../../lib/mockInterviewTypes";

export default async (req: Request) => {
  if (req.method !== "GET") return json({ error: "Method not allowed" }, 405);

  const identity = resolveWixIdentity(req);

  let wixMemberId: string;
  if (identity) {
    wixMemberId = wixStudentKey(identity.memberId);
  } else if (isProductionEnvironment()) {
    return json({ error: "Missing or invalid Wix member login." }, 401);
  } else {
    const devStudentEmail = (new URL(req.url).searchParams.get("devStudentEmail") ?? "").trim().toLowerCase();
    if (!devStudentEmail) return json({ error: "Missing devStudentEmail (dev-mode only)" }, 400);
    wixMemberId = `dev:${devStudentEmail}`;
  }

  const student = await prisma.student.findUnique({ where: { wixMemberId } });
  if (!student) return json({ history: [] });

  const sessions = await prisma.mockInterviewSession.findMany({
    where: { studentId: student.id },
    orderBy: { startedAt: "desc" },
    include: { report: true, certificate: true },
  });

  const history: HistoryEntryDTO[] = sessions.map((s) => ({
    sessionId: s.id,
    careerPath: s.careerPath,
    difficulty: s.difficulty as InterviewDifficulty,
    status: s.status as SessionStatus,
    outcome: (s.report?.outcome as InterviewOutcome | undefined) ?? null,
    overallScore: s.report?.overallScore ?? null,
    startedAt: s.startedAt.toISOString(),
    completedAt: s.completedAt?.toISOString() ?? null,
    hasCertificate: !!s.certificate,
  }));

  return json({ history });
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/mock-interview-history",
};
