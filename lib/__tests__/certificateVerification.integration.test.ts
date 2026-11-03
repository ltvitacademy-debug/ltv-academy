// Phase C — public certificate verification (spec requirement 7). Real DB,
// proving the public-safe response shape against an actually-issued
// Certificate row — never a score, transcript, or email.
import { describe, it, expect, afterAll } from "vitest";
import { prisma } from "../db";
import { generateAccessToken } from "../mockInterviewAuth";
import { issueCertificateIfEligible } from "../certificateIssuance";
import { verifyCertificate } from "../certificateVerification";

const createdStudentIds: string[] = [];

async function cleanupStudent(studentId: string) {
  const sessions = await prisma.mockInterviewSession.findMany({ where: { studentId } });
  for (const s of sessions) {
    await prisma.certificate.deleteMany({ where: { sessionId: s.id } });
    await prisma.mockInterviewSession.deleteMany({ where: { id: s.id } });
  }
  await prisma.interviewCredit.deleteMany({ where: { studentId } });
  await prisma.student.deleteMany({ where: { id: studentId } });
}

describe("verifyCertificate — spec requirement 7", () => {
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("returns valid:true with ONLY public-safe fields for a real certificate", async () => {
    const email = `verify-${Date.now()}@example.com`;
    const student = await prisma.student.create({ data: { wixMemberId: `test:${email}`, email, fullName: "Verify Test Student" } });
    createdStudentIds.push(student.id);
    const credit = await prisma.interviewCredit.create({
      data: {
        studentId: student.id,
        wixOrderId: `test-${Date.now()}`,
        careerPath: "snowflake-data-engineer",
        difficulty: "advanced",
        status: "consumed",
        consumedAt: new Date(),
      },
    });
    const session = await prisma.mockInterviewSession.create({
      data: {
        studentId: student.id,
        creditId: credit.id,
        careerPath: "snowflake-data-engineer",
        difficulty: "advanced",
        accessToken: generateAccessToken(),
        status: "complete",
        completedAt: new Date(),
      },
    });
    const issued = await issueCertificateIfEligible({
      sessionId: session.id,
      difficulty: "advanced",
      outcome: "pass",
      studentName: "Verify Test Student",
      careerPath: "snowflake-data-engineer",
      overallScore: 94,
    });
    expect(issued.issued).toBe(true);
    if (!issued.issued) throw new Error("unreachable");

    const result = await verifyCertificate(issued.certificateNumber);
    expect(result.valid).toBe(true);
    if (!result.valid) throw new Error("unreachable");

    expect(result.studentName).toBe("Verify Test Student");
    expect(result.certificateNumber).toBe(issued.certificateNumber);
    expect(result.difficulty).toBe("advanced");

    // The response must never carry the score, the email, or any
    // assessment/transcript field — only the exact public shape.
    expect(Object.keys(result).sort()).toEqual(["careerPath", "certificateNumber", "difficulty", "issuedAt", "studentName", "valid"].sort());
  });

  it("returns valid:false for a certificate number that doesn't exist, echoing back only the number", async () => {
    const result = await verifyCertificate("LTV-PMI-DOES-NOT-EXIST");
    expect(result).toEqual({ valid: false, certificateNumber: "LTV-PMI-DOES-NOT-EXIST" });
  });

  it("trims whitespace from a pasted/scanned certificate number", async () => {
    const result = await verifyCertificate("   LTV-PMI-DOES-NOT-EXIST  ");
    expect(result.certificateNumber).toBe("LTV-PMI-DOES-NOT-EXIST");
  });
});
