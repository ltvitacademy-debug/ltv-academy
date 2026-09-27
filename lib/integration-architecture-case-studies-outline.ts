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
      L(5, "case-study-salesforce-and-a-marketing-platform", "Case Study: Salesforce and a Marketing Platform"),
    ],
  },
  {
    n: 2,
    title: "Reviewing Designs",
    lessons: [
      L(6, "comparing-integration-designs", "Comparing Integration Designs"),
      L(7, "failure-scenarios-in-each-design", "Failure Scenarios in Each Design"),
      L(8, "security-review-of-each-design", "Security Review of Each Design"),
      L(9, "documenting-integration-decisions", "Documenting Integration Decisions"),
      L(10, "reviewing-your-integration-designs", "Reviewing Your Integration Designs"),
    ],
  },
  {
    n: 3,
    title: "Presenting",
    lessons: [
      L(11, "presenting-an-integration-design", "Presenting an Integration Design"),
      L(12, "answering-reviewer-objections", "Answering Reviewer Objections"),
      L(13, "integration-case-study-wrap-up", "Integration Case Study Wrap-Up"),
      L(14, "integration-case-studies-mock-review-board", "Integration Case Studies Mock Review Board"),
    ],
  },
];
