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
      L(1, "the-procure-to-pay-context-for-payables", "The Procure-to-Pay Context for Payables"),
      L(2, "payables-work-areas-and-the-invoice-lifecycle", "Payables Work Areas and the Invoice Lifecycle"),
      L(3, "payables-setup-review", "Payables Setup Review"),
      L(4, "payables-options-and-system-options", "Payables Options and System Options"),
      L(5, "payment-terms-and-due-dates", "Payment Terms and Due Dates"),
    ],
  },
  {
    n: 2,
    title: "Suppliers",
    lessons: [
      L(6, "suppliers-sites-and-contacts", "Suppliers, Sites and Contacts"),
      L(7, "creating-a-supplier", "Creating a Supplier"),
      L(8, "supplier-addresses-and-business-classifications", "Supplier Addresses and Business Classifications"),
      L(9, "supplier-bank-accounts", "Supplier Bank Accounts"),
      L(10, "supplier-registration-and-qualification-overview", "Supplier Registration and Qualification Overview"),
      L(11, "supplier-maintenance-and-merging", "Supplier Maintenance and Merging"),
    ],
  },
  {
    n: 3,
    title: "Invoices",
    lessons: [
      L(12, "invoice-types", "Invoice Types"),
      L(13, "creating-standard-invoices", "Creating Standard Invoices"),
      L(14, "invoice-lines-and-distributions", "Invoice Lines and Distributions"),
      L(15, "distribution-sets", "Distribution Sets"),
      L(16, "invoice-import-overview", "Invoice Import Overview"),
      L(17, "invoice-tax-basics", "Invoice Tax Basics"),
    ],
  },
  {
    n: 4,
    title: "Validation, Holds and Approvals",
    lessons: [
      L(18, "invoice-validation", "Invoice Validation"),
      L(19, "holds-and-hold-releases", "Holds and Hold Releases"),
      L(20, "invoice-approvals", "Invoice Approvals"),
      L(21, "invoice-adjustments-and-corrections", "Invoice Adjustments and Corrections"),
      L(22, "cancelling-and-reversing-invoices", "Cancelling and Reversing Invoices"),
    ],
  },
  {
    n: 5,
    title: "Matching and Special Invoices",
    lessons: [
      L(23, "two-way-matching", "Two-Way Matching"),
      L(24, "three-way-matching", "Three-Way Matching"),
      L(25, "four-way-matching-and-matching-tolerances", "Four-Way Matching and Matching Tolerances"),
      L(26, "prepayments-and-applying-prepayments", "Prepayments and Applying Prepayments"),
      L(27, "credit-memos-and-debit-memos", "Credit Memos and Debit Memos"),
      L(28, "withholding-and-retainage-concepts", "Withholding and Retainage Concepts"),
    ],
  },
  {
    n: 6,
    title: "Payments",
    lessons: [
      L(29, "payment-methods-and-payment-process-profiles", "Payment Methods and Payment Process Profiles"),
      L(30, "disbursement-bank-accounts", "Disbursement Bank Accounts"),
      L(31, "quick-payments", "Quick Payments"),
      L(32, "payment-process-requests", "Payment Process Requests"),
      L(33, "payment-files-and-electronic-payments", "Payment Files and Electronic Payments"),
      L(34, "voiding-stopping-and-reissuing-payments", "Voiding, Stopping and Reissuing Payments"),
      L(35, "supplier-refunds", "Supplier Refunds"),
    ],
  },
  {
    n: 7,
    title: "Accounting, Reconciliation and Close",
    lessons: [
      L(36, "accounting-for-payables-transactions", "Accounting for Payables Transactions"),
      L(37, "creating-accounting-in-payables", "Creating Accounting in Payables"),
      L(38, "payables-to-general-ledger-transfer", "Payables to General Ledger Transfer"),
      L(39, "accrual-reconciliation", "Accrual Reconciliation"),
      L(40, "payables-aging-and-reports", "Payables Aging and Reports"),
      L(41, "payables-period-close-and-reconciliation", "Payables Period Close and Reconciliation"),
      L(42, "payables-troubleshooting-practice", "Payables Troubleshooting Practice"),
    ],
  },
];
