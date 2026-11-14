// Career Launch — staff review queue. Exact Bearer-token admin auth as
// mock-interview-admin-review.mts (same /api/admin-login, same
// lib/adminAuth.ts) — one staff login works for both review queues.
//
// GET  /api/career-launch-admin-review
//   headers: { "authorization": "Bearer <token from /api/admin-login>" }
//   -> { applications: AdminJobApplicationDTO[] }  (status tailored|staff_review)
// POST /api/career-launch-admin-review
//   headers: { "authorization": "Bearer ..." }
//   body: { applicationId, decision: "approve"|"reject"|"edit", editedResumeText?,
//           editedCoverLetterText?, staffNote?, adminName }
//   -> { application: AdminJobApplicationDTO }
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { extractAdminSessionToken, verifyAdminSessionToken, hasAdminReviewAccess } from "../../lib/adminAuth";
import type { AdminJobApplicationDTO, ApplicationStatus } from "../../lib/careerLaunchTypes";

function toDTO(row: {
  id: string;
  status: string;
  matchScore: number | null;
  tailoredResumeText: string | null;
  coverLetterText: string | null;
  staffNote: string | null;
  createdAt: Date;
  student: { email: string; fullName: string | null };
  posting: {
    id: string;
    sourceSite: string;
    sourceUrl: string;
    company: string;
    title: string;
    location: string;
    remote: boolean;
    salaryRange: string | null;
    rawSummary: string;
  };
}): AdminJobApplicationDTO {
  return {
    id: row.id,
    status: row.status as ApplicationStatus,
    matchScore: row.matchScore,
    tailoredResumeText: row.tailoredResumeText,
    coverLetterText: row.coverLetterText,
    staffNote: row.staffNote,
    createdAt: row.createdAt.toISOString(),
    studentEmail: row.student.email,
    studentName: row.student.fullName,
    posting: row.posting,
  };
}

export default async (req: Request) => {
  const identity = verifyAdminSessionToken(extractAdminSessionToken(req));
  if (!hasAdminReviewAccess(identity)) {
    return json({ error: "Not authorized." }, 403);
  }

  if (req.method === "GET") {
    const rows = await prisma.jobApplication.findMany({
      where: { status: { in: ["tailored", "staff_review"] } },
      include: { student: true, posting: true },
      orderBy: { createdAt: "asc" },
    });
    return json({ applications: rows.map(toDTO) });
  }

  if (req.method === "POST") {
    let body: {
      applicationId?: string;
      decision?: "approve" | "reject" | "edit";
      editedResumeText?: string;
      editedCoverLetterText?: string;
      staffNote?: string;
      adminName?: string;
    };
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }
    if (!body.applicationId || !body.decision || !body.adminName) {
      return json({ error: "Missing applicationId, decision, or adminName" }, 400);
    }

    const existing = await prisma.jobApplication.findUnique({ where: { id: body.applicationId } });
    if (!existing) return json({ error: "Application not found" }, 404);

    const data: {
      status?: ApplicationStatus;
      staffNote?: string;
      reviewedByAdminId?: string;
      reviewedAt?: Date;
      tailoredResumeText?: string;
      coverLetterText?: string;
    } = {
      staffNote: body.staffNote ?? existing.staffNote ?? undefined,
      reviewedByAdminId: identity!.adminId,
      reviewedAt: new Date(),
    };

    if (body.decision === "approve") {
      // "submitted" here means staff has approved the AI-tailored content —
      // the actual application still goes out by a human, by hand, outside
      // this app (no authorized ATS/Greenhouse channel exists yet).
      data.status = "submitted";
    } else if (body.decision === "reject") {
      data.status = "rejected";
    } else if (body.decision === "edit") {
      data.status = "staff_review";
      if (typeof body.editedResumeText === "string") data.tailoredResumeText = body.editedResumeText;
      if (typeof body.editedCoverLetterText === "string") data.coverLetterText = body.editedCoverLetterText;
    } else {
      return json({ error: "Unknown decision" }, 400);
    }

    const updated = await prisma.jobApplication.update({
      where: { id: body.applicationId },
      data,
      include: { student: true, posting: true },
    });
    return json({ application: toDTO(updated) });
  }

  return json({ error: "Method not allowed" }, 405);
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/career-launch-admin-review",
};
