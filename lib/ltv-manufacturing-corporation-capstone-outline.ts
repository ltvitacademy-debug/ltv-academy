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
      L(1, "capstone-kickoff-ltv-manufacturing-corporation", "Capstone Kickoff: LTV Manufacturing Corporation", { contentDir: "ch01/01-capstone-kickoff-ltv-manufacturing-corporation" }),
      L(2, "the-company-its-processes-and-its-requirements", "The Company, Its Processes and Its Requirements", { contentDir: "ch01/02-the-company-its-processes-and-its-requirements" }),
      L(3, "designing-the-enterprise-structure", "Designing the Enterprise Structure", { contentDir: "ch01/03-designing-the-enterprise-structure" }),
      L(4, "configuring-ledger-legal-entity-and-business-units", "Configuring Ledger, Legal Entity and Business Units", { contentDir: "ch01/04-configuring-ledger-legal-entity-and-business-units" }),
      L(5, "configuring-the-chart-of-accounts-and-calendar", "Configuring the Chart of Accounts and Calendar", { contentDir: "ch01/05-configuring-the-chart-of-accounts-and-calendar" }),
      L(6, "configuring-suppliers", "Configuring Suppliers", { contentDir: "ch01/06-configuring-suppliers" }),
      L(7, "configuring-customers", "Configuring Customers", { contentDir: "ch01/07-configuring-customers" }),
      L(8, "configuring-bank-accounts-and-assets", "Configuring Bank Accounts and Assets", { contentDir: "ch01/08-configuring-bank-accounts-and-assets" }),
    ],
  },
  {
    n: 2,
    title: "Running the Business",
    lessons: [
      L(9, "purchasing-requisition-to-purchase-order", "Purchasing: Requisition to Purchase Order", { contentDir: "ch02/09-purchasing-requisition-to-purchase-order" }),
      L(10, "receiving-and-ap-invoicing", "Receiving and AP Invoicing", { contentDir: "ch02/10-receiving-and-ap-invoicing" }),
      L(11, "supplier-payments", "Supplier Payments", { contentDir: "ch02/11-supplier-payments" }),
      L(12, "customer-invoicing", "Customer Invoicing", { contentDir: "ch02/12-customer-invoicing" }),
      L(13, "cash-receipts", "Cash Receipts", { contentDir: "ch02/13-cash-receipts" }),
      L(14, "asset-capitalization", "Asset Capitalization", { contentDir: "ch02/14-asset-capitalization" }),
      L(15, "depreciation", "Depreciation", { contentDir: "ch02/15-depreciation" }),
      L(16, "bank-reconciliation", "Bank Reconciliation", { contentDir: "ch02/16-bank-reconciliation" }),
      L(17, "subledger-accounting-and-general-ledger-posting", "Subledger Accounting and General Ledger Posting", { contentDir: "ch02/17-subledger-accounting-and-general-ledger-posting" }),
    ],
  },
  {
    n: 3,
    title: "The January 31 Challenge",
    lessons: [
      L(18, "the-cfos-call-the-books-do-not-balance", "The CFO's Call: The Books Do Not Balance", { contentDir: "ch03/18-the-cfos-call-the-books-do-not-balance" }),
      L(19, "investigating-ap-ar-and-assets", "Investigating AP, AR and Assets", { contentDir: "ch03/19-investigating-ap-ar-and-assets" }),
      L(20, "investigating-cash-management-subledger-accounting-and-general-ledger", "Investigating Cash Management, Subledger Accounting and General Ledger", { contentDir: "ch03/20-investigating-cash-management-subledger-accounting-and-general-ledger" }),
      L(21, "correcting-reconciling-and-completing-the-month-end-close", "Correcting, Reconciling and Completing the Month-End Close", { contentDir: "ch03/21-correcting-reconciling-and-completing-the-month-end-close" }),
      L(22, "deliverables-reports-issue-log-and-implementation-documentation", "Deliverables: Reports, Issue Log and Implementation Documentation", { contentDir: "ch03/22-deliverables-reports-issue-log-and-implementation-documentation" }),
      L(23, "final-presentation-what-was-wrong-and-how-it-was-corrected", "Final Presentation: What Was Wrong and How It Was Corrected", { contentDir: "ch03/23-final-presentation-what-was-wrong-and-how-it-was-corrected" }),
    ],
  },
  {
    n: 4,
    title: "Wrap-Up",
    lessons: [
      L(24, "reviewing-your-work-against-the-requirements", "Reviewing Your Work Against the Requirements", { contentDir: "ch04/24-reviewing-your-work-against-the-requirements" }),
      L(25, "presenting-your-capstone-portfolio", "Presenting Your Capstone Portfolio", { contentDir: "ch04/25-presenting-your-capstone-portfolio" }),
    ],
  },
];
