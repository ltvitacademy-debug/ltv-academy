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
      L(1, "governance-in-power-bi", "Governance in Power BI", { contentDir: "ch01/01-governance-in-power-bi" }),
      L(2, "tenant-settings", "Tenant Settings", { contentDir: "ch01/02-tenant-settings" }),
      L(3, "workspaces-and-workspace-roles", "Workspaces and Workspace Roles", { contentDir: "ch01/03-workspaces-and-workspace-roles" }),
      L(4, "workspace-design-patterns", "Workspace Design Patterns", { contentDir: "ch01/04-workspace-design-patterns" }),
      L(5, "apps-and-content-distribution", "Apps and Content Distribution", { contentDir: "ch01/05-apps-and-content-distribution" }),
    ],
  },
  {
    n: 2,
    title: "Semantic Models and Security",
    lessons: [
      L(6, "semantic-model-governance", "Semantic Model Governance", { contentDir: "ch02/06-semantic-model-governance" }),
      L(7, "row-level-security", "Row-Level Security", { contentDir: "ch02/07-row-level-security" }),
      L(8, "object-level-security", "Object-Level Security", { contentDir: "ch02/08-object-level-security" }),
      L(9, "sharing-and-permissions", "Sharing and Permissions", { contentDir: "ch02/09-sharing-and-permissions" }),
      L(10, "sensitivity-labels-in-power-bi", "Sensitivity Labels in Power BI", { contentDir: "ch02/10-sensitivity-labels-in-power-bi" }),
    ],
  },
  {
    n: 3,
    title: "Trust and Quality",
    lessons: [
      L(11, "endorsement-promoted-and-certified", "Endorsement: Promoted and Certified", { contentDir: "ch03/11-endorsement-promoted-and-certified" }),
      L(12, "certified-datasets", "Certified Datasets", { contentDir: "ch03/12-certified-datasets" }),
      L(13, "lineage-and-impact-analysis-in-power-bi", "Lineage and Impact Analysis in Power BI", { contentDir: "ch03/13-lineage-and-impact-analysis-in-power-bi" }),
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
