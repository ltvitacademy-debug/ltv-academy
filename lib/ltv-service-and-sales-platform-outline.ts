// The LTV Service & Sales Platform course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ltv-service-and-sales-platform/
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

export const SFTA_LTV_SERVICE_AND_SALES_PLATFORM_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Capstone II",
    lessons: [
      L(1, "capstone-kickoff-and-requirements", "Capstone Kickoff and Requirements"),
      L(2, "custom-data-model", "Custom Data Model"),
      L(3, "complex-flow", "Complex Flow"),
      L(4, "apex", "Apex"),
      L(5, "soql", "SOQL"),
      L(6, "apex-tests", "Apex Tests"),
      L(7, "lightning-web-components", "Lightning Web Components"),
      L(8, "rest-integration", "REST Integration"),
      L(9, "security-model", "Security Model"),
      L(10, "reports", "Reports"),
      L(11, "deployment", "Deployment"),
      L(12, "documentation-and-presentation", "Documentation and Presentation"),
    ],
  },
];
