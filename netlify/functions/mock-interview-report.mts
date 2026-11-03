// Student performance report (spec Phase C requirements 1, 2, 4).
//
// GET /api/mock-interview-report?sessionId=<id>&accessToken=<token>
//   -> { report: StudentReportDTO | null }  — null means grading hasn't run
//      for this session yet (the live grading call is still pending
//      administrator approval — see lib/formalAssessmentPipeline.ts).
//
// Ownership (spec requirement 9): same per-session accessToken check as
// mock-interview-session.ts and mock-interview-turn.ts — 404 either way so a
// guessed sessionId can't be distinguished from someone else's real one.
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { authorizeSessionAccess, getSiteUrl } from "../../lib/mockInterviewAuth";
import { readStoredReport } from "../../lib/formalAssessmentPipeline";
import { buildStudentReport, buildLessonLinkSources } from "../../lib/interviewReport";
import type { InterviewDifficulty, InterviewOutcome } from "../../lib/mockInterviewTypes";

export default async (req: Request) => {
  if (req.method !== "GET") return json({ error: "Method not allowed" }, 405);

  const params = new URL(req.url).searchParams;
  const sessionId = params.get("sessionId");
  const accessToken = params.get("accessToken");
  if (!sessionId) return json({ error: "Missing sessionId" }, 400);

  const session = await prisma.mockInterviewSession.findUnique({ where: { id: sessionId } });
  if (!session || !(await authorizeSessionAccess({ req, providedAccessToken: accessToken, session }))) {
    return json({ error: "Session not found" }, 404);
  }

  const report = await prisma.interviewReport.findUnique({ where: { sessionId } });
  if (!report) {
    return json({ report: null });
  }

  const certificate = await prisma.certificate.findUnique({ where: { sessionId } });
  const difficulty = session.difficulty as InterviewDifficulty;
  const scored = readStoredReport(report.reportJson, report.outcome as InterviewOutcome);
  const lessonLinkSources = buildLessonLinkSources(session.careerPath, difficulty);

  const studentReport = buildStudentReport({
    sessionId: session.id,
    careerPath: session.careerPath,
    difficulty,
    completedAt: session.completedAt?.toISOString() ?? null,
    scored,
    lessonLinkSources,
    certificate: certificate ? { certificateNumber: certificate.certificateNumber, issuedAt: certificate.issuedAt.toISOString() } : null,
    verifyUrlBase: `${getSiteUrl()}/verify?number=`,
  });

  return json({ report: studentReport });
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/mock-interview-report",
};
