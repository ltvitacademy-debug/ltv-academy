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
      L(1, "governance-in-power-bi", "Governance in Power BI"),
      L(2, "tenant-settings", "Tenant Settings"),
      L(3, "workspaces-and-workspace-roles", "Workspaces and Workspace Roles"),
      L(4, "workspace-design-patterns", "Workspace Design Patterns"),
      L(5, "apps-and-content-distribution", "Apps and Content Distribution"),
    ],
  },
  {
    n: 2,
    title: "Semantic Models and Security",
    lessons: [
      L(6, "semantic-model-governance", "Semantic Model Governance"),
      L(7, "row-level-security", "Row-Level Security"),
      L(8, "object-level-security", "Object-Level Security"),
      L(9, "sharing-and-permissions", "Sharing and Permissions"),
      L(10, "sensitivity-labels-in-power-bi", "Sensitivity Labels in Power BI"),
    ],
  },
  {
    n: 3,
    title: "Trust and Quality",
    lessons: [
      L(11, "endorsement-promoted-and-certified", "Endorsement: Promoted and Certified"),
      L(12, "certified-datasets", "Certified Datasets"),
      L(13, "lineage-and-impact-analysis-in-power-bi", "Lineage and Impact Analysis in Power BI"),
      L(14, "usage-metrics-and-monitoring", "Usage Metrics and Monitoring"),
      L(15, "auditing-power-bi-activity", "Auditing Power BI Activity"),
    ],
  },
  {
    n: 4,
    title: "Lifecycle and Enterprise BI",
    lessons: [
      L(16, "deployment-pipelines", "Deployment Pipelines"),
      L(17, "development-test-and-production-workspaces", "Development, Test and Production Workspaces"),
      L(18, "enterprise-bi-governance", "Enterprise BI Governance"),
      L(19, "power-bi-governance-case-study", "Power BI Governance Case Study"),
      L(20, "power-bi-governance-practice-lab", "Power BI Governance Practice Lab"),
    ],
  },
];
