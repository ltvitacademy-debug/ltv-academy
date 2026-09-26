// The LTV Manufacturing Corporation course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 09 — the capstone. Students configure enterprise structure, chart of accounts, ledger, legal entity, business units, suppliers, customers, bank accounts and assets; then run purchasing, AP invoicing, supplier payments, customer invoicing, cash receipts, asset capitalization, depreciation, bank reconciliation, subledger accounting and GL posting. Final challenge: it is January 31, the CFO says the books do not balance and the period cannot be closed.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ltv-manufacturing-corporation-capstone/
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

export const LTV_MANUFACTURING_CORPORATION_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Design and Configuration",
    lessons: [
      L(1, "capstone-kickoff-ltv-manufacturing-corporation", "Capstone Kickoff: LTV Manufacturing Corporation"),
      L(2, "configuring-the-enterprise-structure-chart-of-accounts-ledger-legal-en", "Configuring the Enterprise: Structure, Chart of Accounts, Ledger, Legal Entity and Business Units"),
      L(3, "configuring-suppliers-customers-bank-accounts-and-assets", "Configuring Suppliers, Customers, Bank Accounts and Assets"),
    ],
  },
  {
    n: 2,
    title: "Running the Business",
    lessons: [
      L(4, "purchasing-ap-invoicing-and-supplier-payments", "Purchasing, AP Invoicing and Supplier Payments"),
      L(5, "customer-invoicing-cash-receipts-and-asset-capitalization", "Customer Invoicing, Cash Receipts and Asset Capitalization"),
      L(6, "depreciation-bank-reconciliation-subledger-accounting-and-gl-posting", "Depreciation, Bank Reconciliation, Subledger Accounting and GL Posting"),
    ],
  },
  {
    n: 3,
    title: "The January 31 Challenge",
    lessons: [
      L(7, "the-cfos-call-the-books-do-not-balance", "The CFO's Call: The Books Do Not Balance"),
      L(8, "investigating-ap-ar-and-assets", "Investigating AP, AR and Assets"),
      L(9, "investigating-cash-management-subledger-accounting-and-general-ledger", "Investigating Cash Management, Subledger Accounting and General Ledger"),
      L(10, "correcting-reconciling-and-completing-the-month-end-close", "Correcting, Reconciling and Completing the Month-End Close"),
      L(11, "deliverables-reports-issue-log-and-implementation-documentation", "Deliverables: Reports, Issue Log and Implementation Documentation"),
      L(12, "final-presentation-what-was-wrong-and-how-it-was-corrected", "Final Presentation: What Was Wrong and How It Was Corrected"),
    ],
  },
];
