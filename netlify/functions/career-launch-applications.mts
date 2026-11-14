// Career Launch — a student's own job-application list (the dashboard's
// backend). Read-only; status changes happen via the staff review queue
// (career-launch-admin-review.mts) or the scheduled sweep, never here.
//
// GET /api/career-launch-applications?devStudentEmail=...
//   -> { applications: JobApplicationDTO[] }  (newest first)
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { resolveCareerLaunchStudent, isResolveError } from "../../lib/careerLaunchAuth";
import type { ApplicationStatus, JobApplicationDTO } from "../../lib/careerLaunchTypes";

export default async (req: Request) => {
  if (req.method !== "GET") return json({ error: "Method not allowed" }, 405);

  const devStudentEmail = new URL(req.url).searchParams.get("devStudentEmail") ?? undefined;
  const resolved = await resolveCareerLaunchStudent(req, devStudentEmail);
  if (isResolveError(resolved)) return json({ error: resolved.error }, resolved.status);

  const rows = await prisma.jobApplication.findMany({
    where: { studentId: resolved.studentId },
    include: { posting: true },
    orderBy: { createdAt: "desc" },
  });

  const applications: JobApplicationDTO[] = rows.map((row) => ({
    id: row.id,
    status: row.status as ApplicationStatus,
    matchScore: row.matchScore,
    tailoredResumeText: row.tailoredResumeText,
    coverLetterText: row.coverLetterText,
    staffNote: row.staffNote,
    createdAt: row.createdAt.toISOString(),
    posting: {
      id: row.posting.id,
      sourceSite: row.posting.sourceSite,
      sourceUrl: row.posting.sourceUrl,
      company: row.posting.company,
      title: row.posting.title,
      location: row.posting.location,
      remote: row.posting.remote,
      salaryRange: row.posting.salaryRange,
      rawSummary: row.posting.rawSummary,
    },
  }));

  return json({ applications });
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/career-launch-applications",
};
