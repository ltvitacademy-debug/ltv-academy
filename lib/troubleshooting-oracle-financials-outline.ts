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
      L(1, "the-support-ticket-workflow", "The Support Ticket Workflow", { contentDir: "ch01/01-the-support-ticket-workflow" }),
      L(2, "diagnosing-problems-step-by-step", "Diagnosing Problems Step by Step", { contentDir: "ch01/02-diagnosing-problems-step-by-step" }),
      L(3, "documenting-a-resolution", "Documenting a Resolution", { contentDir: "ch01/03-documenting-a-resolution" }),
    ],
  },
  {
    n: 2,
    title: "Payables Tickets",
    lessons: [
      L(4, "ticket-ap-invoice-will-not-validate", "Ticket: AP Invoice Will Not Validate", { contentDir: "ch02/04-ticket-ap-invoice-will-not-validate" }),
      L(5, "ticket-invoice-stuck-on-hold", "Ticket: Invoice Stuck on Hold", { contentDir: "ch02/05-ticket-invoice-stuck-on-hold" }),
      L(6, "ticket-invoice-matching-variance", "Ticket: Invoice Matching Variance", { contentDir: "ch02/06-ticket-invoice-matching-variance" }),
      L(7, "ticket-duplicate-invoice-entered", "Ticket: Duplicate Invoice Entered", { contentDir: "ch02/07-ticket-duplicate-invoice-entered" }),
      L(8, "ticket-payment-is-missing-from-gl", "Ticket: Payment Is Missing from GL", { contentDir: "ch02/08-ticket-payment-is-missing-from-gl" }),
      L(9, "ticket-payment-process-request-failed", "Ticket: Payment Process Request Failed", { contentDir: "ch02/09-ticket-payment-process-request-failed" }),
      L(10, "ticket-supplier-was-configured-incorrectly", "Ticket: Supplier Was Configured Incorrectly", { contentDir: "ch02/10-ticket-supplier-was-configured-incorrectly" }),
    ],
  },
  {
    n: 3,
    title: "Receivables and Cash Tickets",
    lessons: [
      L(11, "ticket-ar-does-not-reconcile-with-gl", "Ticket: AR Does Not Reconcile with GL", { contentDir: "ch03/11-ticket-ar-does-not-reconcile-with-gl" }),
      L(12, "ticket-receipt-applied-to-the-wrong-invoice", "Ticket: Receipt Applied to the Wrong Invoice", { contentDir: "ch03/12-ticket-receipt-applied-to-the-wrong-invoice" }),
      L(13, "ticket-autoinvoice-rejected-transactions", "Ticket: AutoInvoice Rejected Transactions", { contentDir: "ch03/13-ticket-autoinvoice-rejected-transactions" }),
      L(14, "ticket-customer-statement-is-wrong", "Ticket: Customer Statement Is Wrong", { contentDir: "ch03/14-ticket-customer-statement-is-wrong" }),
      L(15, "ticket-bank-statement-will-not-reconcile", "Ticket: Bank Statement Will Not Reconcile", { contentDir: "ch03/15-ticket-bank-statement-will-not-reconcile" }),
    ],
  },
  {
    n: 4,
    title: "General Ledger and Subledger Tickets",
    lessons: [
      L(16, "ticket-journal-will-not-post", "Ticket: Journal Will Not Post", { contentDir: "ch04/16-ticket-journal-will-not-post" }),
      L(17, "ticket-journal-import-failed", "Ticket: Journal Import Failed", { contentDir: "ch04/17-ticket-journal-import-failed" }),
      L(18, "ticket-accounting-failed-in-subledger-accounting", "Ticket: Accounting Failed in Subledger Accounting", { contentDir: "ch04/18-ticket-accounting-failed-in-subledger-accounting" }),
      L(19, "ticket-subledger-entries-did-not-transfer-to-gl", "Ticket: Subledger Entries Did Not Transfer to GL", { contentDir: "ch04/19-ticket-subledger-entries-did-not-transfer-to-gl" }),
      L(20, "ticket-accounting-period-will-not-close", "Ticket: Accounting Period Will Not Close", { contentDir: "ch04/20-ticket-accounting-period-will-not-close" }),
    ],
  },
  {
    n: 5,
    title: "Assets, Expenses and Setup Tickets",
    lessons: [
      L(21, "ticket-asset-depreciation-did-not-run", "Ticket: Asset Depreciation Did Not Run", { contentDir: "ch05/21-ticket-asset-depreciation-did-not-run" }),
      L(22, "ticket-mass-additions-are-not-posting", "Ticket: Mass Additions Are Not Posting", { contentDir: "ch05/22-ticket-mass-additions-are-not-posting" }),
      L(23, "ticket-expense-report-is-stuck-in-approval", "Ticket: Expense Report Is Stuck in Approval", { contentDir: "ch05/23-ticket-expense-report-is-stuck-in-approval" }),
      L(24, "ticket-user-cannot-access-a-business-unit", "Ticket: User Cannot Access a Business Unit", { contentDir: "ch05/24-ticket-user-cannot-access-a-business-unit" }),
      L(25, "ticket-user-cannot-see-journals", "Ticket: User Cannot See Journals", { contentDir: "ch05/25-ticket-user-cannot-see-journals" }),
    ],
  },
  {
    n: 6,
    title: "Data and Integration Tickets",
    lessons: [
      L(26, "ticket-fbdi-import-failed", "Ticket: FBDI Import Failed", { contentDir: "ch06/26-ticket-fbdi-import-failed" }),
      L(27, "ticket-adfdi-upload-errors", "Ticket: ADFdi Upload Errors", { contentDir: "ch06/27-ticket-adfdi-upload-errors" }),
      L(28, "ticket-rest-api-call-returns-an-error", "Ticket: REST API Call Returns an Error", { contentDir: "ch06/28-ticket-rest-api-call-returns-an-error" }),
      L(29, "ticket-report-shows-the-wrong-numbers", "Ticket: Report Shows the Wrong Numbers", { contentDir: "ch06/29-ticket-report-shows-the-wrong-numbers" }),
    ],
  },
];
