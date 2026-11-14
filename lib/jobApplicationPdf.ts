// Career Launch — downloadable tailored resume PDF. Pure generation, same
// "bytes on request, nothing persisted" pattern as lib/certificatePdf.ts:
// this never touches the database or decides anything, it just renders
// already-decided text (the AI-tailored resume from
// lib/resumeTailoringEngine.ts, approved by staff) into a PDF.
import { PDFDocument, StandardFonts, rgb, type PDFPage, type PDFFont } from "pdf-lib";

const INK = rgb(0x1e / 255, 0x1a / 255, 0x16 / 255);
const CRIMSON_DEEP = rgb(0x5e / 255, 0x0f / 255, 0x0f / 255);
const STONE = rgb(0x6b / 255, 0x62 / 255, 0x59 / 255);
const WHITE = rgb(1, 1, 1);

const PAGE_WIDTH = 612; // 8.5in
const PAGE_HEIGHT = 792; // 11in
const MARGIN = 54;
const MAX_LINE_WIDTH = PAGE_WIDTH - MARGIN * 2;

export type JobApplicationPdfInput = {
  studentName: string;
  roleTitle: string;
  company: string;
  tailoredResumeText: string;
  coverLetterText: string | null;
};

function wrapLines(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    if (!paragraph.trim()) {
      lines.push("");
      continue;
    }
    let current = "";
    for (const word of paragraph.split(/\s+/)) {
      const candidate = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

export async function generateJobApplicationPdf(input: JobApplicationPdfInput): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`${input.studentName} — Resume for ${input.roleTitle} at ${input.company}`);
  doc.setAuthor("Lifting the Veil Information Technology Academy");

  const serifBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const sans = await doc.embedFont(StandardFonts.Helvetica);
  const sansBold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: WHITE });
  let cursorY = PAGE_HEIGHT - MARGIN;

  const newPageIfNeeded = (neededHeight: number) => {
    if (cursorY - neededHeight < MARGIN) {
      page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: WHITE });
      cursorY = PAGE_HEIGHT - MARGIN;
    }
  };

  const drawParagraph = (text: string, font: PDFFont, size: number, color = INK, lineGap = 4) => {
    for (const line of wrapLines(text, font, size, MAX_LINE_WIDTH)) {
      newPageIfNeeded(size + lineGap);
      if (line) page.drawText(line, { x: MARGIN, y: cursorY, size, font, color });
      cursorY -= size + lineGap;
    }
  };

  page.drawText(input.studentName, { x: MARGIN, y: cursorY, size: 20, font: serifBold, color: CRIMSON_DEEP });
  cursorY -= 26;
  page.drawText(`Tailored for: ${input.roleTitle} — ${input.company}`, { x: MARGIN, y: cursorY, size: 11, font: sans, color: STONE });
  cursorY -= 24;

  page.drawText("RESUME", { x: MARGIN, y: cursorY, size: 12, font: sansBold, color: CRIMSON_DEEP });
  cursorY -= 18;
  drawParagraph(input.tailoredResumeText, sans, 10.5);

  if (input.coverLetterText) {
    cursorY -= 12;
    newPageIfNeeded(18);
    page.drawText("COVER LETTER", { x: MARGIN, y: cursorY, size: 12, font: sansBold, color: CRIMSON_DEEP });
    cursorY -= 18;
    drawParagraph(input.coverLetterText, sans, 10.5);
  }

  return doc.save();
}
