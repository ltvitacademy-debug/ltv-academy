// Identity resolution for the Career Launch feature. Reuses the exact Wix
// member-identity verification already proven out by the Mock Interview
// feature (lib/mockInterviewAuth.ts, lib/wixMemberToken.ts) rather than
// inventing a second auth system — a logged-in Wix member IS the account
// system here; this only verifies the identity token Wix already minted and
// upserts the shared Student row by wixMemberId, mirroring
// resolveStudentIdentity() in netlify/functions/mock-interview-session.ts.
import { prisma } from "./db";
import { isProductionEnvironment, resolveWixIdentity } from "./mockInterviewAuth";
import { wixStudentKey } from "./wixMemberToken";

export type ResolvedStudent = { studentId: string; email: string };
export type ResolveStudentError = { error: string; status: number };

export async function resolveCareerLaunchStudent(
  req: Request,
  devStudentEmail?: string
): Promise<ResolvedStudent | ResolveStudentError> {
  const identity = resolveWixIdentity(req);
  if (identity) {
    const student = await prisma.student.upsert({
      where: { wixMemberId: wixStudentKey(identity.memberId) },
      update: { email: identity.email },
      create: { wixMemberId: wixStudentKey(identity.memberId), email: identity.email },
    });
    return { studentId: student.id, email: identity.email };
  }
  if (isProductionEnvironment()) {
    return { error: "Missing or invalid Wix member login.", status: 401 };
  }
  const email = (devStudentEmail ?? "").trim().toLowerCase();
  if (!email) {
    return { error: "Missing devStudentEmail (dev-mode only, until you're testing against a real Wix login).", status: 400 };
  }
  const student = await prisma.student.upsert({
    where: { wixMemberId: `dev:${email}` },
    update: {},
    create: { wixMemberId: `dev:${email}`, email },
  });
  return { studentId: student.id, email };
}

export function isResolveError(result: ResolvedStudent | ResolveStudentError): result is ResolveStudentError {
  return "error" in result;
}
