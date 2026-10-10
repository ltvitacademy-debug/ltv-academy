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
      L(1, "case-study-salesforce-and-erp", "Case Study: Salesforce and ERP", { contentDir: "ch01/01-case-study-salesforce-and-erp" }),
      L(2, "case-study-salesforce-and-a-financial-system", "Case Study: Salesforce and a Financial System", { contentDir: "ch01/02-case-study-salesforce-and-a-financial-system" }),
      L(3, "case-study-salesforce-and-a-data-warehouse", "Case Study: Salesforce and a Data Warehouse", { contentDir: "ch01/03-case-study-salesforce-and-a-data-warehouse" }),
      L(4, "case-study-salesforce-and-external-applications", "Case Study: Salesforce and External Applications", { contentDir: "ch01/04-case-study-salesforce-and-external-applications" }),
      L(5, "case-study-salesforce-and-a-marketing-platform", "Case Study: Salesforce and a Marketing Platform", { contentDir: "ch01/05-case-study-salesforce-and-a-marketing-platform" }),
    ],
  },
  {
    n: 2,
    title: "Reviewing Designs",
    lessons: [
      L(6, "comparing-integration-designs", "Comparing Integration Designs", { contentDir: "ch02/06-comparing-integration-designs" }),
      L(7, "failure-scenarios-in-each-design", "Failure Scenarios in Each Design", { contentDir: "ch02/07-failure-scenarios-in-each-design" }),
      L(8, "security-review-of-each-design", "Security Review of Each Design", { contentDir: "ch02/08-security-review-of-each-design" }),
      L(9, "documenting-integration-decisions", "Documenting Integration Decisions", { contentDir: "ch02/09-documenting-integration-decisions" }),
      L(10, "reviewing-your-integration-designs", "Reviewing Your Integration Designs", { contentDir: "ch02/10-reviewing-your-integration-designs" }),
    ],
  },
  {
    n: 3,
    title: "Presenting",
    lessons: [
      L(11, "presenting-an-integration-design", "Presenting an Integration Design", { contentDir: "ch03/11-presenting-an-integration-design" }),
      L(12, "answering-reviewer-objections", "Answering Reviewer Objections", { contentDir: "ch03/12-answering-reviewer-objections" }),
      L(13, "integration-case-study-wrap-up", "Integration Case Study Wrap-Up", { contentDir: "ch03/13-integration-case-study-wrap-up" }),
      L(14, "integration-case-studies-mock-review-board", "Integration Case Studies Mock Review Board", { contentDir: "ch03/14-integration-case-studies-mock-review-board" }),
    ],
  },
];
