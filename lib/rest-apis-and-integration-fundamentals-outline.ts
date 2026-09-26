// The REST APIs & Integration Fundamentals course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 06. Integration concepts for functional consultants.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/rest-apis-and-integration-fundamentals/
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

export const REST_APIS_AND_INTEGRATION_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "API Basics",
    lessons: [
      L(1, "rest-api-basics", "REST API Basics"),
      L(2, "json-basics", "JSON Basics"),
      L(3, "authentication-concepts", "Authentication Concepts"),
    ],
  },
  {
    n: 2,
    title: "Integrating with Oracle Fusion",
    lessons: [
      L(4, "oracle-fusion-rest-resources-and-queries", "Oracle Fusion REST Resources and Queries"),
      L(5, "integration-patterns", "Integration Patterns"),
      L(6, "exchanging-financial-data-with-external-applications", "Exchanging Financial Data with External Applications"),
    ],
  },
];
