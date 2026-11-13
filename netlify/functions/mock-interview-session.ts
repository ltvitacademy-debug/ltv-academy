// Creates and fetches Professional Mock Interview sessions.
//
// POST /api/mock-interview-session  { careerPath, difficulty, mode?, creditId? }
//   Identity comes from a verified Wix member token (header x-wix-member-token
//   or the ltv_wm cookie) in production; devStudentEmail is accepted ONLY
//   outside production (see resolveStudentIdentity below) — spec Phase D
//   priority 1: never authorize using an email address alone.
//   -> { session: SessionDTO, accessToken }
// POST /api/mock-interview-session  { mintDevCredit: true, careerPath, difficulty, devStudentEmail }
//   -> { creditId } — dev/test only (hard-disabled in production): mints an
//      unused credit WITHOUT starting a session, so two separate
//      start-session calls can be raced against the SAME credit.
// GET  /api/mock-interview-session?id=<sessionId>[&accessToken=<token>]
//   -> { session: SessionDTO } — authorized by accessToken OR a verified
//      Wix identity that actually owns this session (spec Phase D priority
//      6: lets a real student resume securely without the token).
//
// Credit handling (Phase D — real Wix Pricing Plans purchases land via
// netlify/functions/wix-interview-purchase-webhook.ts, which creates
// InterviewCredit rows with careerPath: null AND difficulty: null — "not
// chosen yet", shared-product model, 2026-11). Claiming an existing credit
// only lets the request choose careerPath/difficulty when the credit
// doesn't already have one locked in — once either is set, a student can no
// longer redirect that SAME credit to a different careerPath/difficulty
// than what they already started spending it on. The claim + session-create
// still happen inside a single DB transaction: if session creation fails
// for any reason, the credit claim rolls back with it, so a failed start
// never permanently burns a credit (see the vitest coverage for this).
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { SECTION_SCHEDULE } from "../../lib/mockInterviewTypes";
import type { InterviewDifficulty, InterviewMode, SessionDTO } from "../../lib/mockInterviewTypes";
import { generateAccessToken, authorizeSessionAccess, resolveWixIdentity, isProductionEnvironment } from "../../lib/mockInterviewAuth";
import { wixStudentKey } from "../../lib/wixMemberToken";

const VALID_DIFFICULTIES: InterviewDifficulty[] = ["beginner", "intermediate", "advanced"];
const VALID_MODES: InterviewMode[] = ["text", "voice"];

function toSessionDTO(session: {
  id: string;
  careerPath: string;
  difficulty: string;
  mode: string;
  currentSection: string;
  status: string;
  startedAt: Date;
  turns: {
    id: string;
    turnIndex: number;
    section: string;
    competencyId: string | null;
    questionId: string | null;
    aiMessage: string;
    studentResponse: string | null;
    elapsedSeconds: number;
  }[];
}): SessionDTO {
  return {
    id: session.id,
    careerPath: session.careerPath,
    difficulty: session.difficulty as InterviewDifficulty,
    mode: session.mode as InterviewMode,
    currentSection: session.currentSection as SessionDTO["currentSection"],
    status: session.status as SessionDTO["status"],
    startedAt: session.startedAt.toISOString(),
    turns: session.turns.map((t) => ({
      id: t.id,
      turnIndex: t.turnIndex,
      section: t.section as SessionDTO["turns"][number]["section"],
      competencyId: t.competencyId,
      questionId: t.questionId,
      aiMessage: t.aiMessage,
      studentResponse: t.studentResponse,
      elapsedSeconds: t.elapsedSeconds,
    })),
  };
}

class CreditUnavailableError extends Error {}
class DifficultyMismatchError extends Error {}

