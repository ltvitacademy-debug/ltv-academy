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
      L(1, "governance-in-microsoft-fabric", "Governance in Microsoft Fabric"),
      L(2, "fabric-tenant-and-capacity-governance", "Fabric Tenant and Capacity Governance"),
      L(3, "the-fabric-admin-portal", "The Fabric Admin Portal"),
      L(4, "domains-in-fabric", "Domains in Fabric"),
      L(5, "workspaces-and-workspace-roles", "Workspaces and Workspace Roles"),
    ],
  },
  {
    n: 2,
    title: "OneLake",
    lessons: [
      L(6, "onelake-governance", "OneLake Governance"),
      L(7, "lakehouse-and-warehouse-governance", "Lakehouse and Warehouse Governance"),
      L(8, "onelake-security", "OneLake Security"),
      L(9, "shortcuts-and-governance", "Shortcuts and Governance"),
      L(10, "data-access-roles", "Data Access Roles"),
    ],
  },
  {
    n: 3,
    title: "Security and Protection",
    lessons: [
      L(11, "fabric-item-permissions", "Fabric Item Permissions"),
      L(12, "row-level-and-column-level-security-in-fabric", "Row-Level and Column-Level Security in Fabric"),
      L(13, "sensitivity-labels-in-fabric", "Sensitivity Labels in Fabric"),
      L(14, "information-protection", "Information Protection"),
      L(15, "auditing-and-activity-logs", "Auditing and Activity Logs"),
    ],
  },
  {
    n: 4,
    title: "Discovery and Lineage",
    lessons: [
      L(16, "data-discovery-in-fabric", "Data Discovery in Fabric"),
      L(17, "the-onelake-catalog", "The OneLake Catalog"),
      L(18, "endorsement-and-certification", "Endorsement and Certification"),
      L(19, "lineage-in-fabric", "Lineage in Fabric"),
      L(20, "impact-analysis-in-fabric", "Impact Analysis in Fabric"),
    ],
  },
  {
    n: 5,
    title: "Governed Analytics",
    lessons: [
      L(21, "semantic-models-and-governance", "Semantic Models and Governance"),
      L(22, "governed-self-service-analytics", "Governed Self-Service Analytics"),
      L(23, "purview-integration-with-fabric", "Purview Integration With Fabric"),
      L(24, "fabric-governance-case-study", "Fabric Governance Case Study"),
      L(25, "fabric-governance-practice-lab", "Fabric Governance Practice Lab"),
    ],
  },
];
