// Career Launch — student profile/preferences (the intake form's backend).
//
// GET  /api/career-launch-profile?devStudentEmail=... (dev only, or a real
//      Wix member header/cookie — see lib/careerLaunchAuth.ts)
//   -> { profile: CareerProfileDTO | null }  (null = hasn't filled it in yet)
// PUT  /api/career-launch-profile
//   body: { devStudentEmail?, ...CareerProfileInput }
//   -> { profile: CareerProfileDTO }
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { resolveCareerLaunchStudent, isResolveError } from "../../lib/careerLaunchAuth";
import { splitCsv, joinCsv, type CareerProfileDTO, type CareerProfileInput } from "../../lib/careerLaunchTypes";

function toDTO(profile: {
  targetRoles: string;
  locations: string;
  compFloor: number | null;
  workAuth: string;
  excludedCompanies: string;
  weeklyTarget: number;
  startAvailability: string;
  baseResumeText: string | null;
  baseResumeApprovedAt: Date | null;
}): CareerProfileDTO {
  return {
    targetRoles: splitCsv(profile.targetRoles),
    locations: splitCsv(profile.locations),
    compFloor: profile.compFloor,
    workAuth: profile.workAuth,
    excludedCompanies: splitCsv(profile.excludedCompanies),
    weeklyTarget: profile.weeklyTarget,
    startAvailability: profile.startAvailability,
    baseResumeText: profile.baseResumeText,
    baseResumeApprovedAt: profile.baseResumeApprovedAt ? profile.baseResumeApprovedAt.toISOString() : null,
  };
}

function isValidInput(body: unknown): body is CareerProfileInput {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    Array.isArray(b.targetRoles) &&
    Array.isArray(b.locations) &&
    Array.isArray(b.excludedCompanies) &&
    typeof b.workAuth === "string" &&
    typeof b.startAvailability === "string" &&
    typeof b.weeklyTarget === "number" &&
    (b.compFloor === null || typeof b.compFloor === "number")
  );
}

export default async (req: Request) => {
  if (req.method === "GET") {
    const devStudentEmail = new URL(req.url).searchParams.get("devStudentEmail") ?? undefined;
    const resolved = await resolveCareerLaunchStudent(req, devStudentEmail);
    if (isResolveError(resolved)) return json({ error: resolved.error }, resolved.status);

    const profile = await prisma.careerProfile.findUnique({ where: { studentId: resolved.studentId } });
    return json({ profile: profile ? toDTO(profile) : null });
  }

  if (req.method === "PUT") {
    let body: CareerProfileInput & { devStudentEmail?: string };
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }
    if (!isValidInput(body)) return json({ error: "Missing or invalid profile fields" }, 400);

    const resolved = await resolveCareerLaunchStudent(req, body.devStudentEmail);
    if (isResolveError(resolved)) return json({ error: resolved.error }, resolved.status);

    const data = {
      targetRoles: joinCsv(body.targetRoles),
      locations: joinCsv(body.locations),
      compFloor: body.compFloor,
      workAuth: body.workAuth,
      excludedCompanies: joinCsv(body.excludedCompanies),
      weeklyTarget: body.weeklyTarget,
      startAvailability: body.startAvailability,
    };
    const profile = await prisma.careerProfile.upsert({
      where: { studentId: resolved.studentId },
      update: data,
      create: { studentId: resolved.studentId, ...data },
    });
    return json({ profile: toDTO(profile) });
  }

  return json({ error: "Method not allowed" }, 405);
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/career-launch-profile",
};
