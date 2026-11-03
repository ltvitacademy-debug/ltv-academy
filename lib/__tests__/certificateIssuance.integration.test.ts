// Integration-level check of the actual backend enforcement point
// (lib/certificateIssuance.ts) — the ONLY code path allowed to create a
// Certificate row. Runs against the real local dev database (prisma/dev.db)
// to prove the rule holds at the boundary where it matters, not just in an
// isolated pure function. Cleans up everything it creates.
import { describe, it, expect, afterAll } from "vitest";
import { prisma } from "../db";
import { issueCertificateIfEligible } from "../certificateIssuance";
import { generateAccessToken } from "../mockInterviewAuth";

async function makeSession(difficulty: "beginner" | "advanced") {
  const email = `cert-test-${difficulty}-${Date.now()}@example.com`;
  const student = await prisma.student.create({
    data: { wixMemberId: `test:${email}`, email, fullName: "Test Student" },
  });
  const credit = await prisma.interviewCredit.create({
    data: {
      studentId: student.id,
      wixOrderId: `test-order-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      careerPath: "snowflake-data-engineer",
      difficulty,
      status: "consumed",
      consumedAt: new Date(),
    },
  });
  const session = await prisma.mockInterviewSession.create({
    data: {
      studentId: student.id,
      creditId: credit.id,
      careerPath: "snowflake-data-engineer",
      difficulty,
      accessToken: generateAccessToken(),
      status: "complete",
      completedAt: new Date(),
    },
  });
  return { student, credit, session };
}

const createdStudentIds: string[] = [];

describe("issueCertificateIfEligible (real DB)", () => {
  afterAll(async () => {
    // Cascade-safe manual cleanup (no onDelete: Cascade configured, so order matters).
    for (const studentId of createdStudentIds) {
      const sessions = await prisma.mockInterviewSession.findMany({ where: { studentId } });
      for (const s of sessions) {
        await prisma.certificate.deleteMany({ where: { sessionId: s.id } });
        await prisma.interviewTurn.deleteMany({ where: { sessionId: s.id } });
        await prisma.competencyResult.deleteMany({ where: { sessionId: s.id } });
        await prisma.interviewReport.deleteMany({ where: { sessionId: s.id } });
      }
      await prisma.mockInterviewSession.deleteMany({ where: { studentId } });
      await prisma.interviewCredit.deleteMany({ where: { studentId } });
      await prisma.student.deleteMany({ where: { id: studentId } });
    }
  });

  it("refuses to issue a certificate for a Beginner pass, even at 100%", async () => {
    const { student, session } = await makeSession("beginner");
    createdStudentIds.push(student.id);

    const result = await issueCertificateIfEligible({
      sessionId: session.id,
      difficulty: "beginner",
      outcome: "pass",
      studentName: "Test Student",
      careerPath: "snowflake-data-engineer",
      overallScore: 100,
    });

    expect(result.issued).toBe(false);
    const stored = await prisma.certificate.findUnique({ where: { sessionId: session.id } });
    expect(stored).toBeNull();
  });

  it("issues a real certificate for an Advanced pass that meets every requirement", async () => {
    const { student, session } = await makeSession("advanced");
    createdStudentIds.push(student.id);

    const result = await issueCertificateIfEligible({
      sessionId: session.id,
      difficulty: "advanced",
      outcome: "pass",
      studentName: "Test Student",
      careerPath: "snowflake-data-engineer",
      overallScore: 92,
    });

    expect(result.issued).toBe(true);
    const stored = await prisma.certificate.findUnique({ where: { sessionId: session.id } });
    expect(stored).not.toBeNull();
    expect(stored?.difficulty).toBe("advanced");
  });

  it("refuses an Advanced session that did not pass", async () => {
    const { student, session } = await makeSession("advanced");
    createdStudentIds.push(student.id);

    const result = await issueCertificateIfEligible({
      sessionId: session.id,
      difficulty: "advanced",
      outcome: "fail",
      studentName: "Test Student",
      careerPath: "snowflake-data-engineer",
      overallScore: 65,
    });

    expect(result.issued).toBe(false);
    const stored = await prisma.certificate.findUnique({ where: { sessionId: session.id } });
    expect(stored).toBeNull();
  });
});
