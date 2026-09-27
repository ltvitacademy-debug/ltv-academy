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
      L(2, "the-company-its-processes-and-its-requirements", "The Company, Its Processes and Its Requirements"),
      L(3, "designing-the-enterprise-structure", "Designing the Enterprise Structure"),
      L(4, "configuring-ledger-legal-entity-and-business-units", "Configuring Ledger, Legal Entity and Business Units"),
      L(5, "configuring-the-chart-of-accounts-and-calendar", "Configuring the Chart of Accounts and Calendar"),
      L(6, "configuring-suppliers", "Configuring Suppliers"),
      L(7, "configuring-customers", "Configuring Customers"),
      L(8, "configuring-bank-accounts-and-assets", "Configuring Bank Accounts and Assets"),
    ],
  },
  {
    n: 2,
    title: "Running the Business",
    lessons: [
      L(9, "purchasing-requisition-to-purchase-order", "Purchasing: Requisition to Purchase Order"),
      L(10, "receiving-and-ap-invoicing", "Receiving and AP Invoicing"),
      L(11, "supplier-payments", "Supplier Payments"),
      L(12, "customer-invoicing", "Customer Invoicing"),
      L(13, "cash-receipts", "Cash Receipts"),
      L(14, "asset-capitalization", "Asset Capitalization"),
      L(15, "depreciation", "Depreciation"),
      L(16, "bank-reconciliation", "Bank Reconciliation"),
      L(17, "subledger-accounting-and-general-ledger-posting", "Subledger Accounting and General Ledger Posting"),
    ],
  },
  {
    n: 3,
    title: "The January 31 Challenge",
    lessons: [
      L(18, "the-cfos-call-the-books-do-not-balance", "The CFO's Call: The Books Do Not Balance"),
      L(19, "investigating-ap-ar-and-assets", "Investigating AP, AR and Assets"),
      L(20, "investigating-cash-management-subledger-accounting-and-general-ledger", "Investigating Cash Management, Subledger Accounting and General Ledger"),
      L(21, "correcting-reconciling-and-completing-the-month-end-close", "Correcting, Reconciling and Completing the Month-End Close"),
      L(22, "deliverables-reports-issue-log-and-implementation-documentation", "Deliverables: Reports, Issue Log and Implementation Documentation"),
      L(23, "final-presentation-what-was-wrong-and-how-it-was-corrected", "Final Presentation: What Was Wrong and How It Was Corrected"),
    ],
  },
  {
    n: 4,
    title: "Wrap-Up",
    lessons: [
      L(24, "reviewing-your-work-against-the-requirements", "Reviewing Your Work Against the Requirements"),
      L(25, "presenting-your-capstone-portfolio", "Presenting Your Capstone Portfolio"),
    ],
  },
];
