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
      L(1, "what-governance-architecture-is", "What Governance Architecture Is", { contentDir: "ch01/01-what-governance-architecture-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792425831/ltv-data-governance-architecture/what-governance-architecture-is.mp4", durationLabel: "1 min 21 s" }),
      L(2, "architecture-principles-for-governance", "Architecture Principles for Governance", { contentDir: "ch01/02-architecture-principles-for-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426520/ltv-data-governance-architecture/architecture-principles-for-governance.mp4", durationLabel: "1 min 29 s" }),
      L(3, "reference-architectures", "Reference Architectures", { contentDir: "ch01/03-reference-architectures", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427073/ltv-data-governance-architecture/reference-architectures.mp4", durationLabel: "1 min 25 s" }),
      L(4, "the-governance-capabilities-map", "The Governance Capabilities Map", { contentDir: "ch01/04-the-governance-capabilities-map", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427743/ltv-data-governance-architecture/the-governance-capabilities-map.mp4", durationLabel: "1 min 31 s" }),
      L(5, "architecture-and-the-operating-model", "Architecture and the Operating Model", { contentDir: "ch01/05-architecture-and-the-operating-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792428421/ltv-data-governance-architecture/architecture-and-the-operating-model.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
  {
    n: 2,
    title: "Operating Models",
    lessons: [
      L(6, "centralized-governance", "Centralized Governance", { contentDir: "ch02/06-centralized-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792428946/ltv-data-governance-architecture/centralized-governance.mp4", durationLabel: "1 min 20 s" }),
      L(7, "federated-governance", "Federated Governance", { contentDir: "ch02/07-federated-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792429564/ltv-data-governance-architecture/federated-governance.mp4", durationLabel: "1 min 25 s" }),
      L(8, "decentralized-governance", "Decentralized Governance", { contentDir: "ch02/08-decentralized-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792430076/ltv-data-governance-architecture/decentralized-governance.mp4", durationLabel: "1 min 25 s" }),
      L(9, "data-mesh-governance", "Data Mesh Governance", { contentDir: "ch02/09-data-mesh-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792430621/ltv-data-governance-architecture/data-mesh-governance.mp4", durationLabel: "1 min 31 s" }),
      L(10, "data-products-and-governance", "Data Products and Governance", { contentDir: "ch02/10-data-products-and-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792431112/ltv-data-governance-architecture/data-products-and-governance.mp4", durationLabel: "1 min 19 s" }),
      L(11, "choosing-a-governance-model", "Choosing a Governance Model", { contentDir: "ch02/11-choosing-a-governance-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792431572/ltv-data-governance-architecture/choosing-a-governance-model.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 3,
    title: "Metadata and Catalog Architecture",
    lessons: [
      L(12, "enterprise-metadata-architecture", "Enterprise Metadata Architecture", { contentDir: "ch03/12-enterprise-metadata-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432165/ltv-data-governance-architecture/enterprise-metadata-architecture.mp4", durationLabel: "1 min 59 s" }),
      L(13, "catalog-architecture", "Catalog Architecture", { contentDir: "ch03/13-catalog-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432584/ltv-data-governance-architecture/catalog-architecture.mp4", durationLabel: "1 min 41 s" }),
      L(14, "lineage-architecture", "Lineage Architecture", { contentDir: "ch03/14-lineage-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432982/ltv-data-governance-architecture/lineage-architecture.mp4", durationLabel: "1 min 48 s" }),
      L(15, "integrating-catalogs-across-platforms", "Integrating Catalogs Across Platforms", { contentDir: "ch03/15-integrating-catalogs-across-platforms", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433281/ltv-data-governance-architecture/integrating-catalogs-across-platforms.mp4", durationLabel: "1 min 48 s" }),
      L(16, "active-metadata", "Active Metadata", { contentDir: "ch03/16-active-metadata", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433525/ltv-data-governance-architecture/active-metadata.mp4", durationLabel: "1 min 38 s" }),
    ],
  },
  {
    n: 4,
    title: "Security and Platform Architecture",
    lessons: [
      L(17, "security-architecture-for-governance", "Security Architecture for Governance", { contentDir: "ch04/17-security-architecture-for-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433726/ltv-data-governance-architecture/security-architecture-for-governance.mp4", durationLabel: "1 min 43 s" }),
      L(18, "access-control-architecture", "Access Control Architecture", { contentDir: "ch04/18-access-control-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433940/ltv-data-governance-architecture/access-control-architecture.mp4", durationLabel: "1 min 51 s" }),
      L(19, "policy-as-code", "Policy as Code", { contentDir: "ch04/19-policy-as-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434143/ltv-data-governance-architecture/policy-as-code.mp4", durationLabel: "1 min 45 s" }),
      L(20, "platform-architecture-purview-fabric-databricks-and-snowflake", "Platform Architecture: Purview, Fabric, Databricks and Snowflake", { contentDir: "ch04/20-platform-architecture-purview-fabric-databricks-and-snowflake", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434364/ltv-data-governance-architecture/platform-architecture-purview-fabric-databricks-and-snowflake.mp4", durationLabel: "2 min 5 s" }),
      L(21, "governance-automation", "Governance Automation", { contentDir: "ch04/21-governance-automation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434558/ltv-data-governance-architecture/governance-automation.mp4", durationLabel: "1 min 36 s" }),
    ],
  },
  {
    n: 5,
    title: "Governance Strategy",
    lessons: [
      L(22, "governance-strategy", "Governance Strategy", { contentDir: "ch05/22-governance-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792425812/ltv-data-governance-architecture/governance-strategy.mp4", durationLabel: "1 min 8 s" }),
      L(23, "governance-and-architecture-roadmaps", "Governance and Architecture Roadmaps", { contentDir: "ch05/23-governance-and-architecture-roadmaps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426440/ltv-data-governance-architecture/governance-and-architecture-roadmaps.mp4", durationLabel: "1 min 18 s" }),
      L(24, "governance-architecture-documentation", "Governance Architecture Documentation", { contentDir: "ch05/24-governance-architecture-documentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427028/ltv-data-governance-architecture/governance-architecture-documentation.mp4", durationLabel: "1 min 24 s" }),
      L(25, "architecture-decision-records-for-governance", "Architecture Decision Records for Governance", { contentDir: "ch05/25-architecture-decision-records-for-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427605/ltv-data-governance-architecture/architecture-decision-records-for-governance.mp4", durationLabel: "1 min 27 s" }),
      L(26, "governance-architecture-review-boards", "Governance Architecture Review Boards", { contentDir: "ch05/26-governance-architecture-review-boards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792428247/ltv-data-governance-architecture/governance-architecture-review-boards.mp4", durationLabel: "1 min 26 s" }),
    ],
  },
  {
    n: 6,
    title: "Applied Architecture",
    lessons: [
      L(27, "governance-architecture-case-study-global-manufacturer", "Governance Architecture Case Study: Global Manufacturer", { contentDir: "ch06/27-governance-architecture-case-study-global-manufacturer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792429255/ltv-data-governance-architecture/governance-architecture-case-study-global-manufacturer.mp4", durationLabel: "2 min 4 s" }),
      L(28, "governance-architecture-case-study-financial-services", "Governance Architecture Case Study: Financial Services", { contentDir: "ch06/28-governance-architecture-case-study-financial-services", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792430010/ltv-data-governance-architecture/governance-architecture-case-study-financial-services.mp4", durationLabel: "2 min 0 s" }),
      L(29, "governance-architecture-practice-lab", "Governance Architecture Practice Lab", { contentDir: "ch06/29-governance-architecture-practice-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792430518/ltv-data-governance-architecture/governance-architecture-practice-lab.mp4", durationLabel: "1 min 17 s" }),
      L(30, "presenting-governance-architecture", "Presenting Governance Architecture", { contentDir: "ch06/30-presenting-governance-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792431030/ltv-data-governance-architecture/presenting-governance-architecture.mp4", durationLabel: "1 min 25 s" }),
    ],
  },
];
