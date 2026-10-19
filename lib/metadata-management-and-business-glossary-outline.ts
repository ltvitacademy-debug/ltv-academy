// The Metadata Management & Business Glossary course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/metadata-management-and-business-glossary/
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

export const GOV_METADATA_MANAGEMENT_AND_BUSINESS_GLOSSARY_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Metadata Foundations",
    lessons: [
      L(1, "what-metadata-is", "What Metadata Is", { contentDir: "ch01/01-what-metadata-is" }),
      L(2, "business-technical-and-operational-metadata", "Business, Technical and Operational Metadata", { contentDir: "ch01/02-business-technical-and-operational-metadata" }),
      L(3, "metadata-standards", "Metadata Standards", { contentDir: "ch01/03-metadata-standards" }),
      L(4, "the-metadata-management-lifecycle", "The Metadata Management Lifecycle", { contentDir: "ch01/04-the-metadata-management-lifecycle" }),
      L(5, "metadata-repositories", "Metadata Repositories", { contentDir: "ch01/05-metadata-repositories" }),
    ],
  },
  {
    n: 2,
    title: "Business Glossary",
    lessons: [
      L(6, "business-glossary-concepts", "Business Glossary Concepts", { contentDir: "ch02/06-business-glossary-concepts" }),
      L(7, "writing-good-definitions", "Writing Good Definitions", { contentDir: "ch02/07-writing-good-definitions" }),
      L(8, "glossary-governance-and-approval", "Glossary Governance and Approval", { contentDir: "ch02/08-glossary-governance-and-approval" }),
      L(9, "glossary-terms-and-hierarchies", "Glossary Terms and Hierarchies", { contentDir: "ch02/09-glossary-terms-and-hierarchies" }),
      L(10, "building-a-business-glossary", "Building a Business Glossary", { contentDir: "ch02/10-building-a-business-glossary" }),
    ],
  },
  {
    n: 3,
    title: "Data Dictionaries",
    lessons: [
      L(11, "data-dictionary-concepts", "Data Dictionary Concepts", { contentDir: "ch03/11-data-dictionary-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426011/ltv-metadata-management-and-business-glossary/data-dictionary-concepts.mp4", durationLabel: "1 min 24 s" }),
      L(12, "documenting-tables-and-columns", "Documenting Tables and Columns", { contentDir: "ch03/12-documenting-tables-and-columns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426694/ltv-metadata-management-and-business-glossary/documenting-tables-and-columns.mp4", durationLabel: "1 min 27 s" }),
      L(13, "data-dictionary-standards", "Data Dictionary Standards", { contentDir: "ch03/13-data-dictionary-standards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427328/ltv-metadata-management-and-business-glossary/data-dictionary-standards.mp4", durationLabel: "1 min 29 s" }),
      L(14, "building-a-data-dictionary", "Building a Data Dictionary", { contentDir: "ch03/14-building-a-data-dictionary", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427907/ltv-metadata-management-and-business-glossary/building-a-data-dictionary.mp4", durationLabel: "1 min 25 s" }),
      L(15, "keeping-dictionaries-current", "Keeping Dictionaries Current", { contentDir: "ch03/15-keeping-dictionaries-current", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792428605/ltv-metadata-management-and-business-glossary/keeping-dictionaries-current.mp4", durationLabel: "1 min 38 s" }),
    ],
  },
  {
    n: 4,
    title: "Critical Data Elements",
    lessons: [
      L(16, "identifying-critical-data-elements", "Identifying Critical Data Elements", { contentDir: "ch04/16-identifying-critical-data-elements" }),
      L(17, "prioritizing-critical-data-elements", "Prioritizing Critical Data Elements", { contentDir: "ch04/17-prioritizing-critical-data-elements" }),
      L(18, "critical-data-element-documentation", "Critical Data Element Documentation", { contentDir: "ch04/18-critical-data-element-documentation" }),
      L(19, "critical-data-elements-and-regulatory-reporting", "Critical Data Elements and Regulatory Reporting", { contentDir: "ch04/19-critical-data-elements-and-regulatory-reporting" }),
    ],
  },
  {
    n: 5,
    title: "Data Catalogs",
    lessons: [
      L(20, "data-catalog-concepts", "Data Catalog Concepts", { contentDir: "ch05/20-data-catalog-concepts" }),
      L(21, "catalog-capabilities-and-search", "Catalog Capabilities and Search", { contentDir: "ch05/21-catalog-capabilities-and-search" }),
      L(22, "cataloging-business-and-technical-metadata", "Cataloging Business and Technical Metadata", { contentDir: "ch05/22-cataloging-business-and-technical-metadata" }),
      L(23, "metadata-quality", "Metadata Quality", { contentDir: "ch05/23-metadata-quality" }),
      L(24, "catalog-adoption", "Catalog Adoption", { contentDir: "ch05/24-catalog-adoption" }),
      L(25, "metadata-case-study", "Metadata Case Study", { contentDir: "ch05/25-metadata-case-study" }),
    ],
  },
];
