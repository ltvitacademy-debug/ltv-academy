// The Salesforce DX course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-dx/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const SFTA_SALESFORCE_DX_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Salesforce DX Basics",
    lessons: [
      L(1, "salesforce-cli", "Salesforce CLI"),
      L(2, "source-driven-development", "Source-Driven Development"),
      L(3, "dev-hub", "Dev Hub"),
      L(4, "scratch-orgs", "Scratch Orgs"),
    ],
  },
  {
    n: 2,
    title: "Projects and Metadata",
    lessons: [
      L(5, "project-structure", "Project Structure"),
      L(6, "metadata", "Metadata"),
      L(7, "working-in-vs-code", "Working in VS Code"),
      L(8, "packaging-concepts", "Packaging Concepts"),
    ],
  },
];
