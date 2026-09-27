// The Salesforce APIs course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-apis/
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

export const SFTA_SALESFORCE_APIS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Working with Salesforce APIs",
    lessons: [
      L(1, "salesforce-api-overview", "Salesforce API Overview"),
      L(2, "the-rest-api", "The REST API"),
      L(3, "soap-api-concepts", "SOAP API Concepts"),
      L(4, "the-bulk-api", "The Bulk API"),
    ],
  },
  {
    n: 2,
    title: "Using the APIs",
    lessons: [
      L(5, "authentication", "Authentication"),
      L(6, "json", "JSON"),
      L(7, "connecting-external-applications", "Connecting External Applications"),
      L(8, "api-limits-and-best-practices", "API Limits and Best Practices"),
    ],
  },
];
