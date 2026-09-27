// The Data Governance Architecture course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-governance-architecture/
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

export const GOV_DATA_GOVERNANCE_ARCHITECTURE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Governance Architecture Foundations",
    lessons: [
      L(1, "what-governance-architecture-is", "What Governance Architecture Is"),
      L(2, "architecture-principles-for-governance", "Architecture Principles for Governance"),
      L(3, "reference-architectures", "Reference Architectures"),
      L(4, "the-governance-capabilities-map", "The Governance Capabilities Map"),
      L(5, "architecture-and-the-operating-model", "Architecture and the Operating Model"),
    ],
  },
  {
    n: 2,
    title: "Operating Models",
    lessons: [
      L(6, "centralized-governance", "Centralized Governance"),
      L(7, "federated-governance", "Federated Governance"),
      L(8, "decentralized-governance", "Decentralized Governance"),
      L(9, "data-mesh-governance", "Data Mesh Governance"),
      L(10, "data-products-and-governance", "Data Products and Governance"),
      L(11, "choosing-a-governance-model", "Choosing a Governance Model"),
    ],
  },
  {
    n: 3,
    title: "Metadata and Catalog Architecture",
    lessons: [
      L(12, "enterprise-metadata-architecture", "Enterprise Metadata Architecture"),
      L(13, "catalog-architecture", "Catalog Architecture"),
      L(14, "lineage-architecture", "Lineage Architecture"),
      L(15, "integrating-catalogs-across-platforms", "Integrating Catalogs Across Platforms"),
      L(16, "active-metadata", "Active Metadata"),
    ],
  },
  {
    n: 4,
    title: "Security and Platform Architecture",
    lessons: [
      L(17, "security-architecture-for-governance", "Security Architecture for Governance"),
      L(18, "access-control-architecture", "Access Control Architecture"),
      L(19, "policy-as-code", "Policy as Code"),
      L(20, "platform-architecture-purview-fabric-databricks-and-snowflake", "Platform Architecture: Purview, Fabric, Databricks and Snowflake"),
      L(21, "governance-automation", "Governance Automation"),
    ],
  },
  {
    n: 5,
    title: "Governance Strategy",
    lessons: [
      L(22, "governance-strategy", "Governance Strategy"),
      L(23, "governance-and-architecture-roadmaps", "Governance and Architecture Roadmaps"),
      L(24, "governance-architecture-documentation", "Governance Architecture Documentation"),
      L(25, "architecture-decision-records-for-governance", "Architecture Decision Records for Governance"),
      L(26, "governance-architecture-review-boards", "Governance Architecture Review Boards"),
    ],
  },
  {
    n: 6,
    title: "Applied Architecture",
    lessons: [
      L(27, "governance-architecture-case-study-global-manufacturer", "Governance Architecture Case Study: Global Manufacturer"),
      L(28, "governance-architecture-case-study-financial-services", "Governance Architecture Case Study: Financial Services"),
      L(29, "governance-architecture-practice-lab", "Governance Architecture Practice Lab"),
      L(30, "presenting-governance-architecture", "Presenting Governance Architecture"),
    ],
  },
];
