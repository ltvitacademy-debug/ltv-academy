// The Cash Management course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 03. Oracle Fusion Cloud Cash Management.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-cash-management/
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

export const ORACLE_FUSION_CASH_MANAGEMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Bank Accounts and Statements",
    lessons: [
      L(1, "bank-accounts-and-setup", "Bank Accounts and Setup"),
      L(2, "loading-bank-statements", "Loading Bank Statements"),
    ],
  },
  {
    n: 2,
    title: "Reconciliation",
    lessons: [
      L(3, "reconciliation-rules-and-transaction-matching", "Reconciliation Rules and Transaction Matching"),
      L(4, "manual-and-automatic-reconciliation", "Manual and Automatic Reconciliation"),
      L(5, "handling-unreconciled-items", "Handling Unreconciled Items"),
    ],
  },
  {
    n: 3,
    title: "Cash Positioning",
    lessons: [
      L(6, "cash-positioning-and-forecasting", "Cash Positioning and Forecasting"),
    ],
  },
];
