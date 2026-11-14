// Career Launch — streams a tailored-resume PDF for one JobApplication the
// requesting student actually owns. Generated fresh on every request
// (lib/jobApplicationPdf.ts) — nothing is stored.
//
// GET /api/career-launch-resume-pdf?applicationId=...&devStudentEmail=...
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { resolveCareerLaunchStudent, isResolveError } from "../../lib/careerLaunchAuth";
import { generateJobApplicationPdf } from "../../lib/jobApplicationPdf";

export default async (req: Request) => {
  if (req.method !== "GET") return json({ error: "Method not allowed" }, 405);

  const params = new URL(req.url).searchParams;
  const applicationId = params.get("applicationId");
  if (!applicationId) return json({ error: "Missing applicationId" }, 400);

  const resolved = await resolveCareerLaunchStudent(req, params.get("devStudentEmail") ?? undefined);
  if (isResolveError(resolved)) return json({ error: resolved.error }, resolved.status);

  const application = await prisma.jobApplication.findUnique({
    where: { id: applicationId },
    include: { posting: true, student: true },
  });
  if (!application || application.studentId !== resolved.studentId) {
    return json({ error: "Not found" }, 404);
  }
  if (!application.tailoredResumeText) {
    return json({ error: "No tailored resume yet for this application" }, 400);
  }

  const pdfBytes = await generateJobApplicationPdf({
    studentName: application.student.fullName ?? application.student.email,
    roleTitle: application.posting.title,
    company: application.posting.company,
    tailoredResumeText: application.tailoredResumeText,
    coverLetterText: application.coverLetterText,
  });

  return new Response(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="resume-${application.posting.company.replace(/[^a-z0-9]+/gi, "-")}.pdf"`,
    },
  });
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/career-launch-resume-pdf",
};
