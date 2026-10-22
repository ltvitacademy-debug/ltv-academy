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
      L(1, "the-procure-to-pay-context-for-payables", "The Procure-to-Pay Context for Payables", { contentDir: "ch01/01-the-procure-to-pay-context-for-payables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629328/ltv-oracle-fusion-accounts-payable/the-procure-to-pay-context-for-payables.mp4", durationLabel: "1 min 40 s" }),
      L(2, "payables-work-areas-and-the-invoice-lifecycle", "Payables Work Areas and the Invoice Lifecycle", { contentDir: "ch01/02-payables-work-areas-and-the-invoice-lifecycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629417/ltv-oracle-fusion-accounts-payable/payables-work-areas-and-the-invoice-lifecycle.mp4", durationLabel: "1 min 38 s" }),
      L(3, "payables-setup-review", "Payables Setup Review", { contentDir: "ch01/03-payables-setup-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629497/ltv-oracle-fusion-accounts-payable/payables-setup-review.mp4", durationLabel: "1 min 33 s" }),
      L(4, "payables-options-and-system-options", "Payables Options and System Options", { contentDir: "ch01/04-payables-options-and-system-options", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629597/ltv-oracle-fusion-accounts-payable/payables-options-and-system-options.mp4", durationLabel: "1 min 51 s" }),
      L(5, "payment-terms-and-due-dates", "Payment Terms and Due Dates", { contentDir: "ch01/05-payment-terms-and-due-dates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629697/ltv-oracle-fusion-accounts-payable/payment-terms-and-due-dates.mp4", durationLabel: "1 min 50 s" }),
    ],
  },
  {
    n: 2,
    title: "Suppliers",
    lessons: [
      L(6, "suppliers-sites-and-contacts", "Suppliers, Sites and Contacts", { contentDir: "ch02/06-suppliers-sites-and-contacts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629801/ltv-oracle-fusion-accounts-payable/suppliers-sites-and-contacts.mp4", durationLabel: "1 min 51 s" }),
      L(7, "creating-a-supplier", "Creating a Supplier", { contentDir: "ch02/07-creating-a-supplier", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629897/ltv-oracle-fusion-accounts-payable/creating-a-supplier.mp4", durationLabel: "1 min 48 s" }),
      L(8, "supplier-addresses-and-business-classifications", "Supplier Addresses and Business Classifications", { contentDir: "ch02/08-supplier-addresses-and-business-classifications", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630000/ltv-oracle-fusion-accounts-payable/supplier-addresses-and-business-classifications.mp4", durationLabel: "1 min 56 s" }),
      L(9, "supplier-bank-accounts", "Supplier Bank Accounts", { contentDir: "ch02/09-supplier-bank-accounts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630108/ltv-oracle-fusion-accounts-payable/supplier-bank-accounts.mp4", durationLabel: "1 min 55 s" }),
      L(10, "supplier-registration-and-qualification-overview", "Supplier Registration and Qualification Overview", { contentDir: "ch02/10-supplier-registration-and-qualification-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630212/ltv-oracle-fusion-accounts-payable/supplier-registration-and-qualification-overview.mp4", durationLabel: "1 min 53 s" }),
      L(11, "supplier-maintenance-and-merging", "Supplier Maintenance and Merging", { contentDir: "ch02/11-supplier-maintenance-and-merging", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630312/ltv-oracle-fusion-accounts-payable/supplier-maintenance-and-merging.mp4", durationLabel: "1 min 54 s" }),
    ],
  },
  {
    n: 3,
    title: "Invoices",
    lessons: [
      L(12, "invoice-types", "Invoice Types", { contentDir: "ch03/12-invoice-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630398/ltv-oracle-fusion-accounts-payable/invoice-types.mp4", durationLabel: "1 min 47 s" }),
      L(13, "creating-standard-invoices", "Creating Standard Invoices", { contentDir: "ch03/13-creating-standard-invoices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630466/ltv-oracle-fusion-accounts-payable/creating-standard-invoices.mp4", durationLabel: "1 min 31 s" }),
      L(14, "invoice-lines-and-distributions", "Invoice Lines and Distributions", { contentDir: "ch03/14-invoice-lines-and-distributions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630540/ltv-oracle-fusion-accounts-payable/invoice-lines-and-distributions.mp4", durationLabel: "1 min 49 s" }),
      L(15, "distribution-sets", "Distribution Sets", { contentDir: "ch03/15-distribution-sets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630612/ltv-oracle-fusion-accounts-payable/distribution-sets.mp4", durationLabel: "1 min 42 s" }),
      L(16, "invoice-import-overview", "Invoice Import Overview", { contentDir: "ch03/16-invoice-import-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630688/ltv-oracle-fusion-accounts-payable/invoice-import-overview.mp4", durationLabel: "1 min 44 s" }),
      L(17, "invoice-tax-basics", "Invoice Tax Basics", { contentDir: "ch03/17-invoice-tax-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630782/ltv-oracle-fusion-accounts-payable/invoice-tax-basics.mp4", durationLabel: "2 min 16 s" }),
    ],
  },
  {
    n: 4,
    title: "Validation, Holds and Approvals",
    lessons: [
      L(18, "invoice-validation", "Invoice Validation", { contentDir: "ch04/18-invoice-validation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630861/ltv-oracle-fusion-accounts-payable/invoice-validation.mp4", durationLabel: "1 min 54 s" }),
      L(19, "holds-and-hold-releases", "Holds and Hold Releases", { contentDir: "ch04/19-holds-and-hold-releases", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630949/ltv-oracle-fusion-accounts-payable/holds-and-hold-releases.mp4", durationLabel: "2 min 2 s" }),
      L(20, "invoice-approvals", "Invoice Approvals", { contentDir: "ch04/20-invoice-approvals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631034/ltv-oracle-fusion-accounts-payable/invoice-approvals.mp4", durationLabel: "2 min 2 s" }),
      L(21, "invoice-adjustments-and-corrections", "Invoice Adjustments and Corrections", { contentDir: "ch04/21-invoice-adjustments-and-corrections", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631125/ltv-oracle-fusion-accounts-payable/invoice-adjustments-and-corrections.mp4", durationLabel: "2 min 5 s" }),
      L(22, "cancelling-and-reversing-invoices", "Cancelling and Reversing Invoices", { contentDir: "ch04/22-cancelling-and-reversing-invoices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631202/ltv-oracle-fusion-accounts-payable/cancelling-and-reversing-invoices.mp4", durationLabel: "1 min 52 s" }),
    ],
  },
  {
    n: 5,
    title: "Matching and Special Invoices",
    lessons: [
      L(23, "two-way-matching", "Two-Way Matching", { contentDir: "ch05/23-two-way-matching", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631284/ltv-oracle-fusion-accounts-payable/two-way-matching.mp4", durationLabel: "2 min 1 s" }),
      L(24, "three-way-matching", "Three-Way Matching", { contentDir: "ch05/24-three-way-matching", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631364/ltv-oracle-fusion-accounts-payable/three-way-matching.mp4", durationLabel: "1 min 49 s" }),
      L(25, "four-way-matching-and-matching-tolerances", "Four-Way Matching and Matching Tolerances", { contentDir: "ch05/25-four-way-matching-and-matching-tolerances", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631437/ltv-oracle-fusion-accounts-payable/four-way-matching-and-matching-tolerances.mp4", durationLabel: "1 min 49 s" }),
      L(26, "prepayments-and-applying-prepayments", "Prepayments and Applying Prepayments", { contentDir: "ch05/26-prepayments-and-applying-prepayments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631493/ltv-oracle-fusion-accounts-payable/prepayments-and-applying-prepayments.mp4", durationLabel: "1 min 35 s" }),
      L(27, "credit-memos-and-debit-memos", "Credit Memos and Debit Memos", { contentDir: "ch05/27-credit-memos-and-debit-memos", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631552/ltv-oracle-fusion-accounts-payable/credit-memos-and-debit-memos.mp4", durationLabel: "1 min 36 s" }),
      L(28, "withholding-and-retainage-concepts", "Withholding and Retainage Concepts", { contentDir: "ch05/28-withholding-and-retainage-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631630/ltv-oracle-fusion-accounts-payable/withholding-and-retainage-concepts.mp4", durationLabel: "1 min 51 s" }),
    ],
  },
  {
    n: 6,
    title: "Payments",
    lessons: [
      L(29, "payment-methods-and-payment-process-profiles", "Payment Methods and Payment Process Profiles", { contentDir: "ch06/29-payment-methods-and-payment-process-profiles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631712/ltv-oracle-fusion-accounts-payable/payment-methods-and-payment-process-profiles.mp4", durationLabel: "1 min 54 s" }),
      L(30, "disbursement-bank-accounts", "Disbursement Bank Accounts", { contentDir: "ch06/30-disbursement-bank-accounts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631787/ltv-oracle-fusion-accounts-payable/disbursement-bank-accounts.mp4", durationLabel: "1 min 39 s" }),
      L(31, "quick-payments", "Quick Payments", { contentDir: "ch06/31-quick-payments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631854/ltv-oracle-fusion-accounts-payable/quick-payments.mp4", durationLabel: "1 min 36 s" }),
      L(32, "payment-process-requests", "Payment Process Requests", { contentDir: "ch06/32-payment-process-requests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631934/ltv-oracle-fusion-accounts-payable/payment-process-requests.mp4", durationLabel: "1 min 48 s" }),
      L(33, "payment-files-and-electronic-payments", "Payment Files and Electronic Payments", { contentDir: "ch06/33-payment-files-and-electronic-payments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632013/ltv-oracle-fusion-accounts-payable/payment-files-and-electronic-payments.mp4", durationLabel: "1 min 46 s" }),
      L(34, "voiding-stopping-and-reissuing-payments", "Voiding, Stopping and Reissuing Payments", { contentDir: "ch06/34-voiding-stopping-and-reissuing-payments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632079/ltv-oracle-fusion-accounts-payable/voiding-stopping-and-reissuing-payments.mp4", durationLabel: "1 min 35 s" }),
      L(35, "supplier-refunds", "Supplier Refunds", { contentDir: "ch06/35-supplier-refunds", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632140/ltv-oracle-fusion-accounts-payable/supplier-refunds.mp4", durationLabel: "1 min 32 s" }),
    ],
  },
  {
    n: 7,
    title: "Accounting, Reconciliation and Close",
    lessons: [
      L(36, "accounting-for-payables-transactions", "Accounting for Payables Transactions", { contentDir: "ch07/36-accounting-for-payables-transactions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632211/ltv-oracle-fusion-accounts-payable/accounting-for-payables-transactions.mp4", durationLabel: "1 min 37 s" }),
      L(37, "creating-accounting-in-payables", "Creating Accounting in Payables", { contentDir: "ch07/37-creating-accounting-in-payables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632277/ltv-oracle-fusion-accounts-payable/creating-accounting-in-payables.mp4", durationLabel: "1 min 32 s" }),
      L(38, "payables-to-general-ledger-transfer", "Payables to General Ledger Transfer", { contentDir: "ch07/38-payables-to-general-ledger-transfer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632337/ltv-oracle-fusion-accounts-payable/payables-to-general-ledger-transfer.mp4", durationLabel: "1 min 28 s" }),
      L(39, "accrual-reconciliation", "Accrual Reconciliation", { contentDir: "ch07/39-accrual-reconciliation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632412/ltv-oracle-fusion-accounts-payable/accrual-reconciliation.mp4", durationLabel: "1 min 42 s" }),
      L(40, "payables-aging-and-reports", "Payables Aging and Reports", { contentDir: "ch07/40-payables-aging-and-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632481/ltv-oracle-fusion-accounts-payable/payables-aging-and-reports.mp4", durationLabel: "1 min 38 s" }),
      L(41, "payables-period-close-and-reconciliation", "Payables Period Close and Reconciliation", { contentDir: "ch07/41-payables-period-close-and-reconciliation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632543/ltv-oracle-fusion-accounts-payable/payables-period-close-and-reconciliation.mp4", durationLabel: "1 min 33 s" }),
      L(42, "payables-troubleshooting-practice", "Payables Troubleshooting Practice", { contentDir: "ch07/42-payables-troubleshooting-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632608/ltv-oracle-fusion-accounts-payable/payables-troubleshooting-practice.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
];
