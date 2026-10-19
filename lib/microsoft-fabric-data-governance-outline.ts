// The Microsoft Fabric Data Governance course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/microsoft-fabric-data-governance/
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

export const GOV_MICROSOFT_FABRIC_DATA_GOVERNANCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Fabric Governance Foundations",
    lessons: [
      L(1, "governance-in-microsoft-fabric", "Governance in Microsoft Fabric", { contentDir: "ch01/01-governance-in-microsoft-fabric", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417204/ltv-microsoft-fabric-data-governance/governance-in-microsoft-fabric.mp4", durationLabel: "1:41" }),
      L(2, "fabric-tenant-and-capacity-governance", "Fabric Tenant and Capacity Governance", { contentDir: "ch01/02-fabric-tenant-and-capacity-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417487/ltv-microsoft-fabric-data-governance/fabric-tenant-and-capacity-governance.mp4", durationLabel: "1:44" }),
      L(3, "the-fabric-admin-portal", "The Fabric Admin Portal", { contentDir: "ch01/03-the-fabric-admin-portal", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417846/ltv-microsoft-fabric-data-governance/the-fabric-admin-portal.mp4", durationLabel: "1:59" }),
      L(4, "domains-in-fabric", "Domains in Fabric", { contentDir: "ch01/04-domains-in-fabric", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418150/ltv-microsoft-fabric-data-governance/domains-in-fabric.mp4", durationLabel: "2:12" }),
      L(5, "workspaces-and-workspace-roles", "Workspaces and Workspace Roles", { contentDir: "ch01/05-workspaces-and-workspace-roles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418454/ltv-microsoft-fabric-data-governance/workspaces-and-workspace-roles.mp4", durationLabel: "2:05" }),
    ],
  },
  {
    n: 2,
    title: "OneLake",
    lessons: [
      L(6, "onelake-governance", "OneLake Governance", { contentDir: "ch02/06-onelake-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418779/ltv-microsoft-fabric-data-governance/onelake-governance.mp4", durationLabel: "1:44" }),
      L(7, "lakehouse-and-warehouse-governance", "Lakehouse and Warehouse Governance", { contentDir: "ch02/07-lakehouse-and-warehouse-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418990/ltv-microsoft-fabric-data-governance/lakehouse-and-warehouse-governance.mp4", durationLabel: "1:36" }),
      L(8, "onelake-security", "OneLake Security", { contentDir: "ch02/08-onelake-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419195/ltv-microsoft-fabric-data-governance/onelake-security.mp4", durationLabel: "1:24" }),
      L(9, "shortcuts-and-governance", "Shortcuts and Governance", { contentDir: "ch02/09-shortcuts-and-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419472/ltv-microsoft-fabric-data-governance/shortcuts-and-governance.mp4", durationLabel: "1:49" }),
      L(10, "data-access-roles", "Data Access Roles", { contentDir: "ch02/10-data-access-roles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419881/ltv-microsoft-fabric-data-governance/data-access-roles.mp4", durationLabel: "2:30" }),
    ],
  },
  {
    n: 3,
    title: "Security and Protection",
    lessons: [
      L(11, "fabric-item-permissions", "Fabric Item Permissions", { contentDir: "ch03/11-fabric-item-permissions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420286/ltv-microsoft-fabric-data-governance/fabric-item-permissions.mp4", durationLabel: "2:04" }),
      L(12, "row-level-and-column-level-security-in-fabric", "Row-Level and Column-Level Security in Fabric", { contentDir: "ch03/12-row-level-and-column-level-security-in-fabric", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420600/ltv-microsoft-fabric-data-governance/row-level-and-column-level-security-in-fabric.mp4", durationLabel: "2:17" }),
      L(13, "sensitivity-labels-in-fabric", "Sensitivity Labels in Fabric", { contentDir: "ch03/13-sensitivity-labels-in-fabric", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420955/ltv-microsoft-fabric-data-governance/sensitivity-labels-in-fabric.mp4", durationLabel: "2:47" }),
      L(14, "information-protection", "Information Protection", { contentDir: "ch03/14-information-protection", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421415/ltv-microsoft-fabric-data-governance/information-protection.mp4", durationLabel: "3:01" }),
      L(15, "auditing-and-activity-logs", "Auditing and Activity Logs", { contentDir: "ch03/15-auditing-and-activity-logs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421872/ltv-microsoft-fabric-data-governance/auditing-and-activity-logs.mp4", durationLabel: "2:35" }),
    ],
  },
  {
    n: 4,
    title: "Discovery and Lineage",
    lessons: [
      L(16, "data-discovery-in-fabric", "Data Discovery in Fabric", { contentDir: "ch04/16-data-discovery-in-fabric", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422176/ltv-microsoft-fabric-data-governance/data-discovery-in-fabric.mp4", durationLabel: "2:25" }),
      L(17, "the-onelake-catalog", "The OneLake Catalog", { contentDir: "ch04/17-the-onelake-catalog", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422406/ltv-microsoft-fabric-data-governance/the-onelake-catalog.mp4", durationLabel: "1:50" }),
      L(18, "endorsement-and-certification", "Endorsement and Certification", { contentDir: "ch04/18-endorsement-and-certification", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422619/ltv-microsoft-fabric-data-governance/endorsement-and-certification.mp4", durationLabel: "1:52" }),
      L(19, "lineage-in-fabric", "Lineage in Fabric", { contentDir: "ch04/19-lineage-in-fabric", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422830/ltv-microsoft-fabric-data-governance/lineage-in-fabric.mp4", durationLabel: "1:50" }),
      L(20, "impact-analysis-in-fabric", "Impact Analysis in Fabric", { contentDir: "ch04/20-impact-analysis-in-fabric", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423105/ltv-microsoft-fabric-data-governance/impact-analysis-in-fabric.mp4", durationLabel: "2:24" }),
    ],
  },
  {
    n: 5,
    title: "Governed Analytics",
    lessons: [
      L(21, "semantic-models-and-governance", "Semantic Models and Governance", { contentDir: "ch05/21-semantic-models-and-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423258/ltv-microsoft-fabric-data-governance/semantic-models-and-governance.mp4", durationLabel: "1:14" }),
      L(22, "governed-self-service-analytics", "Governed Self-Service Analytics", { contentDir: "ch05/22-governed-self-service-analytics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423403/ltv-microsoft-fabric-data-governance/governed-self-service-analytics.mp4", durationLabel: "1:06" }),
      L(23, "purview-integration-with-fabric", "Purview Integration With Fabric", { contentDir: "ch05/23-purview-integration-with-fabric", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423543/ltv-microsoft-fabric-data-governance/purview-integration-with-fabric.mp4", durationLabel: "1:21" }),
      L(24, "fabric-governance-case-study", "Fabric Governance Case Study", { contentDir: "ch05/24-fabric-governance-case-study", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423716/ltv-microsoft-fabric-data-governance/fabric-governance-case-study.mp4", durationLabel: "1:28" }),
      L(25, "fabric-governance-practice-lab", "Fabric Governance Practice Lab", { contentDir: "ch05/25-fabric-governance-practice-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423912/ltv-microsoft-fabric-data-governance/fabric-governance-practice-lab.mp4", durationLabel: "1:28" }),
    ],
  },
];
