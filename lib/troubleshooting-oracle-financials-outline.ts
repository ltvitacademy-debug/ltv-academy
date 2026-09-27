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
      L(1, "the-support-ticket-workflow", "The Support Ticket Workflow"),
      L(2, "diagnosing-problems-step-by-step", "Diagnosing Problems Step by Step"),
      L(3, "documenting-a-resolution", "Documenting a Resolution"),
    ],
  },
  {
    n: 2,
    title: "Payables Tickets",
    lessons: [
      L(4, "ticket-ap-invoice-will-not-validate", "Ticket: AP Invoice Will Not Validate"),
      L(5, "ticket-invoice-stuck-on-hold", "Ticket: Invoice Stuck on Hold"),
      L(6, "ticket-invoice-matching-variance", "Ticket: Invoice Matching Variance"),
      L(7, "ticket-duplicate-invoice-entered", "Ticket: Duplicate Invoice Entered"),
      L(8, "ticket-payment-is-missing-from-gl", "Ticket: Payment Is Missing from GL"),
      L(9, "ticket-payment-process-request-failed", "Ticket: Payment Process Request Failed"),
      L(10, "ticket-supplier-was-configured-incorrectly", "Ticket: Supplier Was Configured Incorrectly"),
    ],
  },
  {
    n: 3,
    title: "Receivables and Cash Tickets",
    lessons: [
      L(11, "ticket-ar-does-not-reconcile-with-gl", "Ticket: AR Does Not Reconcile with GL"),
      L(12, "ticket-receipt-applied-to-the-wrong-invoice", "Ticket: Receipt Applied to the Wrong Invoice"),
      L(13, "ticket-autoinvoice-rejected-transactions", "Ticket: AutoInvoice Rejected Transactions"),
      L(14, "ticket-customer-statement-is-wrong", "Ticket: Customer Statement Is Wrong"),
      L(15, "ticket-bank-statement-will-not-reconcile", "Ticket: Bank Statement Will Not Reconcile"),
    ],
  },
  {
    n: 4,
    title: "General Ledger and Subledger Tickets",
    lessons: [
      L(16, "ticket-journal-will-not-post", "Ticket: Journal Will Not Post"),
      L(17, "ticket-journal-import-failed", "Ticket: Journal Import Failed"),
      L(18, "ticket-accounting-failed-in-subledger-accounting", "Ticket: Accounting Failed in Subledger Accounting"),
      L(19, "ticket-subledger-entries-did-not-transfer-to-gl", "Ticket: Subledger Entries Did Not Transfer to GL"),
      L(20, "ticket-accounting-period-will-not-close", "Ticket: Accounting Period Will Not Close"),
    ],
  },
  {
    n: 5,
    title: "Assets, Expenses and Setup Tickets",
    lessons: [
      L(21, "ticket-asset-depreciation-did-not-run", "Ticket: Asset Depreciation Did Not Run"),
      L(22, "ticket-mass-additions-are-not-posting", "Ticket: Mass Additions Are Not Posting"),
      L(23, "ticket-expense-report-is-stuck-in-approval", "Ticket: Expense Report Is Stuck in Approval"),
      L(24, "ticket-user-cannot-access-a-business-unit", "Ticket: User Cannot Access a Business Unit"),
      L(25, "ticket-user-cannot-see-journals", "Ticket: User Cannot See Journals"),
    ],
  },
  {
    n: 6,
    title: "Data and Integration Tickets",
    lessons: [
      L(26, "ticket-fbdi-import-failed", "Ticket: FBDI Import Failed"),
      L(27, "ticket-adfdi-upload-errors", "Ticket: ADFdi Upload Errors"),
      L(28, "ticket-rest-api-call-returns-an-error", "Ticket: REST API Call Returns an Error"),
      L(29, "ticket-report-shows-the-wrong-numbers", "Ticket: Report Shows the Wrong Numbers"),
    ],
  },
];
