import fs from "fs";
import path from "path";

// A path's sample resumes live as public/downloads/resumes/<pathSlug>/*.docx —
// a fictional "John Doe" resume showing what a graduate can credibly claim after
// finishing that path's stages. Mirrors the interview-prep bank lookup pattern.
export type SampleResume = { label: string; href: string };

const RESUME_FILES: { file: string; label: string }[] = [
  { file: "job-ready-resume.docx", label: "Job-Ready resume (.docx)" },
  { file: "advanced-resume.docx", label: "Advanced resume (.docx)" },
];

export function getSampleResumes(pathSlug: string): SampleResume[] {
  const dir = path.join(process.cwd(), "public", "downloads", "resumes", pathSlug);
  if (!fs.existsSync(dir)) return [];

  return RESUME_FILES.filter((r) => fs.existsSync(path.join(dir, r.file))).map((r) => ({
    label: r.label,
    href: `/downloads/resumes/${pathSlug}/${r.file}`,
  }));
}
