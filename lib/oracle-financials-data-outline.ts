// The Oracle Financials Data course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 05. The data-model view that makes SQL and troubleshooting make sense.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-financials-data/
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

export const ORACLE_FINANCIALS_DATA_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "The Financial Data Model",
    lessons: [
      L(1, "how-financial-data-is-organized", "How Financial Data Is Organized"),
      L(2, "suppliers-and-customers-in-the-data-model", "Suppliers and Customers in the Data Model"),
    ],
  },
  {
    n: 2,
    title: "How Transactions Relate",
    lessons: [
      L(3, "invoices-and-payments-how-they-relate", "Invoices and Payments: How They Relate"),
      L(4, "journals-ledgers-and-balances", "Journals, Ledgers and Balances"),
      L(5, "following-an-accounting-transaction-across-tables", "Following an Accounting Transaction Across Tables"),
    ],
  },
  {
    n: 3,
    title: "Reading the Documentation",
    lessons: [
      L(6, "reading-data-documentation-and-data-dictionaries", "Reading Data Documentation and Data Dictionaries"),
    ],
  },
];
