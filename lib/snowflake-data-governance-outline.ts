// The Snowflake Data Governance course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/snowflake-data-governance/
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

export const GOV_SNOWFLAKE_DATA_GOVERNANCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Snowflake Governance Foundations",
    lessons: [
      L(1, "governance-in-snowflake", "Governance in Snowflake"),
      L(2, "account-database-and-schema-structure", "Account, Database and Schema Structure"),
      L(3, "roles-and-the-role-hierarchy", "Roles and the Role Hierarchy"),
      L(4, "rbac-in-snowflake", "RBAC in Snowflake"),
      L(5, "access-control-best-practices", "Access Control Best Practices"),
    ],
  },
  {
    n: 2,
    title: "Data Protection",
    lessons: [
      L(6, "dynamic-data-masking", "Dynamic Data Masking"),
      L(7, "masking-policies", "Masking Policies"),
      L(8, "row-access-policies", "Row Access Policies"),
      L(9, "secure-views", "Secure Views"),
      L(10, "tag-based-masking", "Tag-Based Masking"),
    ],
  },
  {
    n: 3,
    title: "Tags and Classification",
    lessons: [
      L(11, "object-tagging", "Object Tagging"),
      L(12, "tag-propagation", "Tag Propagation"),
      L(13, "data-classification", "Data Classification"),
      L(14, "sensitive-data-discovery", "Sensitive Data Discovery"),
      L(15, "governance-through-tags", "Governance Through Tags"),
    ],
  },
  {
    n: 4,
    title: "Auditing and Monitoring",
    lessons: [
      L(16, "access-history-and-query-history", "Access History and Query History"),
      L(17, "account-usage-views", "Account Usage Views"),
      L(18, "auditing-access", "Auditing Access"),
      L(19, "monitoring-governance", "Monitoring Governance"),
      L(20, "governance-dashboards-in-snowflake", "Governance Dashboards in Snowflake"),
    ],
  },
  {
    n: 5,
    title: "Enterprise Governance",
    lessons: [
      L(21, "data-sharing-and-governance", "Data Sharing and Governance"),
      L(22, "data-retention-and-time-travel", "Data Retention and Time Travel"),
      L(23, "cross-account-governance", "Cross-Account Governance"),
      L(24, "snowflake-governance-case-study", "Snowflake Governance Case Study"),
      L(25, "snowflake-governance-practice-lab", "Snowflake Governance Practice Lab"),
    ],
  },
];
