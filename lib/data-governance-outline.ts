// The Data Governance course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-governance/
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

export const SFTA_DATA_GOVERNANCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Governing Data",
    lessons: [
      L(1, "what-data-governance-is", "What Data Governance Is"),
      L(2, "data-ownership", "Data Ownership"),
      L(3, "data-stewardship-roles", "Data Stewardship Roles"),
      L(4, "data-quality", "Data Quality"),
      L(5, "data-quality-metrics", "Data Quality Metrics"),
    ],
  },
  {
    n: 2,
    title: "Policies and Compliance",
    lessons: [
      L(6, "data-retention", "Data Retention"),
      L(7, "privacy-and-consent-concepts", "Privacy and Consent Concepts"),
      L(8, "compliance", "Compliance"),
      L(9, "data-classification", "Data Classification"),
      L(10, "audit-and-traceability", "Audit and Traceability"),
    ],
  },
  {
    n: 3,
    title: "Building Governance",
    lessons: [
      L(11, "building-a-governance-framework", "Building a Governance Framework"),
      L(12, "governance-committees-and-processes", "Governance Committees and Processes"),
      L(13, "governance-case-study", "Governance Case Study"),
      L(14, "measuring-governance-success", "Measuring Governance Success"),
    ],
  },
];
