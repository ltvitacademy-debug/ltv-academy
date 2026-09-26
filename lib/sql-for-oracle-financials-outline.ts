// The SQL for Oracle Financials course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 05. Applied SQL for finance investigations; the unpaid-invoice challenge is the running example.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/sql-for-oracle-financials/
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

export const SQL_FOR_ORACLE_FINANCIALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "SQL for Finance Data",
    lessons: [
      L(1, "sql-refresher-for-finance-data", "SQL Refresher for Finance Data"),
      L(2, "joining-financial-tables", "Joining Financial Tables"),
      L(3, "aggregating-balances-and-totals", "Aggregating Balances and Totals"),
      L(4, "filtering-dates-and-aging-buckets", "Filtering Dates and Aging Buckets"),
    ],
  },
  {
    n: 2,
    title: "Investigating Financial Data",
    lessons: [
      L(5, "reconciling-transactions-with-sql", "Reconciling Transactions with SQL"),
      L(6, "identifying-exceptions", "Identifying Exceptions"),
      L(7, "answering-business-questions-the-unpaid-invoices-challenge", "Answering Business Questions: The Unpaid Invoices Challenge"),
      L(8, "sql-practice-set-month-end-investigations", "SQL Practice Set: Month-End Investigations"),
    ],
  },
];
