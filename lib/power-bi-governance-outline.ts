// The Power BI Governance course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/power-bi-governance/
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

export const GOV_POWER_BI_GOVERNANCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Tenant and Workspace Governance",
    lessons: [
      L(1, "governance-in-power-bi", "Governance in Power BI", { contentDir: "ch01/01-governance-in-power-bi", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424112/ltv-power-bi-governance/governance-in-power-bi.mp4", durationLabel: "2 min 32 s" }),
      L(2, "tenant-settings", "Tenant Settings", { contentDir: "ch01/02-tenant-settings", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424294/ltv-power-bi-governance/tenant-settings.mp4", durationLabel: "2 min 21 s" }),
      L(3, "workspaces-and-workspace-roles", "Workspaces and Workspace Roles", { contentDir: "ch01/03-workspaces-and-workspace-roles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424414/ltv-power-bi-governance/workspaces-and-workspace-roles.mp4", durationLabel: "2 min 8 s" }),
      L(4, "workspace-design-patterns", "Workspace Design Patterns", { contentDir: "ch01/04-workspace-design-patterns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424556/ltv-power-bi-governance/workspace-design-patterns.mp4", durationLabel: "2 min 31 s" }),
      L(5, "apps-and-content-distribution", "Apps and Content Distribution", { contentDir: "ch01/05-apps-and-content-distribution", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424719/ltv-power-bi-governance/apps-and-content-distribution.mp4", durationLabel: "2 min 32 s" }),
    ],
  },
  {
    n: 2,
    title: "Semantic Models and Security",
    lessons: [
      L(6, "semantic-model-governance", "Semantic Model Governance", { contentDir: "ch02/06-semantic-model-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792425641/ltv-power-bi-governance/semantic-model-governance.mp4", durationLabel: "2 min 16 s" }),
      L(7, "row-level-security", "Row-Level Security", { contentDir: "ch02/07-row-level-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792425470/ltv-power-bi-governance/row-level-security.mp4", durationLabel: "2 min 5 s" }),
      L(8, "object-level-security", "Object-Level Security", { contentDir: "ch02/08-object-level-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426455/ltv-power-bi-governance/object-level-security.mp4", durationLabel: "1 min 42 s" }),
      L(9, "sharing-and-permissions", "Sharing and Permissions", { contentDir: "ch02/09-sharing-and-permissions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426736/ltv-power-bi-governance/sharing-and-permissions.mp4", durationLabel: "2 min 3 s" }),
      L(10, "sensitivity-labels-in-power-bi", "Sensitivity Labels in Power BI", { contentDir: "ch02/10-sensitivity-labels-in-power-bi", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427875/ltv-power-bi-governance/sensitivity-labels-in-power-bi.mp4", durationLabel: "1 min 53 s" }),
    ],
  },
  {
    n: 3,
    title: "Trust and Quality",
    lessons: [
      L(11, "endorsement-promoted-and-certified", "Endorsement: Promoted and Certified", { contentDir: "ch03/11-endorsement-promoted-and-certified", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427862/ltv-power-bi-governance/endorsement-promoted-and-certified.mp4", durationLabel: "1 min 33 s" }),
      L(12, "certified-datasets", "Certified Datasets", { contentDir: "ch03/12-certified-datasets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792428385/ltv-power-bi-governance/certified-datasets.mp4", durationLabel: "1 min 30 s" }),
      L(13, "lineage-and-impact-analysis-in-power-bi", "Lineage and Impact Analysis in Power BI", { contentDir: "ch03/13-lineage-and-impact-analysis-in-power-bi", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792429008/ltv-power-bi-governance/lineage-and-impact-analysis-in-power-bi.mp4", durationLabel: "1 min 33 s" }),
      L(14, "usage-metrics-and-monitoring", "Usage Metrics and Monitoring", { contentDir: "ch03/14-usage-metrics-and-monitoring" }),
      L(15, "auditing-power-bi-activity", "Auditing Power BI Activity", { contentDir: "ch03/15-auditing-power-bi-activity" }),
    ],
  },
  {
    n: 4,
    title: "Lifecycle and Enterprise BI",
    lessons: [
      L(16, "deployment-pipelines", "Deployment Pipelines", { contentDir: "ch04/16-deployment-pipelines" }),
      L(17, "development-test-and-production-workspaces", "Development, Test and Production Workspaces", { contentDir: "ch04/17-development-test-and-production-workspaces" }),
      L(18, "enterprise-bi-governance", "Enterprise BI Governance", { contentDir: "ch04/18-enterprise-bi-governance" }),
      L(19, "power-bi-governance-case-study", "Power BI Governance Case Study", { contentDir: "ch04/19-power-bi-governance-case-study" }),
      L(20, "power-bi-governance-practice-lab", "Power BI Governance Practice Lab", { contentDir: "ch04/20-power-bi-governance-practice-lab" }),
    ],
  },
];
