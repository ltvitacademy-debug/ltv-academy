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
    title: "Customers",
    lessons: [
      L(1, "customers-accounts-and-sites", "Customers, Accounts and Sites"),
      L(2, "customer-profiles-and-credit-limits", "Customer Profiles and Credit Limits"),
    ],
  },
  {
    n: 2,
    title: "Transactions",
    lessons: [
      L(3, "creating-receivables-transactions", "Creating Receivables Transactions"),
      L(4, "invoices-and-transaction-types", "Invoices and Transaction Types"),
      L(5, "credit-memos", "Credit Memos"),
      L(6, "adjustments", "Adjustments"),
    ],
  },
  {
    n: 3,
    title: "Receipts and Collections",
    lessons: [
      L(7, "receipts-and-cash-application", "Receipts and Cash Application"),
      L(8, "collections-and-dunning", "Collections and Dunning"),
      L(9, "accounting-for-receivables-transactions", "Accounting for Receivables Transactions"),
      L(10, "receivables-period-close-and-reconciliation", "Receivables Period Close and Reconciliation"),
    ],
  },
];
