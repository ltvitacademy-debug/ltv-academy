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
      L(1, "enterprise-data-modeling", "Enterprise Data Modeling", { contentDir: "ch01/01-enterprise-data-modeling" }),
      L(2, "conceptual-logical-and-physical-models", "Conceptual, Logical and Physical Models", { contentDir: "ch01/02-conceptual-logical-and-physical-models" }),
      L(3, "relationship-design", "Relationship Design", { contentDir: "ch01/03-relationship-design" }),
      L(4, "master-detail-vs-lookup-tradeoffs", "Master-Detail vs. Lookup Tradeoffs", { contentDir: "ch01/04-master-detail-vs-lookup-tradeoffs" }),
      L(5, "data-modeling-patterns", "Data Modeling Patterns", { contentDir: "ch01/05-data-modeling-patterns" }),
      L(6, "denormalization-and-roll-ups", "Denormalization and Roll-Ups", { contentDir: "ch01/06-denormalization-and-roll-ups" }),
      L(7, "person-accounts-and-contact-models", "Person Accounts and Contact Models", { contentDir: "ch01/07-person-accounts-and-contact-models" }),
    ],
  },
  {
    n: 2,
    title: "Data Storage and Scale",
    lessons: [
      L(8, "storage-limits-and-data-storage-costs", "Storage Limits and Data Storage Costs", { contentDir: "ch02/08-storage-limits-and-data-storage-costs" }),
      L(9, "big-objects-and-external-objects", "Big Objects and External Objects", { contentDir: "ch02/09-big-objects-and-external-objects" }),
      L(10, "custom-metadata-and-custom-settings-as-data", "Custom Metadata and Custom Settings as Data", { contentDir: "ch02/10-custom-metadata-and-custom-settings-as-data" }),
      L(11, "record-ownership-and-data-skew-basics", "Record Ownership and Data Skew Basics", { contentDir: "ch02/11-record-ownership-and-data-skew-basics" }),
      L(12, "data-architecture-and-performance", "Data Architecture and Performance", { contentDir: "ch02/12-data-architecture-and-performance" }),
      L(13, "choosing-where-data-lives", "Choosing Where Data Lives", { contentDir: "ch02/13-choosing-where-data-lives" }),
    ],
  },
  {
    n: 3,
    title: "Ownership and Consistency",
    lessons: [
      L(14, "data-ownership", "Data Ownership", { contentDir: "ch03/14-data-ownership" }),
      L(15, "master-data-management", "Master Data Management", { contentDir: "ch03/15-master-data-management" }),
      L(16, "reference-data-and-standardization", "Reference Data and Standardization", { contentDir: "ch03/16-reference-data-and-standardization" }),
      L(17, "systems-of-record-across-the-enterprise", "Systems of Record Across the Enterprise", { contentDir: "ch03/17-systems-of-record-across-the-enterprise" }),
      L(18, "data-lineage-and-traceability", "Data Lineage and Traceability", { contentDir: "ch03/18-data-lineage-and-traceability" }),
      L(19, "metadata-management", "Metadata Management", { contentDir: "ch03/19-metadata-management" }),
    ],
  },
  {
    n: 4,
    title: "Applying Data Architecture",
    lessons: [
      L(20, "multi-org-vs-single-org-data-strategy", "Multi-Org vs. Single-Org Data Strategy", { contentDir: "ch04/20-multi-org-vs-single-org-data-strategy" }),
      L(21, "data-architecture-for-multiple-business-units", "Data Architecture for Multiple Business Units", { contentDir: "ch04/21-data-architecture-for-multiple-business-units" }),
      L(22, "scalability-considerations", "Scalability Considerations", { contentDir: "ch04/22-scalability-considerations" }),
      L(23, "data-model-reviews", "Data Model Reviews", { contentDir: "ch04/23-data-model-reviews" }),
      L(24, "data-architecture-case-study-global-distributor", "Data Architecture Case Study: Global Distributor", { contentDir: "ch04/24-data-architecture-case-study-global-distributor" }),
      L(25, "data-architecture-case-study-financial-services", "Data Architecture Case Study: Financial Services", { contentDir: "ch04/25-data-architecture-case-study-financial-services" }),
      L(26, "data-architecture-documentation", "Data Architecture Documentation", { contentDir: "ch04/26-data-architecture-documentation" }),
    ],
  },
];
