// The Accounts Payable course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 02. Oracle Fusion Cloud Payables, hands-on in the practice environment.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-accounts-payable/
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

export const ORACLE_FUSION_ACCOUNTS_PAYABLE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Payables Fundamentals",
    lessons: [
      L(1, "the-procure-to-pay-context-for-payables", "The Procure-to-Pay Context for Payables", { contentDir: "ch01/01-the-procure-to-pay-context-for-payables" }),
      L(2, "payables-work-areas-and-the-invoice-lifecycle", "Payables Work Areas and the Invoice Lifecycle", { contentDir: "ch01/02-payables-work-areas-and-the-invoice-lifecycle" }),
      L(3, "payables-setup-review", "Payables Setup Review", { contentDir: "ch01/03-payables-setup-review" }),
      L(4, "payables-options-and-system-options", "Payables Options and System Options", { contentDir: "ch01/04-payables-options-and-system-options" }),
      L(5, "payment-terms-and-due-dates", "Payment Terms and Due Dates", { contentDir: "ch01/05-payment-terms-and-due-dates" }),
    ],
  },
  {
    n: 2,
    title: "Suppliers",
    lessons: [
      L(6, "suppliers-sites-and-contacts", "Suppliers, Sites and Contacts", { contentDir: "ch02/06-suppliers-sites-and-contacts" }),
      L(7, "creating-a-supplier", "Creating a Supplier", { contentDir: "ch02/07-creating-a-supplier" }),
      L(8, "supplier-addresses-and-business-classifications", "Supplier Addresses and Business Classifications", { contentDir: "ch02/08-supplier-addresses-and-business-classifications" }),
      L(9, "supplier-bank-accounts", "Supplier Bank Accounts", { contentDir: "ch02/09-supplier-bank-accounts" }),
      L(10, "supplier-registration-and-qualification-overview", "Supplier Registration and Qualification Overview", { contentDir: "ch02/10-supplier-registration-and-qualification-overview" }),
      L(11, "supplier-maintenance-and-merging", "Supplier Maintenance and Merging", { contentDir: "ch02/11-supplier-maintenance-and-merging" }),
    ],
  },
  {
    n: 3,
    title: "Invoices",
    lessons: [
      L(12, "invoice-types", "Invoice Types", { contentDir: "ch03/12-invoice-types" }),
      L(13, "creating-standard-invoices", "Creating Standard Invoices", { contentDir: "ch03/13-creating-standard-invoices" }),
      L(14, "invoice-lines-and-distributions", "Invoice Lines and Distributions", { contentDir: "ch03/14-invoice-lines-and-distributions" }),
      L(15, "distribution-sets", "Distribution Sets", { contentDir: "ch03/15-distribution-sets" }),
      L(16, "invoice-import-overview", "Invoice Import Overview", { contentDir: "ch03/16-invoice-import-overview" }),
      L(17, "invoice-tax-basics", "Invoice Tax Basics", { contentDir: "ch03/17-invoice-tax-basics" }),
    ],
  },
  {
    n: 4,
    title: "Validation, Holds and Approvals",
    lessons: [
      L(18, "invoice-validation", "Invoice Validation", { contentDir: "ch04/18-invoice-validation" }),
      L(19, "holds-and-hold-releases", "Holds and Hold Releases", { contentDir: "ch04/19-holds-and-hold-releases" }),
      L(20, "invoice-approvals", "Invoice Approvals", { contentDir: "ch04/20-invoice-approvals" }),
      L(21, "invoice-adjustments-and-corrections", "Invoice Adjustments and Corrections", { contentDir: "ch04/21-invoice-adjustments-and-corrections" }),
      L(22, "cancelling-and-reversing-invoices", "Cancelling and Reversing Invoices", { contentDir: "ch04/22-cancelling-and-reversing-invoices" }),
    ],
  },
  {
    n: 5,
    title: "Matching and Special Invoices",
    lessons: [
      L(23, "two-way-matching", "Two-Way Matching", { contentDir: "ch05/23-two-way-matching" }),
      L(24, "three-way-matching", "Three-Way Matching", { contentDir: "ch05/24-three-way-matching" }),
      L(25, "four-way-matching-and-matching-tolerances", "Four-Way Matching and Matching Tolerances", { contentDir: "ch05/25-four-way-matching-and-matching-tolerances" }),
      L(26, "prepayments-and-applying-prepayments", "Prepayments and Applying Prepayments", { contentDir: "ch05/26-prepayments-and-applying-prepayments" }),
      L(27, "credit-memos-and-debit-memos", "Credit Memos and Debit Memos", { contentDir: "ch05/27-credit-memos-and-debit-memos" }),
      L(28, "withholding-and-retainage-concepts", "Withholding and Retainage Concepts", { contentDir: "ch05/28-withholding-and-retainage-concepts" }),
    ],
  },
  {
    n: 6,
    title: "Payments",
    lessons: [
      L(29, "payment-methods-and-payment-process-profiles", "Payment Methods and Payment Process Profiles", { contentDir: "ch06/29-payment-methods-and-payment-process-profiles" }),
      L(30, "disbursement-bank-accounts", "Disbursement Bank Accounts", { contentDir: "ch06/30-disbursement-bank-accounts" }),
      L(31, "quick-payments", "Quick Payments", { contentDir: "ch06/31-quick-payments" }),
      L(32, "payment-process-requests", "Payment Process Requests", { contentDir: "ch06/32-payment-process-requests" }),
      L(33, "payment-files-and-electronic-payments", "Payment Files and Electronic Payments", { contentDir: "ch06/33-payment-files-and-electronic-payments" }),
      L(34, "voiding-stopping-and-reissuing-payments", "Voiding, Stopping and Reissuing Payments", { contentDir: "ch06/34-voiding-stopping-and-reissuing-payments" }),
      L(35, "supplier-refunds", "Supplier Refunds", { contentDir: "ch06/35-supplier-refunds" }),
    ],
  },
  {
    n: 7,
    title: "Accounting, Reconciliation and Close",
    lessons: [
      L(36, "accounting-for-payables-transactions", "Accounting for Payables Transactions", { contentDir: "ch07/36-accounting-for-payables-transactions" }),
      L(37, "creating-accounting-in-payables", "Creating Accounting in Payables", { contentDir: "ch07/37-creating-accounting-in-payables" }),
      L(38, "payables-to-general-ledger-transfer", "Payables to General Ledger Transfer", { contentDir: "ch07/38-payables-to-general-ledger-transfer" }),
      L(39, "accrual-reconciliation", "Accrual Reconciliation", { contentDir: "ch07/39-accrual-reconciliation" }),
      L(40, "payables-aging-and-reports", "Payables Aging and Reports", { contentDir: "ch07/40-payables-aging-and-reports" }),
      L(41, "payables-period-close-and-reconciliation", "Payables Period Close and Reconciliation", { contentDir: "ch07/41-payables-period-close-and-reconciliation" }),
      L(42, "payables-troubleshooting-practice", "Payables Troubleshooting Practice", { contentDir: "ch07/42-payables-troubleshooting-practice" }),
    ],
  },
];
