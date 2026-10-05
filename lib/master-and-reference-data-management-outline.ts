// The Master & Reference Data Management course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/master-and-reference-data-management/
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

export const GOV_MASTER_AND_REFERENCE_DATA_MANAGEMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "MDM Foundations",
    lessons: [
      L(1, "what-master-data-is", "What Master Data Is", { contentDir: "ch01/01-what-master-data-is" }),
      L(2, "master-vs-reference-vs-transactional-data", "Master vs. Reference vs. Transactional Data", { contentDir: "ch01/02-master-vs-reference-vs-transactional-data" }),
      L(3, "mdm-architecture-styles", "MDM Architecture Styles", { contentDir: "ch01/03-mdm-architecture-styles" }),
      L(4, "the-mdm-business-case", "The MDM Business Case", { contentDir: "ch01/04-the-mdm-business-case" }),
      L(5, "mdm-governance", "MDM Governance", { contentDir: "ch01/05-mdm-governance" }),
    ],
  },
  {
    n: 2,
    title: "Matching and Consolidation",
    lessons: [
      L(6, "data-matching-concepts", "Data Matching Concepts", { contentDir: "ch02/06-data-matching-concepts" }),
      L(7, "deterministic-vs-probabilistic-matching", "Deterministic vs. Probabilistic Matching", { contentDir: "ch02/07-deterministic-vs-probabilistic-matching" }),
      L(8, "deduplication", "Deduplication", { contentDir: "ch02/08-deduplication" }),
      L(9, "golden-records", "Golden Records", { contentDir: "ch02/09-golden-records" }),
      L(10, "survivorship-rules", "Survivorship Rules", { contentDir: "ch02/10-survivorship-rules" }),
      L(11, "match-review-and-stewardship", "Match Review and Stewardship", { contentDir: "ch02/11-match-review-and-stewardship" }),
    ],
  },
  {
    n: 3,
    title: "Master Data Domains",
    lessons: [
      L(12, "customer-master", "Customer Master", { contentDir: "ch03/12-customer-master" }),
      L(13, "product-master", "Product Master", { contentDir: "ch03/13-product-master" }),
      L(14, "vendor-master", "Vendor Master", { contentDir: "ch03/14-vendor-master" }),
      L(15, "employee-and-location-master", "Employee and Location Master", { contentDir: "ch03/15-employee-and-location-master" }),
      L(16, "hierarchies-and-relationships", "Hierarchies and Relationships", { contentDir: "ch03/16-hierarchies-and-relationships" }),
    ],
  },
  {
    n: 4,
    title: "Reference Data",
    lessons: [
      L(17, "reference-data-concepts", "Reference Data Concepts", { contentDir: "ch04/17-reference-data-concepts" }),
      L(18, "managing-code-lists", "Managing Code Lists", { contentDir: "ch04/18-managing-code-lists" }),
      L(19, "reference-data-governance", "Reference Data Governance", { contentDir: "ch04/19-reference-data-governance" }),
      L(20, "cross-reference-and-mapping-tables", "Cross-Reference and Mapping Tables", { contentDir: "ch04/20-cross-reference-and-mapping-tables" }),
    ],
  },
  {
    n: 5,
    title: "Enterprise Consistency",
    lessons: [
      L(21, "distributing-master-data", "Distributing Master Data", { contentDir: "ch04/21-distributing-master-data" }),
      L(22, "master-data-quality", "Master Data Quality", { contentDir: "ch05/22-master-data-quality" }),
      L(23, "master-data-integration-patterns", "Master Data Integration Patterns", { contentDir: "ch05/23-master-data-integration-patterns" }),
      L(24, "mdm-tools-overview", "MDM Tools Overview", { contentDir: "ch05/24-mdm-tools-overview" }),
      L(25, "mdm-case-study", "MDM Case Study", { contentDir: "ch05/25-mdm-case-study" }),
    ],
  },
];
