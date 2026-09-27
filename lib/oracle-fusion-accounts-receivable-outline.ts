// The Accounts Receivable course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 02. Oracle Fusion Cloud Receivables, hands-on in the practice environment.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-accounts-receivable/
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

export const ORACLE_FUSION_ACCOUNTS_RECEIVABLE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Receivables Fundamentals",
    lessons: [
      L(1, "the-order-to-cash-context-for-receivables", "The Order-to-Cash Context for Receivables"),
      L(2, "receivables-work-areas-and-the-transaction-lifecycle", "Receivables Work Areas and the Transaction Lifecycle"),
      L(3, "receivables-setup-review", "Receivables Setup Review"),
      L(4, "system-options-and-accounting-setup", "System Options and Accounting Setup"),
      L(5, "payment-terms-and-due-dates", "Payment Terms and Due Dates"),
    ],
  },
  {
    n: 2,
    title: "Customers",
    lessons: [
      L(6, "the-trading-community-model-parties-accounts-and-sites", "The Trading Community Model: Parties, Accounts and Sites"),
      L(7, "creating-a-customer", "Creating a Customer"),
      L(8, "customer-accounts-sites-and-contacts", "Customer Accounts, Sites and Contacts"),
      L(9, "customer-profiles-and-credit-limits", "Customer Profiles and Credit Limits"),
      L(10, "customer-bank-accounts", "Customer Bank Accounts"),
      L(11, "merging-and-maintaining-customers", "Merging and Maintaining Customers"),
    ],
  },
  {
    n: 3,
    title: "Transaction Setup",
    lessons: [
      L(12, "transaction-types", "Transaction Types"),
      L(13, "transaction-sources-and-batch-sources", "Transaction Sources and Batch Sources"),
      L(14, "receivables-activities", "Receivables Activities"),
      L(15, "memo-lines", "Memo Lines"),
      L(16, "revenue-recognition-basics-in-receivables", "Revenue Recognition Basics in Receivables"),
    ],
  },
  {
    n: 4,
    title: "Transactions",
    lessons: [
      L(17, "creating-receivables-invoices", "Creating Receivables Invoices"),
      L(18, "invoice-lines-tax-and-freight", "Invoice Lines, Tax and Freight"),
      L(19, "debit-memos-and-chargebacks", "Debit Memos and Chargebacks"),
      L(20, "credit-memos", "Credit Memos"),
      L(21, "autoinvoice-overview", "AutoInvoice Overview"),
      L(22, "completing-and-printing-transactions", "Completing and Printing Transactions"),
    ],
  },
  {
    n: 5,
    title: "Receipts",
    lessons: [
      L(23, "standard-receipts", "Standard Receipts"),
      L(24, "miscellaneous-receipts", "Miscellaneous Receipts"),
      L(25, "applying-receipts-to-transactions", "Applying Receipts to Transactions"),
      L(26, "unapplied-and-on-account-cash", "Unapplied and On-Account Cash"),
      L(27, "automatic-receipts-and-remittances", "Automatic Receipts and Remittances"),
      L(28, "lockbox-processing-overview", "Lockbox Processing Overview"),
      L(29, "reversing-receipts", "Reversing Receipts"),
    ],
  },
  {
    n: 6,
    title: "Adjustments, Write-Offs and Collections",
    lessons: [
      L(30, "adjustments", "Adjustments"),
      L(31, "write-offs-and-approval-limits", "Write-Offs and Approval Limits"),
      L(32, "collections-and-dunning", "Collections and Dunning"),
      L(33, "customer-statements", "Customer Statements"),
      L(34, "aging-reports", "Aging Reports"),
    ],
  },
  {
    n: 7,
    title: "Accounting, Reconciliation and Close",
    lessons: [
      L(35, "accounting-for-receivables-transactions", "Accounting for Receivables Transactions"),
      L(36, "creating-accounting-in-receivables", "Creating Accounting in Receivables"),
      L(37, "receivables-to-general-ledger-transfer", "Receivables to General Ledger Transfer"),
      L(38, "receivables-period-close-and-reconciliation", "Receivables Period Close and Reconciliation"),
      L(39, "receivables-troubleshooting-practice", "Receivables Troubleshooting Practice"),
    ],
  },
];
