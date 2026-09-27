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
    title: "Cash Management Fundamentals",
    lessons: [
      L(1, "cash-management-overview-and-work-areas", "Cash Management Overview and Work Areas"),
      L(2, "banks-bank-branches-and-bank-accounts", "Banks, Bank Branches and Bank Accounts"),
      L(3, "bank-account-uses-and-security", "Bank Account Uses and Security"),
      L(4, "reconciliation-setup-review", "Reconciliation Setup Review"),
    ],
  },
  {
    n: 2,
    title: "Bank Statements",
    lessons: [
      L(5, "bank-statement-formats-bai2-mt940-and-camt-053", "Bank Statement Formats: BAI2, MT940 and CAMT.053"),
      L(6, "loading-and-importing-bank-statements", "Loading and Importing Bank Statements"),
      L(7, "bank-statement-transaction-codes", "Bank Statement Transaction Codes"),
      L(8, "bank-statement-errors-and-corrections", "Bank Statement Errors and Corrections"),
    ],
  },
  {
    n: 3,
    title: "Reconciliation",
    lessons: [
      L(9, "reconciliation-rules-and-matching-rules", "Reconciliation Rules and Matching Rules"),
      L(10, "automatic-reconciliation", "Automatic Reconciliation"),
      L(11, "manual-reconciliation", "Manual Reconciliation"),
      L(12, "reconciling-payables-payments-and-receivables-receipts", "Reconciling Payables Payments and Receivables Receipts"),
      L(13, "handling-unreconciled-items", "Handling Unreconciled Items"),
      L(14, "bank-statement-reconciliation-reports", "Bank Statement Reconciliation Reports"),
    ],
  },
  {
    n: 4,
    title: "Bank Transactions and Positioning",
    lessons: [
      L(15, "external-cash-transactions", "External Cash Transactions"),
      L(16, "bank-account-transfers", "Bank Account Transfers"),
      L(17, "cash-positioning", "Cash Positioning"),
      L(18, "cash-forecasting", "Cash Forecasting"),
      L(19, "cash-management-accounting", "Cash Management Accounting"),
      L(20, "cash-management-troubleshooting-practice", "Cash Management Troubleshooting Practice"),
    ],
  },
];
