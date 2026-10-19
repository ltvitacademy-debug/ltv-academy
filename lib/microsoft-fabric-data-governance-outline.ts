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
      L(12, "row-level-and-column-level-security-in-fabric", "Row-Level and Column-Level Security in Fabric", { contentDir: "ch03/12-row-level-and-column-level-security-in-fabric" }),
      L(13, "sensitivity-labels-in-fabric", "Sensitivity Labels in Fabric", { contentDir: "ch03/13-sensitivity-labels-in-fabric" }),
      L(14, "information-protection", "Information Protection", { contentDir: "ch03/14-information-protection" }),
      L(15, "auditing-and-activity-logs", "Auditing and Activity Logs", { contentDir: "ch03/15-auditing-and-activity-logs" }),
    ],
  },
  {
    n: 4,
    title: "Discovery and Lineage",
    lessons: [
      L(16, "data-discovery-in-fabric", "Data Discovery in Fabric", { contentDir: "ch04/16-data-discovery-in-fabric" }),
      L(17, "the-onelake-catalog", "The OneLake Catalog", { contentDir: "ch04/17-the-onelake-catalog" }),
      L(18, "endorsement-and-certification", "Endorsement and Certification", { contentDir: "ch04/18-endorsement-and-certification" }),
      L(19, "lineage-in-fabric", "Lineage in Fabric", { contentDir: "ch04/19-lineage-in-fabric" }),
      L(20, "impact-analysis-in-fabric", "Impact Analysis in Fabric", { contentDir: "ch04/20-impact-analysis-in-fabric" }),
    ],
  },
  {
    n: 5,
    title: "Governed Analytics",
    lessons: [
      L(21, "semantic-models-and-governance", "Semantic Models and Governance", { contentDir: "ch05/21-semantic-models-and-governance" }),
      L(22, "governed-self-service-analytics", "Governed Self-Service Analytics", { contentDir: "ch05/22-governed-self-service-analytics" }),
      L(23, "purview-integration-with-fabric", "Purview Integration With Fabric", { contentDir: "ch05/23-purview-integration-with-fabric" }),
      L(24, "fabric-governance-case-study", "Fabric Governance Case Study", { contentDir: "ch05/24-fabric-governance-case-study" }),
      L(25, "fabric-governance-practice-lab", "Fabric Governance Practice Lab", { contentDir: "ch05/25-fabric-governance-practice-lab" }),
    ],
  },
];
