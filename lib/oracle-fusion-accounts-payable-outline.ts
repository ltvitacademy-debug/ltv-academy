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
    title: "Suppliers",
    lessons: [
      L(1, "suppliers-and-supplier-sites", "Suppliers and Supplier Sites"),
      L(2, "supplier-setup-and-payment-terms", "Supplier Setup and Payment Terms"),
    ],
  },
  {
    n: 2,
    title: "Invoices",
    lessons: [
      L(3, "creating-invoices", "Creating Invoices"),
      L(4, "invoice-validation-and-holds", "Invoice Validation and Holds"),
      L(5, "invoice-approvals", "Invoice Approvals"),
      L(6, "matching-invoices-to-purchase-orders", "Matching Invoices to Purchase Orders"),
    ],
  },
  {
    n: 3,
    title: "Payments and Accounting",
    lessons: [
      L(7, "payment-methods-and-payment-processing", "Payment Methods and Payment Processing"),
      L(8, "creating-and-managing-payments", "Creating and Managing Payments"),
      L(9, "accounting-for-payables-transactions", "Accounting for Payables Transactions"),
      L(10, "payables-period-close-and-reconciliation", "Payables Period Close and Reconciliation"),
    ],
  },
];
