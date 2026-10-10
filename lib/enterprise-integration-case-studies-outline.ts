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
      L(1, "case-study-crm-plus-erp", "Case Study: CRM + ERP", { contentDir: "ch01/01-case-study-crm-plus-erp" }),
      L(2, "case-study-crm-plus-data-warehouse", "Case Study: CRM + Data Warehouse", { contentDir: "ch01/02-case-study-crm-plus-data-warehouse" }),
      L(3, "case-study-crm-plus-identity-provider", "Case Study: CRM + Identity Provider", { contentDir: "ch01/03-case-study-crm-plus-identity-provider" }),
      L(4, "case-study-crm-plus-customer-portal", "Case Study: CRM + Customer Portal", { contentDir: "ch01/04-case-study-crm-plus-customer-portal" }),
      L(5, "case-study-crm-plus-external-apis", "Case Study: CRM + External APIs", { contentDir: "ch01/05-case-study-crm-plus-external-apis" }),
      L(6, "combining-patterns-in-one-landscape", "Combining Patterns in One Landscape", { contentDir: "ch01/06-combining-patterns-in-one-landscape" }),
      L(7, "failure-scenario-review", "Failure Scenario Review", { contentDir: "ch01/07-failure-scenario-review" }),
      L(8, "enterprise-integration-wrap-up", "Enterprise Integration Wrap-Up", { contentDir: "ch01/08-enterprise-integration-wrap-up" }),
    ],
  },
  {
    n: 2,
    title: "Deep Dives",
    lessons: [
      L(9, "crm-plus-erp-data-ownership-and-sync-design", "CRM + ERP: Data Ownership and Sync Design", { contentDir: "ch02/09-crm-plus-erp-data-ownership-and-sync-design" }),
      L(10, "crm-plus-erp-failure-and-reconciliation", "CRM + ERP: Failure and Reconciliation", { contentDir: "ch02/10-crm-plus-erp-failure-and-reconciliation" }),
      L(11, "crm-plus-data-warehouse-extraction-and-volume", "CRM + Data Warehouse: Extraction and Volume", { contentDir: "ch02/11-crm-plus-data-warehouse-extraction-and-volume" }),
      L(12, "crm-plus-identity-provider-federation-design", "CRM + Identity Provider: Federation Design", { contentDir: "ch02/12-crm-plus-identity-provider-federation-design" }),
      L(13, "crm-plus-customer-portal-sharing-and-scale", "CRM + Customer Portal: Sharing and Scale", { contentDir: "ch02/13-crm-plus-customer-portal-sharing-and-scale" }),
      L(14, "crm-plus-external-apis-limits-and-resilience", "CRM + External APIs: Limits and Resilience", { contentDir: "ch02/14-crm-plus-external-apis-limits-and-resilience" }),
    ],
  },
  {
    n: 3,
    title: "Review and Defense",
    lessons: [
      L(15, "comparing-designs-across-cases", "Comparing Designs Across Cases", { contentDir: "ch03/15-comparing-designs-across-cases" }),
      L(16, "security-and-governance-review", "Security and Governance Review", { contentDir: "ch03/16-security-and-governance-review" }),
      L(17, "presenting-an-enterprise-integration-design", "Presenting an Enterprise Integration Design", { contentDir: "ch03/17-presenting-an-enterprise-integration-design" }),
      L(18, "answering-reviewer-objections", "Answering Reviewer Objections", { contentDir: "ch03/18-answering-reviewer-objections" }),
      L(19, "enterprise-integration-mock-review-board", "Enterprise Integration Mock Review Board", { contentDir: "ch03/19-enterprise-integration-mock-review-board" }),
      L(20, "enterprise-integration-portfolio-review", "Enterprise Integration Portfolio Review", { contentDir: "ch03/20-enterprise-integration-portfolio-review" }),
    ],
  },
];
