// The Accounting Fundamentals for Oracle Professionals course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 01. No accounting background assumed; everything is taught with the Oracle Fusion consultant's job in mind.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/accounting-fundamentals-for-oracle-professionals/
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

export const ACCOUNTING_FUNDAMENTALS_FOR_ORACLE_PROFESSIONALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Accounting Basics",
    lessons: [
      L(1, "debits-and-credits", "Debits and Credits"),
      L(2, "assets-liabilities-and-equity", "Assets, Liabilities and Equity"),
      L(3, "revenue-and-expenses", "Revenue and Expenses"),
      L(4, "journal-entries", "Journal Entries"),
    ],
  },
  {
    n: 2,
    title: "Ledgers and Books",
    lessons: [
      L(5, "ledgers-and-subledgers", "Ledgers and Subledgers"),
      L(6, "accounting-periods-and-the-close-cycle", "Accounting Periods and the Close Cycle"),
      L(7, "the-trial-balance", "The Trial Balance"),
    ],
  },
  {
    n: 3,
    title: "Financial Statements",
    lessons: [
      L(8, "the-income-statement", "The Income Statement"),
      L(9, "the-balance-sheet", "The Balance Sheet"),
      L(10, "from-transactions-to-financial-statements", "From Transactions to Financial Statements"),
    ],
  },
];
