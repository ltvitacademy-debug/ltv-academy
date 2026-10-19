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
      L(1, "what-master-data-is", "What Master Data Is", { contentDir: "ch01/01-what-master-data-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412475/ltv-master-and-reference-data-management/what-master-data-is.mp4", durationLabel: "1:29" }),
      L(2, "master-vs-reference-vs-transactional-data", "Master vs. Reference vs. Transactional Data", { contentDir: "ch01/02-master-vs-reference-vs-transactional-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412624/ltv-master-and-reference-data-management/master-vs-reference-vs-transactional-data.mp4", durationLabel: "1:32" }),
      L(3, "mdm-architecture-styles", "MDM Architecture Styles", { contentDir: "ch01/03-mdm-architecture-styles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412806/ltv-master-and-reference-data-management/mdm-architecture-styles.mp4", durationLabel: "1:25" }),
      L(4, "the-mdm-business-case", "The MDM Business Case", { contentDir: "ch01/04-the-mdm-business-case", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412946/ltv-master-and-reference-data-management/the-mdm-business-case.mp4", durationLabel: "1:10" }),
      L(5, "mdm-governance", "MDM Governance", { contentDir: "ch01/05-mdm-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413099/ltv-master-and-reference-data-management/mdm-governance.mp4", durationLabel: "1:35" }),
    ],
  },
  {
    n: 2,
    title: "Matching and Consolidation",
    lessons: [
      L(6, "data-matching-concepts", "Data Matching Concepts", { contentDir: "ch02/06-data-matching-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413260/ltv-master-and-reference-data-management/data-matching-concepts.mp4", durationLabel: "1:19" }),
      L(7, "deterministic-vs-probabilistic-matching", "Deterministic vs. Probabilistic Matching", { contentDir: "ch02/07-deterministic-vs-probabilistic-matching", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413392/ltv-master-and-reference-data-management/deterministic-vs-probabilistic-matching.mp4", durationLabel: "1:11" }),
      L(8, "deduplication", "Deduplication", { contentDir: "ch02/08-deduplication", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413539/ltv-master-and-reference-data-management/deduplication.mp4", durationLabel: "1:13" }),
      L(9, "golden-records", "Golden Records", { contentDir: "ch02/09-golden-records", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413662/ltv-master-and-reference-data-management/golden-records.mp4", durationLabel: "1:09" }),
      L(10, "survivorship-rules", "Survivorship Rules", { contentDir: "ch02/10-survivorship-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413817/ltv-master-and-reference-data-management/survivorship-rules.mp4", durationLabel: "1:14" }),
      L(11, "match-review-and-stewardship", "Match Review and Stewardship", { contentDir: "ch02/11-match-review-and-stewardship", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413938/ltv-master-and-reference-data-management/match-review-and-stewardship.mp4", durationLabel: "1:16" }),
    ],
  },
  {
    n: 3,
    title: "Master Data Domains",
    lessons: [
      L(12, "customer-master", "Customer Master", { contentDir: "ch03/12-customer-master", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414130/ltv-master-and-reference-data-management/customer-master.mp4", durationLabel: "1:38" }),
      L(13, "product-master", "Product Master", { contentDir: "ch03/13-product-master", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414302/ltv-master-and-reference-data-management/product-master.mp4", durationLabel: "1:32" }),
      L(14, "vendor-master", "Vendor Master", { contentDir: "ch03/14-vendor-master", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414471/ltv-master-and-reference-data-management/vendor-master.mp4", durationLabel: "1:33" }),
      L(15, "employee-and-location-master", "Employee and Location Master", { contentDir: "ch03/15-employee-and-location-master", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414678/ltv-master-and-reference-data-management/employee-and-location-master.mp4", durationLabel: "1:45" }),
      L(16, "hierarchies-and-relationships", "Hierarchies and Relationships", { contentDir: "ch03/16-hierarchies-and-relationships", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414863/ltv-master-and-reference-data-management/hierarchies-and-relationships.mp4", durationLabel: "1:30" }),
    ],
  },
  {
    n: 4,
    title: "Reference Data",
    lessons: [
      L(17, "reference-data-concepts", "Reference Data Concepts", { contentDir: "ch04/17-reference-data-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415008/ltv-master-and-reference-data-management/reference-data-concepts.mp4", durationLabel: "1:29" }),
      L(18, "managing-code-lists", "Managing Code Lists", { contentDir: "ch04/18-managing-code-lists", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415209/ltv-master-and-reference-data-management/managing-code-lists.mp4", durationLabel: "1:28" }),
      L(19, "reference-data-governance", "Reference Data Governance", { contentDir: "ch04/19-reference-data-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415479/ltv-master-and-reference-data-management/reference-data-governance.mp4", durationLabel: "1:27" }),
      L(20, "cross-reference-and-mapping-tables", "Cross-Reference and Mapping Tables", { contentDir: "ch04/20-cross-reference-and-mapping-tables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415737/ltv-master-and-reference-data-management/cross-reference-and-mapping-tables.mp4", durationLabel: "1:27" }),
    ],
  },
  {
    n: 5,
    title: "Enterprise Consistency",
    lessons: [
      L(21, "distributing-master-data", "Distributing Master Data", { contentDir: "ch04/21-distributing-master-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415968/ltv-master-and-reference-data-management/distributing-master-data.mp4", durationLabel: "1:34" }),
      L(22, "master-data-quality", "Master Data Quality", { contentDir: "ch05/22-master-data-quality", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416204/ltv-master-and-reference-data-management/master-data-quality.mp4", durationLabel: "1:29" }),
      L(23, "master-data-integration-patterns", "Master Data Integration Patterns", { contentDir: "ch05/23-master-data-integration-patterns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416396/ltv-master-and-reference-data-management/master-data-integration-patterns.mp4", durationLabel: "1:32" }),
      L(24, "mdm-tools-overview", "MDM Tools Overview", { contentDir: "ch05/24-mdm-tools-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416685/ltv-master-and-reference-data-management/mdm-tools-overview.mp4", durationLabel: "1:39" }),
      L(25, "mdm-case-study", "MDM Case Study", { contentDir: "ch05/25-mdm-case-study", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416979/ltv-master-and-reference-data-management/mdm-case-study.mp4", durationLabel: "1:50" }),
    ],
  },
];
