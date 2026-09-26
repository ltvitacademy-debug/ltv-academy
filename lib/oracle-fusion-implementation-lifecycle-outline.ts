// The Oracle Fusion Implementation Lifecycle course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 07. How real Oracle Fusion Financials implementations run from requirements to production support.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-implementation-lifecycle/
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

export const ORACLE_FUSION_IMPLEMENTATION_LIFECYCLE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Requirements and Design",
    lessons: [
      L(1, "requirements-gathering", "Requirements Gathering"),
      L(2, "fit-gap-analysis", "Fit-Gap Analysis"),
      L(3, "configuration-workbooks", "Configuration Workbooks"),
    ],
  },
  {
    n: 2,
    title: "Build, Test and Go-Live",
    lessons: [
      L(4, "dev-test-and-prod-environments", "DEV, TEST and PROD Environments"),
      L(5, "data-migration", "Data Migration"),
      L(6, "system-integration-testing-and-user-acceptance-testing", "System Integration Testing and User Acceptance Testing"),
      L(7, "deployment-and-production-support", "Deployment and Production Support"),
    ],
  },
];
