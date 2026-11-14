// Career Launch — base resume text + the student's own approval of it
// (approval gates whether lib/resumeTailoringEngine.ts may use it — see
// career-launch-job-sweep-scheduled.ts).
//
// GET /api/career-launch-resume?devStudentEmail=...
//   -> { baseResumeText: string|null, baseResumeApprovedAt: string|null }
// PUT /api/career-launch-resume   body: { devStudentEmail?, baseResumeText }
//   -> sets the text and clears any prior approval (edited text needs re-approval)
// POST /api/career-launch-resume body: { devStudentEmail?, action: "approve" }
//   -> stamps baseResumeApprovedAt; 400 if there's no resume text yet
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { resolveCareerLaunchStudent, isResolveError } from "../../lib/careerLaunchAuth";

export default async (req: Request) => {
  if (req.method === "GET") {
    const devStudentEmail = new URL(req.url).searchParams.get("devStudentEmail") ?? undefined;
    const resolved = await resolveCareerLaunchStudent(req, devStudentEmail);
    if (isResolveError(resolved)) return json({ error: resolved.error }, resolved.status);

    const profile = await prisma.careerProfile.findUnique({ where: { studentId: resolved.studentId } });
    return json({
      baseResumeText: profile?.baseResumeText ?? null,
      baseResumeApprovedAt: profile?.baseResumeApprovedAt ? profile.baseResumeApprovedAt.toISOString() : null,
    });
  }

  if (req.method === "PUT") {
    let body: { devStudentEmail?: string; baseResumeText?: string };
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }
    if (typeof body.baseResumeText !== "string" || !body.baseResumeText.trim()) {
      return json({ error: "Missing baseResumeText" }, 400);
    }
    const resolved = await resolveCareerLaunchStudent(req, body.devStudentEmail);
    if (isResolveError(resolved)) return json({ error: resolved.error }, resolved.status);

    await prisma.careerProfile.upsert({
      where: { studentId: resolved.studentId },
      update: { baseResumeText: body.baseResumeText, baseResumeApprovedAt: null },
      create: {
        studentId: resolved.studentId,
        baseResumeText: body.baseResumeText,
        targetRoles: "",
        locations: "",
        workAuth: "",
        excludedCompanies: "",
        startAvailability: "",
      },
    });
    return json({ baseResumeText: body.baseResumeText, baseResumeApprovedAt: null });
  }

  if (req.method === "POST") {
    let body: { devStudentEmail?: string; action?: string };
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }
    if (body.action !== "approve") return json({ error: "Unknown action" }, 400);

    const resolved = await resolveCareerLaunchStudent(req, body.devStudentEmail);
    if (isResolveError(resolved)) return json({ error: resolved.error }, resolved.status);

    const profile = await prisma.careerProfile.findUnique({ where: { studentId: resolved.studentId } });
    if (!profile?.baseResumeText) return json({ error: "No resume text to approve yet" }, 400);

    const updated = await prisma.careerProfile.update({
      where: { studentId: resolved.studentId },
      data: { baseResumeApprovedAt: new Date() },
    });
    return json({ baseResumeText: updated.baseResumeText, baseResumeApprovedAt: updated.baseResumeApprovedAt!.toISOString() });
  }

  return json({ error: "Method not allowed" }, 405);
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/career-launch-resume",
};
