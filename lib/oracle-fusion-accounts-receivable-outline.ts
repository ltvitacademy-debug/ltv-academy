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
      L(1, "the-order-to-cash-context-for-receivables", "The Order-to-Cash Context for Receivables", { contentDir: "ch01/01-the-order-to-cash-context-for-receivables" }),
      L(2, "receivables-work-areas-and-the-transaction-lifecycle", "Receivables Work Areas and the Transaction Lifecycle", { contentDir: "ch01/02-receivables-work-areas-and-the-transaction-lifecycle" }),
      L(3, "receivables-setup-review", "Receivables Setup Review", { contentDir: "ch01/03-receivables-setup-review" }),
      L(4, "system-options-and-accounting-setup", "System Options and Accounting Setup", { contentDir: "ch01/04-system-options-and-accounting-setup" }),
      L(5, "payment-terms-and-due-dates", "Payment Terms and Due Dates", { contentDir: "ch01/05-payment-terms-and-due-dates" }),
    ],
  },
  {
    n: 2,
    title: "Customers",
    lessons: [
      L(6, "the-trading-community-model-parties-accounts-and-sites", "The Trading Community Model: Parties, Accounts and Sites", { contentDir: "ch02/06-the-trading-community-model-parties-accounts-and-sites" }),
      L(7, "creating-a-customer", "Creating a Customer", { contentDir: "ch02/07-creating-a-customer" }),
      L(8, "customer-accounts-sites-and-contacts", "Customer Accounts, Sites and Contacts", { contentDir: "ch02/08-customer-accounts-sites-and-contacts" }),
      L(9, "customer-profiles-and-credit-limits", "Customer Profiles and Credit Limits", { contentDir: "ch02/09-customer-profiles-and-credit-limits" }),
      L(10, "customer-bank-accounts", "Customer Bank Accounts", { contentDir: "ch02/10-customer-bank-accounts" }),
      L(11, "merging-and-maintaining-customers", "Merging and Maintaining Customers", { contentDir: "ch02/11-merging-and-maintaining-customers" }),
    ],
  },
  {
    n: 3,
    title: "Transaction Setup",
    lessons: [
      L(12, "transaction-types", "Transaction Types", { contentDir: "ch03/12-transaction-types" }),
      L(13, "transaction-sources-and-batch-sources", "Transaction Sources and Batch Sources", { contentDir: "ch03/13-transaction-sources-and-batch-sources" }),
      L(14, "receivables-activities", "Receivables Activities", { contentDir: "ch03/14-receivables-activities" }),
      L(15, "memo-lines", "Memo Lines", { contentDir: "ch03/15-memo-lines" }),
      L(16, "revenue-recognition-basics-in-receivables", "Revenue Recognition Basics in Receivables", { contentDir: "ch03/16-revenue-recognition-basics-in-receivables" }),
    ],
  },
  {
    n: 4,
    title: "Transactions",
    lessons: [
      L(17, "creating-receivables-invoices", "Creating Receivables Invoices", { contentDir: "ch04/17-creating-receivables-invoices" }),
      L(18, "invoice-lines-tax-and-freight", "Invoice Lines, Tax and Freight", { contentDir: "ch04/18-invoice-lines-tax-and-freight" }),
      L(19, "debit-memos-and-chargebacks", "Debit Memos and Chargebacks", { contentDir: "ch04/19-debit-memos-and-chargebacks" }),
      L(20, "credit-memos", "Credit Memos", { contentDir: "ch04/20-credit-memos" }),
      L(21, "autoinvoice-overview", "AutoInvoice Overview", { contentDir: "ch04/21-autoinvoice-overview" }),
      L(22, "completing-and-printing-transactions", "Completing and Printing Transactions", { contentDir: "ch04/22-completing-and-printing-transactions" }),
    ],
  },
  {
    n: 5,
    title: "Receipts",
    lessons: [
      L(23, "standard-receipts", "Standard Receipts", { contentDir: "ch05/23-standard-receipts" }),
      L(24, "miscellaneous-receipts", "Miscellaneous Receipts", { contentDir: "ch05/24-miscellaneous-receipts" }),
      L(25, "applying-receipts-to-transactions", "Applying Receipts to Transactions", { contentDir: "ch05/25-applying-receipts-to-transactions" }),
      L(26, "unapplied-and-on-account-cash", "Unapplied and On-Account Cash", { contentDir: "ch05/26-unapplied-and-on-account-cash" }),
      L(27, "automatic-receipts-and-remittances", "Automatic Receipts and Remittances", { contentDir: "ch05/27-automatic-receipts-and-remittances" }),
      L(28, "lockbox-processing-overview", "Lockbox Processing Overview", { contentDir: "ch05/28-lockbox-processing-overview" }),
      L(29, "reversing-receipts", "Reversing Receipts", { contentDir: "ch05/29-reversing-receipts" }),
    ],
  },
  {
    n: 6,
    title: "Adjustments, Write-Offs and Collections",
    lessons: [
      L(30, "adjustments", "Adjustments", { contentDir: "ch06/30-adjustments" }),
      L(31, "write-offs-and-approval-limits", "Write-Offs and Approval Limits", { contentDir: "ch06/31-write-offs-and-approval-limits" }),
      L(32, "collections-and-dunning", "Collections and Dunning", { contentDir: "ch06/32-collections-and-dunning" }),
      L(33, "customer-statements", "Customer Statements", { contentDir: "ch06/33-customer-statements" }),
      L(34, "aging-reports", "Aging Reports", { contentDir: "ch06/34-aging-reports" }),
    ],
  },
  {
    n: 7,
    title: "Accounting, Reconciliation and Close",
    lessons: [
      L(35, "accounting-for-receivables-transactions", "Accounting for Receivables Transactions", { contentDir: "ch07/35-accounting-for-receivables-transactions" }),
      L(36, "creating-accounting-in-receivables", "Creating Accounting in Receivables", { contentDir: "ch07/36-creating-accounting-in-receivables" }),
      L(37, "receivables-to-general-ledger-transfer", "Receivables to General Ledger Transfer", { contentDir: "ch07/37-receivables-to-general-ledger-transfer" }),
      L(38, "receivables-period-close-and-reconciliation", "Receivables Period Close and Reconciliation", { contentDir: "ch07/38-receivables-period-close-and-reconciliation" }),
      L(39, "receivables-troubleshooting-practice", "Receivables Troubleshooting Practice", { contentDir: "ch07/39-receivables-troubleshooting-practice" }),
    ],
  },
];
