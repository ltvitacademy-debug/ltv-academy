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
    title: "Why Accounting Matters to Oracle Consultants",
    lessons: [
      L(1, "what-accounting-is-for", "What Accounting Is For"),
      L(2, "the-accounting-equation", "The Accounting Equation"),
      L(3, "businesses-entities-and-the-books", "Businesses, Entities and the Books"),
    ],
  },
  {
    n: 2,
    title: "Debits and Credits",
    lessons: [
      L(4, "debits-and-credits-explained", "Debits and Credits Explained"),
      L(5, "normal-balances-by-account-type", "Normal Balances by Account Type"),
      L(6, "t-accounts", "T-Accounts"),
      L(7, "recording-a-transaction-step-by-step", "Recording a Transaction Step by Step"),
      L(8, "common-debit-and-credit-mistakes", "Common Debit and Credit Mistakes"),
    ],
  },
  {
    n: 3,
    title: "The Elements of Financial Statements",
    lessons: [
      L(9, "assets", "Assets"),
      L(10, "liabilities", "Liabilities"),
      L(11, "equity", "Equity"),
      L(12, "revenue", "Revenue"),
      L(13, "expenses", "Expenses"),
    ],
  },
  {
    n: 4,
    title: "Journal Entries and Ledgers",
    lessons: [
      L(14, "journal-entries", "Journal Entries"),
      L(15, "adjusting-and-reversing-entries", "Adjusting and Reversing Entries"),
      L(16, "the-general-ledger-and-subledgers", "The General Ledger and Subledgers"),
      L(17, "the-trial-balance", "The Trial Balance"),
      L(18, "finding-errors-in-a-trial-balance", "Finding Errors in a Trial Balance"),
    ],
  },
  {
    n: 5,
    title: "Accounting Concepts",
    lessons: [
      L(19, "accrual-vs-cash-accounting", "Accrual vs. Cash Accounting"),
      L(20, "revenue-recognition-basics", "Revenue Recognition Basics"),
      L(21, "accounting-periods-and-the-close-cycle", "Accounting Periods and the Close Cycle"),
      L(22, "accruals-deferrals-and-prepaid-expenses", "Accruals, Deferrals and Prepaid Expenses"),
      L(23, "depreciation-concepts", "Depreciation Concepts"),
      L(24, "foreign-currency-basics", "Foreign Currency Basics"),
    ],
  },
  {
    n: 6,
    title: "Financial Statements",
    lessons: [
      L(25, "the-income-statement", "The Income Statement"),
      L(26, "the-balance-sheet", "The Balance Sheet"),
      L(27, "the-cash-flow-statement", "The Cash Flow Statement"),
      L(28, "from-transactions-to-financial-statements", "From Transactions to Financial Statements"),
      L(29, "month-end-and-year-end-close-overview", "Month-End and Year-End Close Overview"),
    ],
  },
];
