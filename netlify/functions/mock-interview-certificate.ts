// Printable PDF certificate download (spec Phase C requirement 6).
//
// GET /api/mock-interview-certificate?sessionId=<id>&accessToken=<token>
//   -> application/pdf, or a JSON error
//
// Ownership (spec requirement 9): same per-session accessToken check as the
// other session-scoped endpoints. Certificate ELIGIBILITY itself was
// already decided once, by lib/certificateIssuance.ts, at grading time —
// this function never re-decides it; it only renders whatever Certificate
// row already exists (or says there isn't one).
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { authorizeSessionAccess, getSiteUrl } from "../../lib/mockInterviewAuth";
import { generateCertificatePdf } from "../../lib/certificatePdf";
import { getCareerPath } from "../../lib/career-paths";
import type { InterviewDifficulty } from "../../lib/mockInterviewTypes";

export default async (req: Request) => {
  if (req.method !== "GET") return json({ error: "Method not allowed" }, 405);

  const params = new URL(req.url).searchParams;
  const sessionId = params.get("sessionId");
  const accessToken = params.get("accessToken");
  if (!sessionId) return json({ error: "Missing sessionId" }, 400);

  const session = await prisma.mockInterviewSession.findUnique({ where: { id: sessionId } });
  if (!session || !(await authorizeSessionAccess({ req, providedAccessToken: accessToken, session }))) {
    return json({ error: "Session not found" }, 404);
  }

  const certificate = await prisma.certificate.findUnique({ where: { sessionId } });
  if (!certificate) {
    return json({ error: "No certificate has been issued for this session." }, 404);
  }

  const pdfBytes = await generateCertificatePdf({
    certificateNumber: certificate.certificateNumber,
    studentName: certificate.studentName,
    careerPathTitle: getCareerPath(certificate.careerPath)?.title ?? certificate.careerPath,
    difficulty: certificate.difficulty as InterviewDifficulty,
    passingScore: certificate.passingScore,
    issuedAt: certificate.issuedAt,
    verifyUrl: `${getSiteUrl()}/verify?number=${encodeURIComponent(certificate.certificateNumber)}`,
  });

  return new Response(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `inline; filename="LTV-Academy-Certificate-${certificate.certificateNumber}.pdf"`,
    },
  });
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/mock-interview-certificate",
};
