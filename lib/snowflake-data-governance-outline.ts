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
      L(1, "governance-in-snowflake", "Governance in Snowflake", { contentDir: "ch01/01-governance-in-snowflake" }),
      L(2, "account-database-and-schema-structure", "Account, Database and Schema Structure", { contentDir: "ch01/02-account-database-and-schema-structure" }),
      L(3, "roles-and-the-role-hierarchy", "Roles and the Role Hierarchy", { contentDir: "ch01/03-roles-and-the-role-hierarchy" }),
      L(4, "rbac-in-snowflake", "RBAC in Snowflake", { contentDir: "ch01/04-rbac-in-snowflake" }),
      L(5, "access-control-best-practices", "Access Control Best Practices", { contentDir: "ch01/05-access-control-best-practices" }),
    ],
  },
  {
    n: 2,
    title: "Data Protection",
    lessons: [
      L(6, "dynamic-data-masking", "Dynamic Data Masking", { contentDir: "ch02/06-dynamic-data-masking" }),
      L(7, "masking-policies", "Masking Policies", { contentDir: "ch02/07-masking-policies" }),
      L(8, "row-access-policies", "Row Access Policies", { contentDir: "ch02/08-row-access-policies" }),
      L(9, "secure-views", "Secure Views", { contentDir: "ch02/09-secure-views" }),
      L(10, "tag-based-masking", "Tag-Based Masking", { contentDir: "ch03/10-tag-based-masking" }),
    ],
  },
  {
    n: 3,
    title: "Tags and Classification",
    lessons: [
      L(11, "object-tagging", "Object Tagging", { contentDir: "ch03/11-object-tagging" }),
      L(12, "tag-propagation", "Tag Propagation", { contentDir: "ch03/12-tag-propagation" }),
      L(13, "data-classification", "Data Classification", { contentDir: "ch03/13-data-classification" }),
      L(14, "sensitive-data-discovery", "Sensitive Data Discovery", { contentDir: "ch03/14-sensitive-data-discovery" }),
      L(15, "governance-through-tags", "Governance Through Tags", { contentDir: "ch03/15-governance-through-tags" }),
    ],
  },
  {
    n: 4,
    title: "Auditing and Monitoring",
    lessons: [
      L(16, "access-history-and-query-history", "Access History and Query History", { contentDir: "ch04/16-access-history-and-query-history" }),
      L(17, "account-usage-views", "Account Usage Views", { contentDir: "ch04/17-account-usage-views" }),
      L(18, "auditing-access", "Auditing Access", { contentDir: "ch04/18-auditing-access" }),
      L(19, "monitoring-governance", "Monitoring Governance", { contentDir: "ch04/19-monitoring-governance" }),
      L(20, "governance-dashboards-in-snowflake", "Governance Dashboards in Snowflake", { contentDir: "ch04/20-governance-dashboards-in-snowflake" }),
    ],
  },
  {
    n: 5,
    title: "Enterprise Governance",
    lessons: [
      L(21, "data-sharing-and-governance", "Data Sharing and Governance", { contentDir: "ch05/21-data-sharing-and-governance" }),
      L(22, "data-retention-and-time-travel", "Data Retention and Time Travel", { contentDir: "ch05/22-data-retention-and-time-travel" }),
      L(23, "cross-account-governance", "Cross-Account Governance", { contentDir: "ch05/23-cross-account-governance" }),
      L(24, "snowflake-governance-case-study", "Snowflake Governance Case Study", { contentDir: "ch05/24-snowflake-governance-case-study" }),
      L(25, "snowflake-governance-practice-lab", "Snowflake Governance Practice Lab", { contentDir: "ch05/25-snowflake-governance-practice-lab" }),
    ],
  },
];
