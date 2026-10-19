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
      L(1, "what-metadata-is", "What Metadata Is", { contentDir: "ch01/01-what-metadata-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792431719/ltv-metadata-management-and-business-glossary/what-metadata-is.mp4", durationLabel: "1 min 39 s" }),
      L(2, "business-technical-and-operational-metadata", "Business, Technical and Operational Metadata", { contentDir: "ch01/02-business-technical-and-operational-metadata", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432191/ltv-metadata-management-and-business-glossary/business-technical-and-operational-metadata.mp4", durationLabel: "1 min 40 s" }),
      L(3, "metadata-standards", "Metadata Standards", { contentDir: "ch01/03-metadata-standards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432596/ltv-metadata-management-and-business-glossary/metadata-standards.mp4", durationLabel: "1 min 41 s" }),
      L(4, "the-metadata-management-lifecycle", "The Metadata Management Lifecycle", { contentDir: "ch01/04-the-metadata-management-lifecycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432951/ltv-metadata-management-and-business-glossary/the-metadata-management-lifecycle.mp4", durationLabel: "1 min 35 s" }),
      L(5, "metadata-repositories", "Metadata Repositories", { contentDir: "ch01/05-metadata-repositories", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433236/ltv-metadata-management-and-business-glossary/metadata-repositories.mp4", durationLabel: "1 min 38 s" }),
    ],
  },
  {
    n: 2,
    title: "Business Glossary",
    lessons: [
      L(6, "business-glossary-concepts", "Business Glossary Concepts", { contentDir: "ch02/06-business-glossary-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433585/ltv-metadata-management-and-business-glossary/business-glossary-concepts.mp4", durationLabel: "1 min 36 s" }),
      L(7, "writing-good-definitions", "Writing Good Definitions", { contentDir: "ch02/07-writing-good-definitions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433773/ltv-metadata-management-and-business-glossary/writing-good-definitions.mp4", durationLabel: "1 min 31 s" }),
      L(8, "glossary-governance-and-approval", "Glossary Governance and Approval", { contentDir: "ch02/08-glossary-governance-and-approval", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433960/ltv-metadata-management-and-business-glossary/glossary-governance-and-approval.mp4", durationLabel: "1 min 30 s" }),
      L(9, "glossary-terms-and-hierarchies", "Glossary Terms and Hierarchies", { contentDir: "ch02/09-glossary-terms-and-hierarchies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434251/ltv-metadata-management-and-business-glossary/glossary-terms-and-hierarchies.mp4", durationLabel: "1 min 32 s" }),
      L(10, "building-a-business-glossary", "Building a Business Glossary", { contentDir: "ch02/10-building-a-business-glossary", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792434414/ltv-metadata-management-and-business-glossary/building-a-business-glossary.mp4", durationLabel: "1 min 28 s" }),
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
      L(16, "identifying-critical-data-elements", "Identifying Critical Data Elements", { contentDir: "ch04/16-identifying-critical-data-elements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792429582/ltv-metadata-management-and-business-glossary/identifying-critical-data-elements.mp4", durationLabel: "1 min 44 s" }),
      L(17, "prioritizing-critical-data-elements", "Prioritizing Critical Data Elements", { contentDir: "ch04/17-prioritizing-critical-data-elements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792430069/ltv-metadata-management-and-business-glossary/prioritizing-critical-data-elements.mp4", durationLabel: "1 min 25 s" }),
      L(18, "critical-data-element-documentation", "Critical Data Element Documentation", { contentDir: "ch04/18-critical-data-element-documentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792430639/ltv-metadata-management-and-business-glossary/critical-data-element-documentation.mp4", durationLabel: "1 min 41 s" }),
      L(19, "critical-data-elements-and-regulatory-reporting", "Critical Data Elements and Regulatory Reporting", { contentDir: "ch04/19-critical-data-elements-and-regulatory-reporting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792431131/ltv-metadata-management-and-business-glossary/critical-data-elements-and-regulatory-reporting.mp4", durationLabel: "1 min 33 s" }),
    ],
  },
  {
    n: 5,
    title: "Data Catalogs",
    lessons: [
      L(20, "data-catalog-concepts", "Data Catalog Concepts", { contentDir: "ch05/20-data-catalog-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792431718/ltv-metadata-management-and-business-glossary/data-catalog-concepts.mp4", durationLabel: "1 min 30 s" }),
      L(21, "catalog-capabilities-and-search", "Catalog Capabilities and Search", { contentDir: "ch05/21-catalog-capabilities-and-search", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432174/ltv-metadata-management-and-business-glossary/catalog-capabilities-and-search.mp4", durationLabel: "1 min 29 s" }),
      L(22, "cataloging-business-and-technical-metadata", "Cataloging Business and Technical Metadata", { contentDir: "ch05/22-cataloging-business-and-technical-metadata", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432542/ltv-metadata-management-and-business-glossary/cataloging-business-and-technical-metadata.mp4", durationLabel: "1 min 27 s" }),
      L(23, "metadata-quality", "Metadata Quality", { contentDir: "ch05/23-metadata-quality", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432896/ltv-metadata-management-and-business-glossary/metadata-quality.mp4", durationLabel: "1 min 30 s" }),
      L(24, "catalog-adoption", "Catalog Adoption", { contentDir: "ch05/24-catalog-adoption", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433147/ltv-metadata-management-and-business-glossary/catalog-adoption.mp4", durationLabel: "1 min 25 s" }),
      L(25, "metadata-case-study", "Metadata Case Study", { contentDir: "ch05/25-metadata-case-study", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433437/ltv-metadata-management-and-business-glossary/metadata-case-study.mp4", durationLabel: "1 min 56 s" }),
    ],
  },
];
