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
      L(1, "cash-management-overview-and-work-areas", "Cash Management Overview and Work Areas", { contentDir: "ch01/01-cash-management-overview-and-work-areas", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618026/ltv-oracle-fusion-cash-management/cash-management-overview-and-work-areas.mp4", durationLabel: "1 min 54 s" }),
      L(2, "banks-bank-branches-and-bank-accounts", "Banks, Bank Branches and Bank Accounts", { contentDir: "ch01/02-banks-bank-branches-and-bank-accounts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618121/ltv-oracle-fusion-cash-management/banks-bank-branches-and-bank-accounts.mp4", durationLabel: "1 min 59 s" }),
      L(3, "bank-account-uses-and-security", "Bank Account Uses and Security", { contentDir: "ch01/03-bank-account-uses-and-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618208/ltv-oracle-fusion-cash-management/bank-account-uses-and-security.mp4", durationLabel: "1 min 54 s" }),
      L(4, "reconciliation-setup-review", "Reconciliation Setup Review", { contentDir: "ch01/04-reconciliation-setup-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618311/ltv-oracle-fusion-cash-management/reconciliation-setup-review.mp4", durationLabel: "1 min 59 s" }),
    ],
  },
  {
    n: 2,
    title: "Bank Statements",
    lessons: [
      L(5, "bank-statement-formats-bai2-mt940-and-camt-053", "Bank Statement Formats: BAI2, MT940 and CAMT.053", { contentDir: "ch02/05-bank-statement-formats-bai2-mt940-and-camt-053", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618417/ltv-oracle-fusion-cash-management/bank-statement-formats-bai2-mt940-and-camt-053.mp4", durationLabel: "2 min 2 s" }),
      L(6, "loading-and-importing-bank-statements", "Loading and Importing Bank Statements", { contentDir: "ch02/06-loading-and-importing-bank-statements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618514/ltv-oracle-fusion-cash-management/loading-and-importing-bank-statements.mp4", durationLabel: "1 min 56 s" }),
      L(7, "bank-statement-transaction-codes", "Bank Statement Transaction Codes", { contentDir: "ch02/07-bank-statement-transaction-codes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618606/ltv-oracle-fusion-cash-management/bank-statement-transaction-codes.mp4", durationLabel: "1 min 58 s" }),
      L(8, "bank-statement-errors-and-corrections", "Bank Statement Errors and Corrections", { contentDir: "ch02/08-bank-statement-errors-and-corrections", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618689/ltv-oracle-fusion-cash-management/bank-statement-errors-and-corrections.mp4", durationLabel: "1 min 46 s" }),
    ],
  },
  {
    n: 3,
    title: "Reconciliation",
    lessons: [
      L(9, "reconciliation-rules-and-matching-rules", "Reconciliation Rules and Matching Rules", { contentDir: "ch03/09-reconciliation-rules-and-matching-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618792/ltv-oracle-fusion-cash-management/reconciliation-rules-and-matching-rules.mp4", durationLabel: "2 min 1 s" }),
      L(10, "automatic-reconciliation", "Automatic Reconciliation", { contentDir: "ch03/10-automatic-reconciliation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618879/ltv-oracle-fusion-cash-management/automatic-reconciliation.mp4", durationLabel: "1 min 50 s" }),
      L(11, "manual-reconciliation", "Manual Reconciliation", { contentDir: "ch03/11-manual-reconciliation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792618970/ltv-oracle-fusion-cash-management/manual-reconciliation.mp4", durationLabel: "1 min 50 s" }),
      L(12, "reconciling-payables-payments-and-receivables-receipts", "Reconciling Payables Payments and Receivables Receipts", { contentDir: "ch03/12-reconciling-payables-payments-and-receivables-receipts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619087/ltv-oracle-fusion-cash-management/reconciling-payables-payments-and-receivables-receipts.mp4", durationLabel: "2 min 0 s" }),
      L(13, "handling-unreconciled-items", "Handling Unreconciled Items", { contentDir: "ch03/13-handling-unreconciled-items", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619193/ltv-oracle-fusion-cash-management/handling-unreconciled-items.mp4", durationLabel: "1 min 53 s" }),
      L(14, "bank-statement-reconciliation-reports", "Bank Statement Reconciliation Reports", { contentDir: "ch03/14-bank-statement-reconciliation-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619299/ltv-oracle-fusion-cash-management/bank-statement-reconciliation-reports.mp4", durationLabel: "1 min 54 s" }),
    ],
  },
  {
    n: 4,
    title: "Bank Transactions and Positioning",
    lessons: [
      L(15, "external-cash-transactions", "External Cash Transactions", { contentDir: "ch04/15-external-cash-transactions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619386/ltv-oracle-fusion-cash-management/external-cash-transactions.mp4", durationLabel: "1 min 56 s" }),
      L(16, "bank-account-transfers", "Bank Account Transfers", { contentDir: "ch04/16-bank-account-transfers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619481/ltv-oracle-fusion-cash-management/bank-account-transfers.mp4", durationLabel: "1 min 56 s" }),
      L(17, "cash-positioning", "Cash Positioning", { contentDir: "ch04/17-cash-positioning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619568/ltv-oracle-fusion-cash-management/cash-positioning.mp4", durationLabel: "2 min 4 s" }),
      L(18, "cash-forecasting", "Cash Forecasting", { contentDir: "ch04/18-cash-forecasting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619669/ltv-oracle-fusion-cash-management/cash-forecasting.mp4", durationLabel: "1 min 57 s" }),
      L(19, "cash-management-accounting", "Cash Management Accounting", { contentDir: "ch04/19-cash-management-accounting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619757/ltv-oracle-fusion-cash-management/cash-management-accounting.mp4", durationLabel: "1 min 52 s" }),
      L(20, "cash-management-troubleshooting-practice", "Cash Management Troubleshooting Practice", { contentDir: "ch04/20-cash-management-troubleshooting-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792619861/ltv-oracle-fusion-cash-management/cash-management-troubleshooting-practice.mp4", durationLabel: "2 min 22 s" }),
    ],
  },
];
