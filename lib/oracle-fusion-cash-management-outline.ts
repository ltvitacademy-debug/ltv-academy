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
      L(1, "cash-management-overview-and-work-areas", "Cash Management Overview and Work Areas", { contentDir: "ch01/01-cash-management-overview-and-work-areas" }),
      L(2, "banks-bank-branches-and-bank-accounts", "Banks, Bank Branches and Bank Accounts", { contentDir: "ch01/02-banks-bank-branches-and-bank-accounts" }),
      L(3, "bank-account-uses-and-security", "Bank Account Uses and Security", { contentDir: "ch01/03-bank-account-uses-and-security" }),
      L(4, "reconciliation-setup-review", "Reconciliation Setup Review", { contentDir: "ch01/04-reconciliation-setup-review" }),
    ],
  },
  {
    n: 2,
    title: "Bank Statements",
    lessons: [
      L(5, "bank-statement-formats-bai2-mt940-and-camt-053", "Bank Statement Formats: BAI2, MT940 and CAMT.053", { contentDir: "ch02/05-bank-statement-formats-bai2-mt940-and-camt-053" }),
      L(6, "loading-and-importing-bank-statements", "Loading and Importing Bank Statements", { contentDir: "ch02/06-loading-and-importing-bank-statements" }),
      L(7, "bank-statement-transaction-codes", "Bank Statement Transaction Codes", { contentDir: "ch02/07-bank-statement-transaction-codes" }),
      L(8, "bank-statement-errors-and-corrections", "Bank Statement Errors and Corrections", { contentDir: "ch02/08-bank-statement-errors-and-corrections" }),
    ],
  },
  {
    n: 3,
    title: "Reconciliation",
    lessons: [
      L(9, "reconciliation-rules-and-matching-rules", "Reconciliation Rules and Matching Rules", { contentDir: "ch03/09-reconciliation-rules-and-matching-rules" }),
      L(10, "automatic-reconciliation", "Automatic Reconciliation", { contentDir: "ch03/10-automatic-reconciliation" }),
      L(11, "manual-reconciliation", "Manual Reconciliation", { contentDir: "ch03/11-manual-reconciliation" }),
      L(12, "reconciling-payables-payments-and-receivables-receipts", "Reconciling Payables Payments and Receivables Receipts", { contentDir: "ch03/12-reconciling-payables-payments-and-receivables-receipts" }),
      L(13, "handling-unreconciled-items", "Handling Unreconciled Items", { contentDir: "ch03/13-handling-unreconciled-items" }),
      L(14, "bank-statement-reconciliation-reports", "Bank Statement Reconciliation Reports", { contentDir: "ch03/14-bank-statement-reconciliation-reports" }),
    ],
  },
  {
    n: 4,
    title: "Bank Transactions and Positioning",
    lessons: [
      L(15, "external-cash-transactions", "External Cash Transactions", { contentDir: "ch04/15-external-cash-transactions" }),
      L(16, "bank-account-transfers", "Bank Account Transfers", { contentDir: "ch04/16-bank-account-transfers" }),
      L(17, "cash-positioning", "Cash Positioning", { contentDir: "ch04/17-cash-positioning" }),
      L(18, "cash-forecasting", "Cash Forecasting", { contentDir: "ch04/18-cash-forecasting" }),
      L(19, "cash-management-accounting", "Cash Management Accounting", { contentDir: "ch04/19-cash-management-accounting" }),
      L(20, "cash-management-troubleshooting-practice", "Cash Management Troubleshooting Practice", { contentDir: "ch04/20-cash-management-troubleshooting-practice" }),
    ],
  },
];
