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
  {
    n: 2,
    title: "Deep Dives",
    lessons: [
      L(9, "crm-plus-erp-data-ownership-and-sync-design", "CRM + ERP: Data Ownership and Sync Design"),
      L(10, "crm-plus-erp-failure-and-reconciliation", "CRM + ERP: Failure and Reconciliation"),
      L(11, "crm-plus-data-warehouse-extraction-and-volume", "CRM + Data Warehouse: Extraction and Volume"),
      L(12, "crm-plus-identity-provider-federation-design", "CRM + Identity Provider: Federation Design"),
      L(13, "crm-plus-customer-portal-sharing-and-scale", "CRM + Customer Portal: Sharing and Scale"),
      L(14, "crm-plus-external-apis-limits-and-resilience", "CRM + External APIs: Limits and Resilience"),
    ],
  },
  {
    n: 3,
    title: "Review and Defense",
    lessons: [
      L(15, "comparing-designs-across-cases", "Comparing Designs Across Cases"),
      L(16, "security-and-governance-review", "Security and Governance Review"),
      L(17, "presenting-an-enterprise-integration-design", "Presenting an Enterprise Integration Design"),
      L(18, "answering-reviewer-objections", "Answering Reviewer Objections"),
      L(19, "enterprise-integration-mock-review-board", "Enterprise Integration Mock Review Board"),
      L(20, "enterprise-integration-portfolio-review", "Enterprise Integration Portfolio Review"),
    ],
  },
];
