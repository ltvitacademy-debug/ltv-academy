// Administrator review queue (spec Phase C requirement 8; authenticated,
// role-based access per the Phase D follow-up — replaces the earlier
// shared-secret-only gate).
//
// GET  /api/mock-interview-admin-review
//   headers: { "authorization": "Bearer <token from /api/admin-login>" }
//   -> { sessions: AdminReviewSessionDTO[] } — every session whose report is
//      still outcome "needs-review" (disputed === true).
// POST /api/mock-interview-admin-review
//   headers: { "authorization": "Bearer ..." }
//   body: AdminResolveRequest { sessionId, resolutions, adminName }
//   -> { scored: ScoredSessionResult }
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { extractAdminSessionToken, verifyAdminSessionToken, hasAdminReviewAccess } from "../../lib/adminAuth";
import { resolveAdminReview } from "../../lib/formalAssessmentPipeline";
import type { AdminReviewSessionDTO, AdminResolveRequest, GradedItem, InterviewDifficulty } from "../../lib/mockInterviewTypes";

type StoredReportJson = {
  criteria: AdminReviewSessionDTO["criteria"];
  categoryScores: AdminReviewSessionDTO["categoryScores"];
  gradedItems: GradedItem[];
  itemsNeedingReview: GradedItem[];
};

export default async (req: Request) => {
  const identity = verifyAdminSessionToken(extractAdminSessionToken(req));
  if (!hasAdminReviewAccess(identity)) {
    return json({ error: "Not authorized." }, 403);
  }

  if (req.method === "GET") {
    const reports = await prisma.interviewReport.findMany({
      where: { disputed: true },
      include: { session: { include: { student: true } } },
      orderBy: { createdAt: "asc" },
    });

    const sessions: AdminReviewSessionDTO[] = reports.map((report) => {
      const stored = JSON.parse(report.reportJson) as StoredReportJson;
      return {
        sessionId: report.sessionId,
        careerPath: report.session.careerPath,
        difficulty: report.session.difficulty as InterviewDifficulty,
        studentEmail: report.session.student.email,
        startedAt: report.session.startedAt.toISOString(),
        categoryScores: stored.categoryScores,
        criteria: stored.criteria,
        allGradedItems: stored.gradedItems,
        itemsNeedingReview: stored.itemsNeedingReview,
      };
    });

    return json({ sessions });
  }

  if (req.method === "POST") {
    let body: AdminResolveRequest;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }
    if (!body.sessionId || !Array.isArray(body.resolutions) || !body.adminName) {
      return json({ error: "Missing sessionId, resolutions, or adminName" }, 400);
    }
    try {
      const scored = await resolveAdminReview({ sessionId: body.sessionId, resolutions: body.resolutions, adminName: body.adminName });
      return json({ scored });
    } catch (error) {
      console.error("mock-interview-admin-review resolve error:", error);
      return json({ error: "Could not resolve this session." }, 500);
    }
  }

  return json({ error: "Method not allowed" }, 405);
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/mock-interview-admin-review",
};
