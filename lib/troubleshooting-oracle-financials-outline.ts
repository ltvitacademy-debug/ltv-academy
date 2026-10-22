// The Troubleshooting Oracle Financials course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 08. Eight realistic production-support tickets; each is diagnose, resolve, document.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/troubleshooting-oracle-financials/
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

export const TROUBLESHOOTING_ORACLE_FINANCIALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "How to Work a Support Ticket",
    lessons: [
      L(1, "the-support-ticket-workflow", "The Support Ticket Workflow", { contentDir: "ch01/01-the-support-ticket-workflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632053/ltv-troubleshooting-oracle-financials/the-support-ticket-workflow.mp4", durationLabel: "2 min 2 s" }),
      L(2, "diagnosing-problems-step-by-step", "Diagnosing Problems Step by Step", { contentDir: "ch01/02-diagnosing-problems-step-by-step", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632140/ltv-troubleshooting-oracle-financials/diagnosing-problems-step-by-step.mp4", durationLabel: "2 min 4 s" }),
      L(3, "documenting-a-resolution", "Documenting a Resolution", { contentDir: "ch01/03-documenting-a-resolution", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632231/ltv-troubleshooting-oracle-financials/documenting-a-resolution.mp4", durationLabel: "2 min 5 s" }),
    ],
  },
  {
    n: 2,
    title: "Payables Tickets",
    lessons: [
      L(4, "ticket-ap-invoice-will-not-validate", "Ticket: AP Invoice Will Not Validate", { contentDir: "ch02/04-ticket-ap-invoice-will-not-validate", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632322/ltv-troubleshooting-oracle-financials/ticket-ap-invoice-will-not-validate.mp4", durationLabel: "2 min 6 s" }),
      L(5, "ticket-invoice-stuck-on-hold", "Ticket: Invoice Stuck on Hold", { contentDir: "ch02/05-ticket-invoice-stuck-on-hold", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632420/ltv-troubleshooting-oracle-financials/ticket-invoice-stuck-on-hold.mp4", durationLabel: "2 min 17 s" }),
      L(6, "ticket-invoice-matching-variance", "Ticket: Invoice Matching Variance", { contentDir: "ch02/06-ticket-invoice-matching-variance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632501/ltv-troubleshooting-oracle-financials/ticket-invoice-matching-variance.mp4", durationLabel: "1 min 55 s" }),
      L(7, "ticket-duplicate-invoice-entered", "Ticket: Duplicate Invoice Entered", { contentDir: "ch02/07-ticket-duplicate-invoice-entered", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632589/ltv-troubleshooting-oracle-financials/ticket-duplicate-invoice-entered.mp4", durationLabel: "2 min 11 s" }),
      L(8, "ticket-payment-is-missing-from-gl", "Ticket: Payment Is Missing from GL", { contentDir: "ch02/08-ticket-payment-is-missing-from-gl", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632678/ltv-troubleshooting-oracle-financials/ticket-payment-is-missing-from-gl.mp4", durationLabel: "1 min 55 s" }),
      L(9, "ticket-payment-process-request-failed", "Ticket: Payment Process Request Failed", { contentDir: "ch02/09-ticket-payment-process-request-failed", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632760/ltv-troubleshooting-oracle-financials/ticket-payment-process-request-failed.mp4", durationLabel: "2 min 3 s" }),
      L(10, "ticket-supplier-was-configured-incorrectly", "Ticket: Supplier Was Configured Incorrectly", { contentDir: "ch02/10-ticket-supplier-was-configured-incorrectly", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632842/ltv-troubleshooting-oracle-financials/ticket-supplier-was-configured-incorrectly.mp4", durationLabel: "1 min 53 s" }),
    ],
  },
  {
    n: 3,
    title: "Receivables and Cash Tickets",
    lessons: [
      L(11, "ticket-ar-does-not-reconcile-with-gl", "Ticket: AR Does Not Reconcile with GL", { contentDir: "ch03/11-ticket-ar-does-not-reconcile-with-gl", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632927/ltv-troubleshooting-oracle-financials/ticket-ar-does-not-reconcile-with-gl.mp4", durationLabel: "2 min 8 s" }),
      L(12, "ticket-receipt-applied-to-the-wrong-invoice", "Ticket: Receipt Applied to the Wrong Invoice", { contentDir: "ch03/12-ticket-receipt-applied-to-the-wrong-invoice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633013/ltv-troubleshooting-oracle-financials/ticket-receipt-applied-to-the-wrong-invoice.mp4", durationLabel: "2 min 3 s" }),
      L(13, "ticket-autoinvoice-rejected-transactions", "Ticket: AutoInvoice Rejected Transactions", { contentDir: "ch03/13-ticket-autoinvoice-rejected-transactions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633107/ltv-troubleshooting-oracle-financials/ticket-autoinvoice-rejected-transactions.mp4", durationLabel: "2 min 9 s" }),
      L(14, "ticket-customer-statement-is-wrong", "Ticket: Customer Statement Is Wrong", { contentDir: "ch03/14-ticket-customer-statement-is-wrong", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633190/ltv-troubleshooting-oracle-financials/ticket-customer-statement-is-wrong.mp4", durationLabel: "1 min 59 s" }),
      L(15, "ticket-bank-statement-will-not-reconcile", "Ticket: Bank Statement Will Not Reconcile", { contentDir: "ch03/15-ticket-bank-statement-will-not-reconcile", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633281/ltv-troubleshooting-oracle-financials/ticket-bank-statement-will-not-reconcile.mp4", durationLabel: "2 min 14 s" }),
    ],
  },
  {
    n: 4,
    title: "General Ledger and Subledger Tickets",
    lessons: [
      L(16, "ticket-journal-will-not-post", "Ticket: Journal Will Not Post", { contentDir: "ch04/16-ticket-journal-will-not-post", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633359/ltv-troubleshooting-oracle-financials/ticket-journal-will-not-post.mp4", durationLabel: "1 min 49 s" }),
      L(17, "ticket-journal-import-failed", "Ticket: Journal Import Failed", { contentDir: "ch04/17-ticket-journal-import-failed", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633446/ltv-troubleshooting-oracle-financials/ticket-journal-import-failed.mp4", durationLabel: "2 min 3 s" }),
      L(18, "ticket-accounting-failed-in-subledger-accounting", "Ticket: Accounting Failed in Subledger Accounting", { contentDir: "ch04/18-ticket-accounting-failed-in-subledger-accounting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633532/ltv-troubleshooting-oracle-financials/ticket-accounting-failed-in-subledger-accounting.mp4", durationLabel: "2 min 3 s" }),
      L(19, "ticket-subledger-entries-did-not-transfer-to-gl", "Ticket: Subledger Entries Did Not Transfer to GL", { contentDir: "ch04/19-ticket-subledger-entries-did-not-transfer-to-gl", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633620/ltv-troubleshooting-oracle-financials/ticket-subledger-entries-did-not-transfer-to-gl.mp4", durationLabel: "1 min 56 s" }),
      L(20, "ticket-accounting-period-will-not-close", "Ticket: Accounting Period Will Not Close", { contentDir: "ch04/20-ticket-accounting-period-will-not-close", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633705/ltv-troubleshooting-oracle-financials/ticket-accounting-period-will-not-close.mp4", durationLabel: "2 min 7 s" }),
    ],
  },
  {
    n: 5,
    title: "Assets, Expenses and Setup Tickets",
    lessons: [
      L(21, "ticket-asset-depreciation-did-not-run", "Ticket: Asset Depreciation Did Not Run", { contentDir: "ch05/21-ticket-asset-depreciation-did-not-run", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633783/ltv-troubleshooting-oracle-financials/ticket-asset-depreciation-did-not-run.mp4", durationLabel: "1 min 44 s" }),
      L(22, "ticket-mass-additions-are-not-posting", "Ticket: Mass Additions Are Not Posting", { contentDir: "ch05/22-ticket-mass-additions-are-not-posting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633875/ltv-troubleshooting-oracle-financials/ticket-mass-additions-are-not-posting.mp4", durationLabel: "2 min 9 s" }),
      L(23, "ticket-expense-report-is-stuck-in-approval", "Ticket: Expense Report Is Stuck in Approval", { contentDir: "ch05/23-ticket-expense-report-is-stuck-in-approval", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633962/ltv-troubleshooting-oracle-financials/ticket-expense-report-is-stuck-in-approval.mp4", durationLabel: "1 min 57 s" }),
      L(24, "ticket-user-cannot-access-a-business-unit", "Ticket: User Cannot Access a Business Unit", { contentDir: "ch05/24-ticket-user-cannot-access-a-business-unit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792634040/ltv-troubleshooting-oracle-financials/ticket-user-cannot-access-a-business-unit.mp4", durationLabel: "2 min 3 s" }),
      L(25, "ticket-user-cannot-see-journals", "Ticket: User Cannot See Journals", { contentDir: "ch05/25-ticket-user-cannot-see-journals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792634116/ltv-troubleshooting-oracle-financials/ticket-user-cannot-see-journals.mp4", durationLabel: "2 min 8 s" }),
    ],
  },
  {
    n: 6,
    title: "Data and Integration Tickets",
    lessons: [
      L(26, "ticket-fbdi-import-failed", "Ticket: FBDI Import Failed", { contentDir: "ch06/26-ticket-fbdi-import-failed", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792634183/ltv-troubleshooting-oracle-financials/ticket-fbdi-import-failed.mp4", durationLabel: "2 min 4 s" }),
      L(27, "ticket-adfdi-upload-errors", "Ticket: ADFdi Upload Errors", { contentDir: "ch06/27-ticket-adfdi-upload-errors", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792634252/ltv-troubleshooting-oracle-financials/ticket-adfdi-upload-errors.mp4", durationLabel: "2 min 11 s" }),
      L(28, "ticket-rest-api-call-returns-an-error", "Ticket: REST API Call Returns an Error", { contentDir: "ch06/28-ticket-rest-api-call-returns-an-error", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792634323/ltv-troubleshooting-oracle-financials/ticket-rest-api-call-returns-an-error.mp4", durationLabel: "2 min 9 s" }),
      L(29, "ticket-report-shows-the-wrong-numbers", "Ticket: Report Shows the Wrong Numbers", { contentDir: "ch06/29-ticket-report-shows-the-wrong-numbers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792634401/ltv-troubleshooting-oracle-financials/ticket-report-shows-the-wrong-numbers.mp4", durationLabel: "2 min 21 s" }),
    ],
  },
];
