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
      L(1, "what-accounting-is-for", "What Accounting Is For", { contentDir: "ch01/01-what-accounting-is-for", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524952/ltv-accounting-fundamentals-for-oracle-professionals/what-accounting-is-for.mp4", durationLabel: "1 min 49 s" }),
      L(2, "the-accounting-equation", "The Accounting Equation", { contentDir: "ch01/02-the-accounting-equation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525598/ltv-accounting-fundamentals-for-oracle-professionals/the-accounting-equation.mp4", durationLabel: "1 min 42 s" }),
      L(3, "businesses-entities-and-the-books", "Businesses, Entities and the Books", { contentDir: "ch01/03-businesses-entities-and-the-books", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526290/ltv-accounting-fundamentals-for-oracle-professionals/businesses-entities-and-the-books.mp4", durationLabel: "1 min 46 s" }),
    ],
  },
  {
    n: 2,
    title: "Debits and Credits",
    lessons: [
      L(4, "debits-and-credits-explained", "Debits and Credits Explained", { contentDir: "ch02/04-debits-and-credits-explained", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526926/ltv-accounting-fundamentals-for-oracle-professionals/debits-and-credits-explained.mp4", durationLabel: "1 min 39 s" }),
      L(5, "normal-balances-by-account-type", "Normal Balances by Account Type", { contentDir: "ch02/05-normal-balances-by-account-type", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527569/ltv-accounting-fundamentals-for-oracle-professionals/normal-balances-by-account-type.mp4", durationLabel: "1 min 36 s" }),
      L(6, "t-accounts", "T-Accounts", { contentDir: "ch02/06-t-accounts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528169/ltv-accounting-fundamentals-for-oracle-professionals/t-accounts.mp4", durationLabel: "1 min 33 s" }),
      L(7, "recording-a-transaction-step-by-step", "Recording a Transaction Step by Step", { contentDir: "ch02/07-recording-a-transaction-step-by-step", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528807/ltv-accounting-fundamentals-for-oracle-professionals/recording-a-transaction-step-by-step.mp4", durationLabel: "1 min 38 s" }),
      L(8, "common-debit-and-credit-mistakes", "Common Debit and Credit Mistakes", { contentDir: "ch02/08-common-debit-and-credit-mistakes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529451/ltv-accounting-fundamentals-for-oracle-professionals/common-debit-and-credit-mistakes.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
  {
    n: 3,
    title: "The Elements of Financial Statements",
    lessons: [
      L(9, "assets", "Assets", { contentDir: "ch03/09-assets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530085/ltv-accounting-fundamentals-for-oracle-professionals/assets.mp4", durationLabel: "1 min 38 s" }),
      L(10, "liabilities", "Liabilities", { contentDir: "ch03/10-liabilities", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530655/ltv-accounting-fundamentals-for-oracle-professionals/liabilities.mp4", durationLabel: "1 min 38 s" }),
      L(11, "equity", "Equity", { contentDir: "ch03/11-equity", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531281/ltv-accounting-fundamentals-for-oracle-professionals/equity.mp4", durationLabel: "1 min 39 s" }),
      L(12, "revenue", "Revenue", { contentDir: "ch03/12-revenue", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531989/ltv-accounting-fundamentals-for-oracle-professionals/revenue.mp4", durationLabel: "1 min 41 s" }),
      L(13, "expenses", "Expenses", { contentDir: "ch03/13-expenses", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532519/ltv-accounting-fundamentals-for-oracle-professionals/expenses.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 4,
    title: "Journal Entries and Ledgers",
    lessons: [
      L(14, "journal-entries", "Journal Entries", { contentDir: "ch04/14-journal-entries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532906/ltv-accounting-fundamentals-for-oracle-professionals/journal-entries.mp4", durationLabel: "1 min 30 s" }),
      L(15, "adjusting-and-reversing-entries", "Adjusting and Reversing Entries", { contentDir: "ch04/15-adjusting-and-reversing-entries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533263/ltv-accounting-fundamentals-for-oracle-professionals/adjusting-and-reversing-entries.mp4", durationLabel: "1 min 39 s" }),
      L(16, "the-general-ledger-and-subledgers", "The General Ledger and Subledgers", { contentDir: "ch04/16-the-general-ledger-and-subledgers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533579/ltv-accounting-fundamentals-for-oracle-professionals/the-general-ledger-and-subledgers.mp4", durationLabel: "1 min 43 s" }),
      L(17, "the-trial-balance", "The Trial Balance", { contentDir: "ch04/17-the-trial-balance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533745/ltv-accounting-fundamentals-for-oracle-professionals/the-trial-balance.mp4", durationLabel: "1 min 33 s" }),
      L(18, "finding-errors-in-a-trial-balance", "Finding Errors in a Trial Balance", { contentDir: "ch04/18-finding-errors-in-a-trial-balance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533894/ltv-accounting-fundamentals-for-oracle-professionals/finding-errors-in-a-trial-balance.mp4", durationLabel: "1 min 36 s" }),
    ],
  },
  {
    n: 5,
    title: "Accounting Concepts",
    lessons: [
      L(19, "accrual-vs-cash-accounting", "Accrual vs. Cash Accounting", { contentDir: "ch05/19-accrual-vs-cash-accounting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534040/ltv-accounting-fundamentals-for-oracle-professionals/accrual-vs-cash-accounting.mp4", durationLabel: "1 min 39 s" }),
      L(20, "revenue-recognition-basics", "Revenue Recognition Basics", { contentDir: "ch05/20-revenue-recognition-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534158/ltv-accounting-fundamentals-for-oracle-professionals/revenue-recognition-basics.mp4", durationLabel: "1 min 39 s" }),
      L(21, "accounting-periods-and-the-close-cycle", "Accounting Periods and the Close Cycle", { contentDir: "ch05/21-accounting-periods-and-the-close-cycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534247/ltv-accounting-fundamentals-for-oracle-professionals/accounting-periods-and-the-close-cycle.mp4", durationLabel: "1 min 29 s" }),
      L(22, "accruals-deferrals-and-prepaid-expenses", "Accruals, Deferrals and Prepaid Expenses", { contentDir: "ch05/22-accruals-deferrals-and-prepaid-expenses", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534348/ltv-accounting-fundamentals-for-oracle-professionals/accruals-deferrals-and-prepaid-expenses.mp4", durationLabel: "1 min 37 s" }),
      L(23, "depreciation-concepts", "Depreciation Concepts", { contentDir: "ch05/23-depreciation-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534458/ltv-accounting-fundamentals-for-oracle-professionals/depreciation-concepts.mp4", durationLabel: "1 min 45 s" }),
      L(24, "foreign-currency-basics", "Foreign Currency Basics", { contentDir: "ch05/24-foreign-currency-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534543/ltv-accounting-fundamentals-for-oracle-professionals/foreign-currency-basics.mp4", durationLabel: "1 min 40 s" }),
    ],
  },
  {
    n: 6,
    title: "Financial Statements",
    lessons: [
      L(25, "the-income-statement", "The Income Statement", { contentDir: "ch06/25-the-income-statement", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534627/ltv-accounting-fundamentals-for-oracle-professionals/the-income-statement.mp4", durationLabel: "1 min 37 s" }),
      L(26, "the-balance-sheet", "The Balance Sheet", { contentDir: "ch06/26-the-balance-sheet", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534715/ltv-accounting-fundamentals-for-oracle-professionals/the-balance-sheet.mp4", durationLabel: "1 min 33 s" }),
      L(27, "the-cash-flow-statement", "The Cash Flow Statement", { contentDir: "ch06/27-the-cash-flow-statement", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534813/ltv-accounting-fundamentals-for-oracle-professionals/the-cash-flow-statement.mp4", durationLabel: "1 min 41 s" }),
      L(28, "from-transactions-to-financial-statements", "From Transactions to Financial Statements", { contentDir: "ch06/28-from-transactions-to-financial-statements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534903/ltv-accounting-fundamentals-for-oracle-professionals/from-transactions-to-financial-statements.mp4", durationLabel: "1 min 45 s" }),
      L(29, "month-end-and-year-end-close-overview", "Month-End and Year-End Close Overview", { contentDir: "ch06/29-month-end-and-year-end-close-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535001/ltv-accounting-fundamentals-for-oracle-professionals/month-end-and-year-end-close-overview.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
];
