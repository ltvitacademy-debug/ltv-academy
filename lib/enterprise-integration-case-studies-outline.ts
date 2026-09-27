// The Enterprise Integration Case Studies course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/enterprise-integration-case-studies/
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

export const SFTA_ENTERPRISE_INTEGRATION_CASE_STUDIES_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Enterprise Integration Case Studies",
    lessons: [
      L(1, "case-study-crm-plus-erp", "Case Study: CRM + ERP"),
      L(2, "case-study-crm-plus-data-warehouse", "Case Study: CRM + Data Warehouse"),
      L(3, "case-study-crm-plus-identity-provider", "Case Study: CRM + Identity Provider"),
      L(4, "case-study-crm-plus-customer-portal", "Case Study: CRM + Customer Portal"),
      L(5, "case-study-crm-plus-external-apis", "Case Study: CRM + External APIs"),
      L(6, "combining-patterns-in-one-landscape", "Combining Patterns in One Landscape"),
      L(7, "failure-scenario-review", "Failure Scenario Review"),
      L(8, "enterprise-integration-wrap-up", "Enterprise Integration Wrap-Up"),
    ],
  },
];
