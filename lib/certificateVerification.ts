// Phase C — public certificate verification (spec requirement 7). Deliberately
// returns ONLY what a real paper-certificate verification service would show
// a stranger: whether the number is real, the name, path, difficulty, and
// issue date. NEVER the score, the transcript, the student's email, or any
// assessment detail — this is the single function the public verification
// endpoint is allowed to call, so that boundary lives in exactly one place.
import { prisma } from "./db";
import { getCareerPath } from "./career-paths";
import type { InterviewDifficulty, PublicCertificateVerificationDTO } from "./mockInterviewTypes";

export async function verifyCertificate(certificateNumber: string): Promise<PublicCertificateVerificationDTO> {
  const trimmed = certificateNumber.trim();
  const certificate = await prisma.certificate.findUnique({ where: { certificateNumber: trimmed } });
  if (!certificate) {
    return { valid: false, certificateNumber: trimmed };
  }
  return {
    valid: true,
    certificateNumber: certificate.certificateNumber,
    studentName: certificate.studentName,
    careerPath: getCareerPath(certificate.careerPath)?.title ?? certificate.careerPath,
    difficulty: certificate.difficulty as InterviewDifficulty,
    issuedAt: certificate.issuedAt.toISOString(),
  };
}
