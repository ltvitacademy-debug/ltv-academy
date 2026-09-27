// The Enterprise Salesforce Data Architecture course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/enterprise-salesforce-data-architecture/
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

export const SFTA_ENTERPRISE_SALESFORCE_DATA_ARCHITECTURE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Enterprise Data Modeling",
    lessons: [
      L(1, "enterprise-data-modeling", "Enterprise Data Modeling"),
      L(2, "conceptual-logical-and-physical-models", "Conceptual, Logical and Physical Models"),
      L(3, "relationship-design", "Relationship Design"),
      L(4, "master-detail-vs-lookup-tradeoffs", "Master-Detail vs. Lookup Tradeoffs"),
      L(5, "data-modeling-patterns", "Data Modeling Patterns"),
      L(6, "denormalization-and-roll-ups", "Denormalization and Roll-Ups"),
      L(7, "person-accounts-and-contact-models", "Person Accounts and Contact Models"),
    ],
  },
  {
    n: 2,
    title: "Data Storage and Scale",
    lessons: [
      L(8, "storage-limits-and-data-storage-costs", "Storage Limits and Data Storage Costs"),
      L(9, "big-objects-and-external-objects", "Big Objects and External Objects"),
      L(10, "custom-metadata-and-custom-settings-as-data", "Custom Metadata and Custom Settings as Data"),
      L(11, "record-ownership-and-data-skew-basics", "Record Ownership and Data Skew Basics"),
      L(12, "data-architecture-and-performance", "Data Architecture and Performance"),
      L(13, "choosing-where-data-lives", "Choosing Where Data Lives"),
    ],
  },
  {
    n: 3,
    title: "Ownership and Consistency",
    lessons: [
      L(14, "data-ownership", "Data Ownership"),
      L(15, "master-data-management", "Master Data Management"),
      L(16, "reference-data-and-standardization", "Reference Data and Standardization"),
      L(17, "systems-of-record-across-the-enterprise", "Systems of Record Across the Enterprise"),
      L(18, "data-lineage-and-traceability", "Data Lineage and Traceability"),
      L(19, "metadata-management", "Metadata Management"),
    ],
  },
  {
    n: 4,
    title: "Applying Data Architecture",
    lessons: [
      L(20, "multi-org-vs-single-org-data-strategy", "Multi-Org vs. Single-Org Data Strategy"),
      L(21, "data-architecture-for-multiple-business-units", "Data Architecture for Multiple Business Units"),
      L(22, "scalability-considerations", "Scalability Considerations"),
      L(23, "data-model-reviews", "Data Model Reviews"),
      L(24, "data-architecture-case-study-global-distributor", "Data Architecture Case Study: Global Distributor"),
      L(25, "data-architecture-case-study-financial-services", "Data Architecture Case Study: Financial Services"),
      L(26, "data-architecture-documentation", "Data Architecture Documentation"),
    ],
  },
];
