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
      L(1, "the-order-to-cash-context-for-receivables", "The Order-to-Cash Context for Receivables", { contentDir: "ch01/01-the-order-to-cash-context-for-receivables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506556/ltv-oracle-fusion-accounts-receivable/the-order-to-cash-context-for-receivables.mp4", durationLabel: "1 min 58 s" }),
      L(2, "receivables-work-areas-and-the-transaction-lifecycle", "Receivables Work Areas and the Transaction Lifecycle", { contentDir: "ch01/02-receivables-work-areas-and-the-transaction-lifecycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507329/ltv-oracle-fusion-accounts-receivable/receivables-work-areas-and-the-transaction-lifecycle.mp4", durationLabel: "1 min 49 s" }),
      L(3, "receivables-setup-review", "Receivables Setup Review", { contentDir: "ch01/03-receivables-setup-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507976/ltv-oracle-fusion-accounts-receivable/receivables-setup-review.mp4", durationLabel: "1 min 44 s" }),
      L(4, "system-options-and-accounting-setup", "System Options and Accounting Setup", { contentDir: "ch01/04-system-options-and-accounting-setup", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508696/ltv-oracle-fusion-accounts-receivable/system-options-and-accounting-setup.mp4", durationLabel: "1 min 45 s" }),
      L(5, "payment-terms-and-due-dates", "Payment Terms and Due Dates", { contentDir: "ch01/05-payment-terms-and-due-dates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509396/ltv-oracle-fusion-accounts-receivable/payment-terms-and-due-dates.mp4", durationLabel: "1 min 38 s" }),
    ],
  },
  {
    n: 2,
    title: "Customers",
    lessons: [
      L(6, "the-trading-community-model-parties-accounts-and-sites", "The Trading Community Model: Parties, Accounts and Sites", { contentDir: "ch02/06-the-trading-community-model-parties-accounts-and-sites", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510878/ltv-oracle-fusion-accounts-receivable/the-trading-community-model-parties-accounts-and-sites.mp4", durationLabel: "1 min 39 s" }),
      L(7, "creating-a-customer", "Creating a Customer", { contentDir: "ch02/07-creating-a-customer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511507/ltv-oracle-fusion-accounts-receivable/creating-a-customer.mp4", durationLabel: "1 min 33 s" }),
      L(8, "customer-accounts-sites-and-contacts", "Customer Accounts, Sites and Contacts", { contentDir: "ch02/08-customer-accounts-sites-and-contacts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512215/ltv-oracle-fusion-accounts-receivable/customer-accounts-sites-and-contacts.mp4", durationLabel: "1 min 38 s" }),
      L(9, "customer-profiles-and-credit-limits", "Customer Profiles and Credit Limits", { contentDir: "ch02/09-customer-profiles-and-credit-limits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512908/ltv-oracle-fusion-accounts-receivable/customer-profiles-and-credit-limits.mp4", durationLabel: "1 min 40 s" }),
      L(10, "customer-bank-accounts", "Customer Bank Accounts", { contentDir: "ch02/10-customer-bank-accounts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513519/ltv-oracle-fusion-accounts-receivable/customer-bank-accounts.mp4", durationLabel: "1 min 33 s" }),
      L(11, "merging-and-maintaining-customers", "Merging and Maintaining Customers", { contentDir: "ch02/11-merging-and-maintaining-customers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514129/ltv-oracle-fusion-accounts-receivable/merging-and-maintaining-customers.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
  {
    n: 3,
    title: "Transaction Setup",
    lessons: [
      L(12, "transaction-types", "Transaction Types", { contentDir: "ch03/12-transaction-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514868/ltv-oracle-fusion-accounts-receivable/transaction-types.mp4", durationLabel: "1 min 39 s" }),
      L(13, "transaction-sources-and-batch-sources", "Transaction Sources and Batch Sources", { contentDir: "ch03/13-transaction-sources-and-batch-sources", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515553/ltv-oracle-fusion-accounts-receivable/transaction-sources-and-batch-sources.mp4", durationLabel: "1 min 42 s" }),
      L(14, "receivables-activities", "Receivables Activities", { contentDir: "ch03/14-receivables-activities", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516276/ltv-oracle-fusion-accounts-receivable/receivables-activities.mp4", durationLabel: "1 min 44 s" }),
      L(15, "memo-lines", "Memo Lines", { contentDir: "ch03/15-memo-lines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516912/ltv-oracle-fusion-accounts-receivable/memo-lines.mp4", durationLabel: "1 min 35 s" }),
      L(16, "revenue-recognition-basics-in-receivables", "Revenue Recognition Basics in Receivables", { contentDir: "ch03/16-revenue-recognition-basics-in-receivables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517637/ltv-oracle-fusion-accounts-receivable/revenue-recognition-basics-in-receivables.mp4", durationLabel: "1 min 50 s" }),
    ],
  },
  {
    n: 4,
    title: "Transactions",
    lessons: [
      L(17, "creating-receivables-invoices", "Creating Receivables Invoices", { contentDir: "ch04/17-creating-receivables-invoices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518420/ltv-oracle-fusion-accounts-receivable/creating-receivables-invoices.mp4", durationLabel: "1 min 44 s" }),
      L(18, "invoice-lines-tax-and-freight", "Invoice Lines, Tax and Freight", { contentDir: "ch04/18-invoice-lines-tax-and-freight", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519134/ltv-oracle-fusion-accounts-receivable/invoice-lines-tax-and-freight.mp4", durationLabel: "1 min 40 s" }),
      L(19, "debit-memos-and-chargebacks", "Debit Memos and Chargebacks", { contentDir: "ch04/19-debit-memos-and-chargebacks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519965/ltv-oracle-fusion-accounts-receivable/debit-memos-and-chargebacks.mp4", durationLabel: "1 min 40 s" }),
      L(20, "credit-memos", "Credit Memos", { contentDir: "ch04/20-credit-memos", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520665/ltv-oracle-fusion-accounts-receivable/credit-memos.mp4", durationLabel: "1 min 45 s" }),
      L(21, "autoinvoice-overview", "AutoInvoice Overview", { contentDir: "ch04/21-autoinvoice-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521334/ltv-oracle-fusion-accounts-receivable/autoinvoice-overview.mp4", durationLabel: "1 min 37 s" }),
      L(22, "completing-and-printing-transactions", "Completing and Printing Transactions", { contentDir: "ch04/22-completing-and-printing-transactions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522071/ltv-oracle-fusion-accounts-receivable/completing-and-printing-transactions.mp4", durationLabel: "1 min 49 s" }),
    ],
  },
  {
    n: 5,
    title: "Receipts",
    lessons: [
      L(23, "standard-receipts", "Standard Receipts", { contentDir: "ch05/23-standard-receipts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522670/ltv-oracle-fusion-accounts-receivable/standard-receipts.mp4", durationLabel: "1 min 12 s" }),
      L(24, "miscellaneous-receipts", "Miscellaneous Receipts", { contentDir: "ch05/24-miscellaneous-receipts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523202/ltv-oracle-fusion-accounts-receivable/miscellaneous-receipts.mp4", durationLabel: "1 min 18 s" }),
      L(25, "applying-receipts-to-transactions", "Applying Receipts to Transactions", { contentDir: "ch05/25-applying-receipts-to-transactions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523691/ltv-oracle-fusion-accounts-receivable/applying-receipts-to-transactions.mp4", durationLabel: "1 min 13 s" }),
      L(26, "unapplied-and-on-account-cash", "Unapplied and On-Account Cash", { contentDir: "ch05/26-unapplied-and-on-account-cash", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524131/ltv-oracle-fusion-accounts-receivable/unapplied-and-on-account-cash.mp4", durationLabel: "1 min 10 s" }),
      L(27, "automatic-receipts-and-remittances", "Automatic Receipts and Remittances", { contentDir: "ch05/27-automatic-receipts-and-remittances", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524592/ltv-oracle-fusion-accounts-receivable/automatic-receipts-and-remittances.mp4", durationLabel: "1 min 8 s" }),
      L(28, "lockbox-processing-overview", "Lockbox Processing Overview", { contentDir: "ch05/28-lockbox-processing-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525091/ltv-oracle-fusion-accounts-receivable/lockbox-processing-overview.mp4", durationLabel: "1 min 16 s" }),
      L(29, "reversing-receipts", "Reversing Receipts", { contentDir: "ch05/29-reversing-receipts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525520/ltv-oracle-fusion-accounts-receivable/reversing-receipts.mp4", durationLabel: "1 min 8 s" }),
    ],
  },
  {
    n: 6,
    title: "Adjustments, Write-Offs and Collections",
    lessons: [
      L(30, "adjustments", "Adjustments", { contentDir: "ch06/30-adjustments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526127/ltv-oracle-fusion-accounts-receivable/adjustments.mp4", durationLabel: "1 min 10 s" }),
      L(31, "write-offs-and-approval-limits", "Write-Offs and Approval Limits", { contentDir: "ch06/31-write-offs-and-approval-limits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526558/ltv-oracle-fusion-accounts-receivable/write-offs-and-approval-limits.mp4", durationLabel: "1 min 9 s" }),
      L(32, "collections-and-dunning", "Collections and Dunning", { contentDir: "ch06/32-collections-and-dunning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527002/ltv-oracle-fusion-accounts-receivable/collections-and-dunning.mp4", durationLabel: "1 min 9 s" }),
      L(33, "customer-statements", "Customer Statements", { contentDir: "ch06/33-customer-statements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527487/ltv-oracle-fusion-accounts-receivable/customer-statements.mp4", durationLabel: "1 min 12 s" }),
      L(34, "aging-reports", "Aging Reports", { contentDir: "ch06/34-aging-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528009/ltv-oracle-fusion-accounts-receivable/aging-reports.mp4", durationLabel: "1 min 18 s" }),
    ],
  },
  {
    n: 7,
    title: "Accounting, Reconciliation and Close",
    lessons: [
      L(35, "accounting-for-receivables-transactions", "Accounting for Receivables Transactions", { contentDir: "ch07/35-accounting-for-receivables-transactions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528699/ltv-oracle-fusion-accounts-receivable/accounting-for-receivables-transactions.mp4", durationLabel: "1 min 14 s" }),
      L(36, "creating-accounting-in-receivables", "Creating Accounting in Receivables", { contentDir: "ch07/36-creating-accounting-in-receivables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529136/ltv-oracle-fusion-accounts-receivable/creating-accounting-in-receivables.mp4", durationLabel: "1 min 11 s" }),
      L(37, "receivables-to-general-ledger-transfer", "Receivables to General Ledger Transfer", { contentDir: "ch07/37-receivables-to-general-ledger-transfer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529557/ltv-oracle-fusion-accounts-receivable/receivables-to-general-ledger-transfer.mp4", durationLabel: "1 min 8 s" }),
      L(38, "receivables-period-close-and-reconciliation", "Receivables Period Close and Reconciliation", { contentDir: "ch07/38-receivables-period-close-and-reconciliation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530069/ltv-oracle-fusion-accounts-receivable/receivables-period-close-and-reconciliation.mp4", durationLabel: "1 min 15 s" }),
      L(39, "receivables-troubleshooting-practice", "Receivables Troubleshooting Practice", { contentDir: "ch07/39-receivables-troubleshooting-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530513/ltv-oracle-fusion-accounts-receivable/receivables-troubleshooting-practice.mp4", durationLabel: "1 min 17 s" }),
    ],
  },
];