// Lets specific, cryptographically-verified real Wix accounts (the site
// owner/admin — never a client-supplied email) start interviews without
// an existing paid credit, in production. Deliberately an explicit,
// narrow allowlist rather than a blanket "no production check" — unlike
// the old mintDevCredit/isProductionEnvironment() gap this replaces for
// that identity, this can never be reached by anyone whose Wix member
// token doesn't verify as one of these exact email addresses. Off by
// default (empty env var) — nothing changes unless configured.
function isUnlimitedTestEmail(email: string): boolean {
  const allowlist = (process.env.MOCK_INTERVIEW_UNLIMITED_TEST_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowlist.includes(email.trim().toLowerCase());
}

// Spec Phase D priority 1: identity comes from a verified Wix member token
// whenever one is present. devStudentEmail is accepted ONLY when there is
// no Wix identity AND this isn't production — a real deployment must never
// fall back to trusting a bare, client-supplied email for anything that
// creates or claims a credit.
async function resolveStudentIdentity(
  req: Request,
  devStudentEmail: string
): Promise<{ studentId: string; email: string } | { error: string; status: number }> {
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
  if (!devStudentEmail) {
    return { error: "Missing devStudentEmail (dev-mode only, until you're testing against a real Wix login).", status: 400 };
  }
  const student = await prisma.student.upsert({
    where: { wixMemberId: `dev:${devStudentEmail}` },
    update: {},
    create: { wixMemberId: `dev:${devStudentEmail}`, email: devStudentEmail },
  });
  return { studentId: student.id, email: devStudentEmail };
}

export default async (req: Request) => {
  if (req.method === "GET") {
    const params = new URL(req.url).searchParams;
    const id = params.get("id");
    const accessToken = params.get("accessToken");
    if (!id) {
      return json({ error: "Missing session id" }, 400);
    }
    const session = await prisma.mockInterviewSession.findUnique({
      where: { id },
      include: { turns: { orderBy: { turnIndex: "asc" } } },
    });
    // 404, not 403, even for "exists but not authorized" — a guessed
    // sessionId must not let an attacker distinguish "exists, not yours"
    // from "doesn't exist" (spec requirement 9).
    if (!session || !(await authorizeSessionAccess({ req, providedAccessToken: accessToken, session }))) {
      return json({ error: "Session not found" }, 404);
    }
    return json({ session: toSessionDTO(session) });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body: {
    careerPath?: string;
    difficulty?: string;
    mode?: string;
    devStudentEmail?: string;
    creditId?: string;
    mintDevCredit?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const careerPath = (body.careerPath ?? "").trim();
  const requestedDifficulty = body.difficulty as InterviewDifficulty | undefined;
  const mode: InterviewMode = VALID_MODES.includes(body.mode as InterviewMode) ? (body.mode as InterviewMode) : "text";
  const devStudentEmail = (body.devStudentEmail ?? "").trim().toLowerCase();

  if (!careerPath) return json({ error: "Missing careerPath" }, 400);

  const identityResult = await resolveStudentIdentity(req, devStudentEmail);
  if ("error" in identityResult) return json({ error: identityResult.error }, identityResult.status);
  const { studentId, email: studentEmail } = identityResult;

  // Dev/test only — races two "start" calls against the SAME credit.
  // Hard-disabled in production: nothing should be able to mint a free
  // credit for itself outside the real Wix payment -> webhook path.
  if (body.mintDevCredit) {
    if (isProductionEnvironment()) return json({ error: "Not available." }, 403);
    if (!VALID_DIFFICULTIES.includes(requestedDifficulty as InterviewDifficulty)) {
      return json({ error: "Invalid difficulty — must be beginner, intermediate, or advanced" }, 400);
    }
    const credit = await prisma.interviewCredit.create({
      data: {
        studentId,
        wixOrderId: `dev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        careerPath,
        difficulty: requestedDifficulty,
        status: "unused",
      },
    });
    return json({ creditId: credit.id, devMode: true }, 201);
  }

  try {
    let creditId = (body.creditId ?? "").trim();

    if (!creditId) {
      if (isProductionEnvironment()) {
        // Production never mints a credit from nothing — only a real,
        // already-paid-for credit (granted by the Wix webhook) may be
        // claimed. Auto-select the student's own oldest unused credit that
        // can actually be spent on this careerPath: either one already
        // bound to it, or a shared credit (careerPath still null) that
        // hasn't been spent on anything yet — so the frontend doesn't need
        // to track credit ids. Prefer an exact-path match first so an
        // older, already-bound credit isn't left stranded behind a newer
        // shared one.
        const existingUnused =
          (await prisma.interviewCredit.findFirst({
            where: { studentId, careerPath, status: "unused" },
            orderBy: { createdAt: "asc" },
          })) ??
          (await prisma.interviewCredit.findFirst({
            where: { studentId, careerPath: null, status: "unused" },
            orderBy: { createdAt: "asc" },
          }));
        if (existingUnused) {
          creditId = existingUnused.id;
        } else if (isUnlimitedTestEmail(studentEmail)) {
          if (!VALID_DIFFICULTIES.includes(requestedDifficulty as InterviewDifficulty)) {
            return json({ error: "Invalid difficulty — must be beginner, intermediate, or advanced" }, 400);
          }
          creditId = (
            await prisma.interviewCredit.create({
              data: {
                studentId,
                wixOrderId: `admin-test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                careerPath,
                difficulty: requestedDifficulty,
                status: "unused",
              },
            })
          ).id;
        } else {
          return json({ error: "No available interview credit for this career path. Please purchase one first." }, 402);
        }
      } else {
        // Dev/test convenience only.
        if (!VALID_DIFFICULTIES.includes(requestedDifficulty as InterviewDifficulty)) {
          return json({ error: "Invalid difficulty — must be beginner, intermediate, or advanced" }, 400);
        }
        creditId = (
          await prisma.interviewCredit.create({
            data: {
              studentId,
              wixOrderId: `dev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              careerPath,
              difficulty: requestedDifficulty,
              status: "unused",
            },
          })
        ).id;
      }
    }

    // Claim + session-create run as ONE transaction: if session creation
    // throws for any reason, the credit claim is rolled back with it, so a
    // failed start never permanently burns a credit. The updateMany +
    // where status:"unused" (AND studentId, so a credit can only ever be
    // claimed by the student it actually belongs to) is the atomic-claim
    // mechanism — it returns count 0 if another concurrent request already
    // won the race, exactly the case two simultaneous requests for the
    // same credit must hit (exactly one of them gets count 1).
    const session = await prisma.$transaction(async (tx) => {
      const credit = await tx.interviewCredit.findFirst({ where: { id: creditId, studentId } });
      if (!credit) throw new CreditUnavailableError();

      // If the credit already has a careerPath locked in, that's
      // authoritative, never the request body's — once a real credit is
      // bound to a path, a differing request value is silently ignored
      // rather than redirecting it (spec priorities 2 & 5: a student can't
      // point an existing credit at a different path than what it was
      // actually started against). A still-unbound (shared) credit takes
      // whatever careerPath this request asks for — the first path it's
      // ever spent on.
      const finalCareerPath = credit.careerPath ?? careerPath;
      if (credit.difficulty && requestedDifficulty && credit.difficulty !== requestedDifficulty) {
        throw new DifficultyMismatchError();
      }
      const finalDifficulty = (credit.difficulty ?? requestedDifficulty) as InterviewDifficulty | undefined;
      if (!finalDifficulty || !VALID_DIFFICULTIES.includes(finalDifficulty)) {
        throw new DifficultyMismatchError();
      }

      const claim = await tx.interviewCredit.updateMany({
        where: { id: creditId, studentId, status: "unused" },
        data: { status: "consumed", consumedAt: new Date(), careerPath: finalCareerPath, difficulty: finalDifficulty },
      });
      if (claim.count !== 1) {
        throw new CreditUnavailableError();
      }

      return tx.mockInterviewSession.create({
        data: {
          studentId,
          creditId,
          careerPath: finalCareerPath,
          difficulty: finalDifficulty,
          mode,
          accessToken: generateAccessToken(),
          currentSection: SECTION_SCHEDULE[0].id,
          status: "in-progress",
        },
        include: { turns: true },
      });
    });

    // accessToken is returned ONLY here, at creation — every other response
    // shape in this feature (SessionDTO, reports, history) omits it, so it
    // never leaks back out through a response the client already has reason
    // to share or log. A real Wix-authenticated student doesn't strictly
    // need it (authorizeSessionAccess also accepts their verified
    // identity), but dev-mode and "lost your login session" resume both do.
    return json({ session: toSessionDTO(session), accessToken: session.accessToken }, 201);
  } catch (error) {
    if (error instanceof CreditUnavailableError) {
      return json({ error: "Credit not found, already used, or does not belong to you." }, 409);
    }
    if (error instanceof DifficultyMismatchError) {
      return json({ error: "Invalid or mismatched difficulty for this credit." }, 400);
    }
    console.error("mock-interview-session error:", error);
    return json({ error: "Could not start the interview session." }, 500);
  }
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const config: Config = {
  path: "/api/mock-interview-session",
};
