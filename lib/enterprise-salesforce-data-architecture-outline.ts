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
      L(2, "relationship-design", "Relationship Design"),
      L(3, "master-detail-vs-lookup-tradeoffs", "Master-Detail vs. Lookup Tradeoffs"),
      L(4, "data-modeling-patterns", "Data Modeling Patterns"),
      L(5, "big-objects-and-external-objects", "Big Objects and External Objects"),
    ],
  },
  {
    n: 2,
    title: "Ownership and Scale",
    lessons: [
      L(6, "data-ownership", "Data Ownership"),
      L(7, "master-data-management", "Master Data Management"),
      L(8, "reference-data-and-standardization", "Reference Data and Standardization"),
      L(9, "scalability-considerations", "Scalability Considerations"),
      L(10, "data-architecture-case-study", "Data Architecture Case Study"),
    ],
  },
];
