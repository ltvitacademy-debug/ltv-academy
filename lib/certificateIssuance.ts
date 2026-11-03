// The single backend enforcement point for certificate issuance. No other
// code in this project is permitted to create a Certificate row directly —
// everything (the eventual Phase C scoring pipeline, an admin re-issue
// tool, anything) must go through issueCertificateIfEligible() so the
// Advanced-only / pass-only rule is enforced in exactly one place, in the
// backend, not just reflected in UI copy.
import { prisma } from "./db";
import { isCertificateEligible, type InterviewDifficulty, type InterviewOutcome } from "./mockInterviewTypes";

export type CertificateIssuanceParams = {
  sessionId: string;
  difficulty: InterviewDifficulty;
  outcome: InterviewOutcome;
  studentName: string;
  careerPath: string;
  overallScore: number;
};

export type CertificateIssuanceResult =
  | { issued: true; certificateId: string; certificateNumber: string }
  | { issued: false; reason: string };

export async function issueCertificateIfEligible(
  params: CertificateIssuanceParams
): Promise<CertificateIssuanceResult> {
  if (!isCertificateEligible(params.difficulty, params.outcome)) {
    const reason =
      params.outcome !== "pass"
        ? `Session outcome is "${params.outcome}", not "pass" — no certificate.`
        : `Difficulty "${params.difficulty}" is not certificate-eligible — only Advanced passes earn a certificate.`;
    return { issued: false, reason };
  }

  // Defensive re-check against the stored session, in case the caller
  // passed stale/incorrect params — never trust outcome/difficulty from the
  // caller alone for something as consequential as issuing a certificate.
  const session = await prisma.mockInterviewSession.findUnique({ where: { id: params.sessionId } });
  if (!session) return { issued: false, reason: "Session not found." };
  if (session.difficulty !== params.difficulty) {
    return { issued: false, reason: "Difficulty mismatch between request and stored session — refusing to issue." };
  }

  const existing = await prisma.certificate.findUnique({ where: { sessionId: params.sessionId } });
  if (existing) {
    return { issued: true, certificateId: existing.id, certificateNumber: existing.certificateNumber };
  }

  const certificateNumber = generateCertificateNumber();
  const certificate = await prisma.certificate.create({
    data: {
      sessionId: params.sessionId,
      certificateNumber,
      studentName: params.studentName,
      careerPath: params.careerPath,
      difficulty: params.difficulty,
      passingScore: params.overallScore,
    },
  });

  return { issued: true, certificateId: certificate.id, certificateNumber: certificate.certificateNumber };
}

function generateCertificateNumber(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `LTV-PMI-${stamp}-${rand}`;
}
