// The Enterprise Structures & Chart of Accounts course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 02 — the first hands-on course. Lesson 1 walks students through activating their practice environment.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-enterprise-structures-and-chart-of-accounts/
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

export const ORACLE_FUSION_ENTERPRISE_STRUCTURES_AND_CHART_OF_ACCOUNTS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Getting Started in the Practice Environment",
    lessons: [
      L(1, "activate-your-practice-environment-and-sign-in", "Activate Your Practice Environment and Sign In"),
      L(2, "enterprise-structures-overview", "Enterprise Structures Overview"),
    ],
  },
  {
    n: 2,
    title: "Enterprise Structures",
    lessons: [
      L(3, "legal-entities-and-ledgers", "Legal Entities and Ledgers"),
      L(4, "business-units-and-reference-data-sets", "Business Units and Reference Data Sets"),
      L(5, "accounting-calendars-and-currencies", "Accounting Calendars and Currencies"),
    ],
  },
  {
    n: 3,
    title: "Chart of Accounts",
    lessons: [
      L(6, "chart-of-accounts-structure-and-segments", "Chart of Accounts Structure and Segments"),
      L(7, "value-sets-and-values", "Value Sets and Values"),
      L(8, "account-hierarchies-and-reference-data", "Account Hierarchies and Reference Data"),
    ],
  },
];
