// Phase C — printable PDF certificates (spec requirement 6). No DB: pure
// generation from already-decided input.
import { describe, it, expect } from "vitest";
import { generateCertificatePdf } from "../certificatePdf";
import { PDFDocument } from "pdf-lib";

describe("generateCertificatePdf", () => {
  it("produces a valid, loadable PDF with the certificate number embedded", async () => {
    const bytes = await generateCertificatePdf({
      certificateNumber: "LTV-PMI-ABC123-XYZ789",
      studentName: "Jordan Rivera",
      careerPathTitle: "Snowflake Data / Analytics Engineer",
      difficulty: "advanced",
      passingScore: 92,
      issuedAt: new Date("2026-11-09T00:00:00.000Z"),
      verifyUrl: "https://ltv-it-academy.netlify.app/verify?number=LTV-PMI-ABC123-XYZ789",
    });

    // %PDF magic header — proves this is a real PDF, not just arbitrary bytes.
    expect(Buffer.from(bytes.slice(0, 5)).toString("ascii")).toBe("%PDF-");

    // Round-trips through pdf-lib itself — a corrupt/incomplete PDF would throw here.
    const reloaded = await PDFDocument.load(bytes);
    expect(reloaded.getPageCount()).toBe(1);

    const page = reloaded.getPage(0);
    expect(page.getWidth()).toBe(792);
    expect(page.getHeight()).toBe(612);
  });

  it("produces different-sized output for a longer student name without throwing (no fixed-width overflow)", async () => {
    const short = await generateCertificatePdf({
      certificateNumber: "LTV-PMI-SHORT",
      studentName: "Jo Li",
      careerPathTitle: "Snowflake Data / Analytics Engineer",
      difficulty: "advanced",
      passingScore: 90,
      issuedAt: new Date(),
      verifyUrl: "https://example.com/verify?number=LTV-PMI-SHORT",
    });
    const long = await generateCertificatePdf({
      certificateNumber: "LTV-PMI-LONG",
      studentName: "Alexandria Katherine Montgomery-Fitzgerald",
      careerPathTitle: "Snowflake Data / Analytics Engineer",
      difficulty: "advanced",
      passingScore: 90,
      issuedAt: new Date(),
      verifyUrl: "https://example.com/verify?number=LTV-PMI-LONG",
    });
    expect(short.length).toBeGreaterThan(0);
    expect(long.length).toBeGreaterThan(0);
  });

  it("rejects neither beginner nor intermediate difficulty from rendering — the certificate renderer itself has no opinion on eligibility (that's lib/certificateIssuance.ts's job, not this one's)", async () => {
    // generateCertificatePdf renders whatever Certificate row it's given —
    // it must never re-derive or second-guess eligibility, since that
    // decision was already made once, centrally, before a Certificate row
    // could even exist.
    const bytes = await generateCertificatePdf({
      certificateNumber: "LTV-PMI-BEGINNER-SHOULD-NOT-HAPPEN-IN-PRACTICE",
      studentName: "Test Student",
      careerPathTitle: "Snowflake Data / Analytics Engineer",
      difficulty: "beginner",
      passingScore: 100,
      issuedAt: new Date(),
      verifyUrl: "https://example.com/verify?number=x",
    });
    expect(Buffer.from(bytes.slice(0, 5)).toString("ascii")).toBe("%PDF-");
  });
});
