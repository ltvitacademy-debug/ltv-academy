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
      L(1, "what-data-governance-is", "What Data Governance Is", { contentDir: "ch01/01-what-data-governance-is" }),
      L(2, "data-ownership", "Data Ownership", { contentDir: "ch01/02-data-ownership" }),
      L(3, "data-stewardship-roles", "Data Stewardship Roles", { contentDir: "ch01/03-data-stewardship-roles" }),
      L(4, "data-quality", "Data Quality", { contentDir: "ch01/04-data-quality" }),
      L(5, "data-quality-metrics", "Data Quality Metrics", { contentDir: "ch01/05-data-quality-metrics" }),
    ],
  },
  {
    n: 2,
    title: "Policies and Compliance",
    lessons: [
      L(6, "data-retention", "Data Retention", { contentDir: "ch02/06-data-retention" }),
      L(7, "privacy-and-consent-concepts", "Privacy and Consent Concepts", { contentDir: "ch02/07-privacy-and-consent-concepts" }),
      L(8, "compliance", "Compliance", { contentDir: "ch02/08-compliance" }),
      L(9, "data-classification", "Data Classification", { contentDir: "ch02/09-data-classification" }),
      L(10, "audit-and-traceability", "Audit and Traceability", { contentDir: "ch02/10-audit-and-traceability" }),
    ],
  },
  {
    n: 3,
    title: "Building Governance",
    lessons: [
      L(11, "building-a-governance-framework", "Building a Governance Framework", { contentDir: "ch03/11-building-a-governance-framework" }),
      L(12, "governance-committees-and-processes", "Governance Committees and Processes", { contentDir: "ch03/12-governance-committees-and-processes" }),
      L(13, "governance-case-study", "Governance Case Study", { contentDir: "ch03/13-governance-case-study" }),
      L(14, "measuring-governance-success", "Measuring Governance Success", { contentDir: "ch03/14-measuring-governance-success" }),
    ],
  },
];
