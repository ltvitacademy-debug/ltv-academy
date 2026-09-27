// The Integration Architecture Case Studies course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/integration-architecture-case-studies/
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

export const SFTA_INTEGRATION_ARCHITECTURE_CASE_STUDIES_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Integration Case Studies",
    lessons: [
      L(1, "case-study-salesforce-and-erp", "Case Study: Salesforce and ERP"),
      L(2, "case-study-salesforce-and-a-financial-system", "Case Study: Salesforce and a Financial System"),
      L(3, "case-study-salesforce-and-a-data-warehouse", "Case Study: Salesforce and a Data Warehouse"),
      L(4, "case-study-salesforce-and-external-applications", "Case Study: Salesforce and External Applications"),
      L(5, "reviewing-your-integration-designs", "Reviewing Your Integration Designs"),
    ],
  },
];
