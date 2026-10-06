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
      L(1, "what-accounting-is-for", "What Accounting Is For", { contentDir: "ch01/01-what-accounting-is-for" }),
      L(2, "the-accounting-equation", "The Accounting Equation", { contentDir: "ch01/02-the-accounting-equation" }),
      L(3, "businesses-entities-and-the-books", "Businesses, Entities and the Books", { contentDir: "ch01/03-businesses-entities-and-the-books" }),
    ],
  },
  {
    n: 2,
    title: "Debits and Credits",
    lessons: [
      L(4, "debits-and-credits-explained", "Debits and Credits Explained", { contentDir: "ch02/04-debits-and-credits-explained" }),
      L(5, "normal-balances-by-account-type", "Normal Balances by Account Type", { contentDir: "ch02/05-normal-balances-by-account-type" }),
      L(6, "t-accounts", "T-Accounts", { contentDir: "ch02/06-t-accounts" }),
      L(7, "recording-a-transaction-step-by-step", "Recording a Transaction Step by Step", { contentDir: "ch02/07-recording-a-transaction-step-by-step" }),
      L(8, "common-debit-and-credit-mistakes", "Common Debit and Credit Mistakes", { contentDir: "ch02/08-common-debit-and-credit-mistakes" }),
    ],
  },
  {
    n: 3,
    title: "The Elements of Financial Statements",
    lessons: [
      L(9, "assets", "Assets", { contentDir: "ch03/09-assets" }),
      L(10, "liabilities", "Liabilities", { contentDir: "ch03/10-liabilities" }),
      L(11, "equity", "Equity", { contentDir: "ch03/11-equity" }),
      L(12, "revenue", "Revenue", { contentDir: "ch03/12-revenue" }),
      L(13, "expenses", "Expenses", { contentDir: "ch03/13-expenses" }),
    ],
  },
  {
    n: 4,
    title: "Journal Entries and Ledgers",
    lessons: [
      L(14, "journal-entries", "Journal Entries", { contentDir: "ch04/14-journal-entries" }),
      L(15, "adjusting-and-reversing-entries", "Adjusting and Reversing Entries", { contentDir: "ch04/15-adjusting-and-reversing-entries" }),
      L(16, "the-general-ledger-and-subledgers", "The General Ledger and Subledgers", { contentDir: "ch04/16-the-general-ledger-and-subledgers" }),
      L(17, "the-trial-balance", "The Trial Balance", { contentDir: "ch04/17-the-trial-balance" }),
      L(18, "finding-errors-in-a-trial-balance", "Finding Errors in a Trial Balance", { contentDir: "ch04/18-finding-errors-in-a-trial-balance" }),
    ],
  },
  {
    n: 5,
    title: "Accounting Concepts",
    lessons: [
      L(19, "accrual-vs-cash-accounting", "Accrual vs. Cash Accounting", { contentDir: "ch05/19-accrual-vs-cash-accounting" }),
      L(20, "revenue-recognition-basics", "Revenue Recognition Basics", { contentDir: "ch05/20-revenue-recognition-basics" }),
      L(21, "accounting-periods-and-the-close-cycle", "Accounting Periods and the Close Cycle", { contentDir: "ch05/21-accounting-periods-and-the-close-cycle" }),
      L(22, "accruals-deferrals-and-prepaid-expenses", "Accruals, Deferrals and Prepaid Expenses", { contentDir: "ch05/22-accruals-deferrals-and-prepaid-expenses" }),
      L(23, "depreciation-concepts", "Depreciation Concepts", { contentDir: "ch05/23-depreciation-concepts" }),
      L(24, "foreign-currency-basics", "Foreign Currency Basics", { contentDir: "ch05/24-foreign-currency-basics" }),
    ],
  },
  {
    n: 6,
    title: "Financial Statements",
    lessons: [
      L(25, "the-income-statement", "The Income Statement", { contentDir: "ch06/25-the-income-statement" }),
      L(26, "the-balance-sheet", "The Balance Sheet", { contentDir: "ch06/26-the-balance-sheet" }),
      L(27, "the-cash-flow-statement", "The Cash Flow Statement", { contentDir: "ch06/27-the-cash-flow-statement" }),
      L(28, "from-transactions-to-financial-statements", "From Transactions to Financial Statements", { contentDir: "ch06/28-from-transactions-to-financial-statements" }),
      L(29, "month-end-and-year-end-close-overview", "Month-End and Year-End Close Overview", { contentDir: "ch06/29-month-end-and-year-end-close-overview" }),
    ],
  },
];
