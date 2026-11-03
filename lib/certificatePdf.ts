// Phase C — printable PDF certificates (spec requirement 6). Pure
// generation: takes already-decided, already-certificate-eligible data in
// (nothing here decides eligibility — lib/certificateIssuance.ts is still
// the only place a Certificate row gets created) and returns PDF bytes.
//
// Brand fonts (Fraunces/Inter) aren't bundled as font files anywhere in this
// repo — they're loaded from Google Fonts in the browser, which a
// server-side PDF generator can't reach. This uses pdf-lib's built-in
// Times-Roman (serif, for the ceremonial feel) and Helvetica (for labels),
// which need no embedding. Swapping in the real brand fonts later just
// means adding the .ttf files and embedding them instead of StandardFonts.
import { PDFDocument, StandardFonts, rgb, type PDFPage, type PDFFont } from "pdf-lib";
import QRCode from "qrcode";
import type { InterviewDifficulty } from "./mockInterviewTypes";

// Brand hex values from CLAUDE.md, converted to pdf-lib's 0-1 rgb().
const CRIMSON = rgb(0x8e / 255, 0x1c / 255, 0x1c / 255);
const CRIMSON_DEEP = rgb(0x5e / 255, 0x0f / 255, 0x0f / 255);
const GOLD = rgb(0xc4 / 255, 0x95 / 255, 0x2e / 255);
const INK = rgb(0x1e / 255, 0x1a / 255, 0x16 / 255); // "black" per spec requirement 6
const STONE = rgb(0x6b / 255, 0x62 / 255, 0x59 / 255);
const WHITE = rgb(1, 1, 1);

const PAGE_WIDTH = 792; // 11in landscape
const PAGE_HEIGHT = 612; // 8.5in

function centerText(page: PDFPage, text: string, y: number, font: PDFFont, size: number, color = INK) {
  const width = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: (PAGE_WIDTH - width) / 2, y, size, font, color });
}

export type CertificatePdfInput = {
  certificateNumber: string;
  studentName: string;
  careerPathTitle: string;
  difficulty: InterviewDifficulty;
  passingScore: number;
  issuedAt: Date;
  verifyUrl: string;
};

export async function generateCertificatePdf(input: CertificatePdfInput): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`LTV Academy Certificate — ${input.studentName}`);
  doc.setAuthor("Lifting the Veil Information Technology Academy");

  const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const serifBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const serifItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);
  const sans = await doc.embedFont(StandardFonts.Helvetica);
  const sansBold = await doc.embedFont(StandardFonts.HelveticaBold);

  page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: WHITE });

  // Double border frame — crimson-deep outer, gold inner.
  page.drawRectangle({
    x: 24,
    y: 24,
    width: PAGE_WIDTH - 48,
    height: PAGE_HEIGHT - 48,
    borderColor: CRIMSON_DEEP,
    borderWidth: 4,
  });
  page.drawRectangle({
    x: 36,
    y: 36,
    width: PAGE_WIDTH - 72,
    height: PAGE_HEIGHT - 72,
    borderColor: GOLD,
    borderWidth: 1.5,
  });

  centerText(page, "LIFTING THE VEIL", PAGE_HEIGHT - 80, sansBold, 14, CRIMSON_DEEP);
  centerText(page, "INFORMATION TECHNOLOGY ACADEMY  ·  EST. 2017", PAGE_HEIGHT - 98, sans, 9, STONE);

  centerText(page, "Certificate of Successful Completion", PAGE_HEIGHT - 150, serifBold, 30, INK);
  page.drawLine({
    start: { x: PAGE_WIDTH / 2 - 120, y: PAGE_HEIGHT - 162 },
    end: { x: PAGE_WIDTH / 2 + 120, y: PAGE_HEIGHT - 162 },
    thickness: 1,
    color: GOLD,
  });

  centerText(page, "This certifies that", PAGE_HEIGHT - 205, serifItalic, 14, STONE);
  centerText(page, input.studentName, PAGE_HEIGHT - 240, serifBold, 26, CRIMSON);
  centerText(
    page,
    "has successfully completed the LTV Academy Professional Mock Interview for",
    PAGE_HEIGHT - 270,
    serif,
    13,
    INK
  );
  const difficultyLabel = input.difficulty.charAt(0).toUpperCase() + input.difficulty.slice(1);
  centerText(page, `${input.careerPathTitle} — ${difficultyLabel}`, PAGE_HEIGHT - 296, serifBold, 17, INK);
  centerText(page, `demonstrating all required technical and professional competencies.`, PAGE_HEIGHT - 320, serif, 12, STONE);

  const issuedLabel = input.issuedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  centerText(page, `Final score: ${input.passingScore}/100  ·  Issued ${issuedLabel}`, PAGE_HEIGHT - 348, sans, 11, STONE);

  // Signature block (left of center).
  const sigY = 100;
  page.drawLine({ start: { x: 110, y: sigY + 24 }, end: { x: 330, y: sigY + 24 }, thickness: 1, color: CRIMSON_DEEP });
  page.drawText("Bill Green", { x: 110, y: sigY + 30, size: 14, font: serifBold, color: INK });
  page.drawText("Founder, Lifting the Veil IT Academy", { x: 110, y: sigY + 8, size: 9, font: sans, color: STONE });

  // Certificate number + verification QR (right side).
  const qrPngDataUrl = await QRCode.toDataURL(input.verifyUrl, { margin: 1, color: { dark: "#1e1a16", light: "#ffffff" } });
  const qrPngBytes = Buffer.from(qrPngDataUrl.split(",")[1], "base64");
  const qrImage = await doc.embedPng(qrPngBytes);
  const qrSize = 72;
  page.drawImage(qrImage, { x: PAGE_WIDTH - 150, y: sigY - 4, width: qrSize, height: qrSize });
  page.drawText("Scan to verify", { x: PAGE_WIDTH - 150, y: sigY + qrSize + 2, size: 8, font: sans, color: STONE });
  page.drawText(`Certificate No. ${input.certificateNumber}`, { x: 36, y: 50, size: 9, font: sans, color: STONE });

  return doc.save();
}
