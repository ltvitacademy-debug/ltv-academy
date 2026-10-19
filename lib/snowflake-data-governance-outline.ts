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
      L(1, "governance-in-snowflake", "Governance in Snowflake", { contentDir: "ch01/01-governance-in-snowflake", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408273/ltv-snowflake-data-governance/governance-in-snowflake.mp4", durationLabel: "2 min 17 s" }),
      L(2, "account-database-and-schema-structure", "Account, Database and Schema Structure", { contentDir: "ch01/02-account-database-and-schema-structure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408556/ltv-snowflake-data-governance/account-database-and-schema-structure.mp4", durationLabel: "1 min 54 s" }),
      L(3, "roles-and-the-role-hierarchy", "Roles and the Role Hierarchy", { contentDir: "ch01/03-roles-and-the-role-hierarchy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408750/ltv-snowflake-data-governance/roles-and-the-role-hierarchy.mp4", durationLabel: "1 min 59 s" }),
      L(4, "rbac-in-snowflake", "RBAC in Snowflake", { contentDir: "ch01/04-rbac-in-snowflake", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409019/ltv-snowflake-data-governance/rbac-in-snowflake.mp4", durationLabel: "2 min 29 s" }),
      L(5, "access-control-best-practices", "Access Control Best Practices", { contentDir: "ch01/05-access-control-best-practices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409225/ltv-snowflake-data-governance/access-control-best-practices.mp4", durationLabel: "2 min 4 s" }),
    ],
  },
  {
    n: 2,
    title: "Data Protection",
    lessons: [
      L(6, "dynamic-data-masking", "Dynamic Data Masking", { contentDir: "ch02/06-dynamic-data-masking", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409390/ltv-snowflake-data-governance/dynamic-data-masking.mp4", durationLabel: "1 min 27 s" }),
      L(7, "masking-policies", "Masking Policies", { contentDir: "ch02/07-masking-policies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409573/ltv-snowflake-data-governance/masking-policies.mp4", durationLabel: "1 min 36 s" }),
      L(8, "row-access-policies", "Row Access Policies", { contentDir: "ch02/08-row-access-policies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409744/ltv-snowflake-data-governance/row-access-policies.mp4", durationLabel: "1 min 30 s" }),
      L(9, "secure-views", "Secure Views", { contentDir: "ch02/09-secure-views", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409934/ltv-snowflake-data-governance/secure-views.mp4", durationLabel: "1 min 31 s" }),
      L(10, "tag-based-masking", "Tag-Based Masking", { contentDir: "ch03/10-tag-based-masking", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410153/ltv-snowflake-data-governance/tag-based-masking.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 3,
    title: "Tags and Classification",
    lessons: [
      L(11, "object-tagging", "Object Tagging", { contentDir: "ch03/11-object-tagging", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410352/ltv-snowflake-data-governance/object-tagging.mp4", durationLabel: "1 min 39 s" }),
      L(12, "tag-propagation", "Tag Propagation", { contentDir: "ch03/12-tag-propagation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410547/ltv-snowflake-data-governance/tag-propagation.mp4", durationLabel: "1 min 47 s" }),
      L(13, "data-classification", "Data Classification", { contentDir: "ch03/13-data-classification", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410734/ltv-snowflake-data-governance/data-classification.mp4", durationLabel: "1 min 35 s" }),
      L(14, "sensitive-data-discovery", "Sensitive Data Discovery", { contentDir: "ch03/14-sensitive-data-discovery", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410931/ltv-snowflake-data-governance/sensitive-data-discovery.mp4", durationLabel: "1 min 46 s" }),
      L(15, "governance-through-tags", "Governance Through Tags", { contentDir: "ch03/15-governance-through-tags", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411114/ltv-snowflake-data-governance/governance-through-tags.mp4", durationLabel: "1 min 36 s" }),
    ],
  },
  {
    n: 4,
    title: "Auditing and Monitoring",
    lessons: [
      L(16, "access-history-and-query-history", "Access History and Query History", { contentDir: "ch04/16-access-history-and-query-history", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411282/ltv-snowflake-data-governance/access-history-and-query-history.mp4", durationLabel: "1 min 33 s" }),
      L(17, "account-usage-views", "Account Usage Views", { contentDir: "ch04/17-account-usage-views", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411475/ltv-snowflake-data-governance/account-usage-views.mp4", durationLabel: "1 min 36 s" }),
      L(18, "auditing-access", "Auditing Access", { contentDir: "ch04/18-auditing-access", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411634/ltv-snowflake-data-governance/auditing-access.mp4", durationLabel: "1 min 22 s" }),
      L(19, "monitoring-governance", "Monitoring Governance", { contentDir: "ch04/19-monitoring-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411788/ltv-snowflake-data-governance/monitoring-governance.mp4", durationLabel: "1 min 9 s" }),
      L(20, "governance-dashboards-in-snowflake", "Governance Dashboards in Snowflake", { contentDir: "ch04/20-governance-dashboards-in-snowflake", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412041/ltv-snowflake-data-governance/governance-dashboards-in-snowflake.mp4", durationLabel: "1 min 59 s" }),
    ],
  },
  {
    n: 5,
    title: "Enterprise Governance",
    lessons: [
      L(21, "data-sharing-and-governance", "Data Sharing and Governance", { contentDir: "ch05/21-data-sharing-and-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412209/ltv-snowflake-data-governance/data-sharing-and-governance.mp4", durationLabel: "1 min 31 s" }),
      L(22, "data-retention-and-time-travel", "Data Retention and Time Travel", { contentDir: "ch05/22-data-retention-and-time-travel", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412410/ltv-snowflake-data-governance/data-retention-and-time-travel.mp4", durationLabel: "1 min 37 s" }),
      L(23, "cross-account-governance", "Cross-Account Governance", { contentDir: "ch05/23-cross-account-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412573/ltv-snowflake-data-governance/cross-account-governance.mp4", durationLabel: "1 min 30 s" }),
      L(24, "snowflake-governance-case-study", "Snowflake Governance Case Study", { contentDir: "ch05/24-snowflake-governance-case-study", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412787/ltv-snowflake-data-governance/snowflake-governance-case-study.mp4", durationLabel: "1 min 55 s" }),
      L(25, "snowflake-governance-practice-lab", "Snowflake Governance Practice Lab", { contentDir: "ch05/25-snowflake-governance-practice-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412976/ltv-snowflake-data-governance/snowflake-governance-practice-lab.mp4", durationLabel: "1 min 40 s" }),
    ],
  },
];
