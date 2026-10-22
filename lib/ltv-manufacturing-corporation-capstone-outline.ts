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
      L(1, "capstone-kickoff-ltv-manufacturing-corporation", "Capstone Kickoff: LTV Manufacturing Corporation", { contentDir: "ch01/01-capstone-kickoff-ltv-manufacturing-corporation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603027/ltv-ltv-manufacturing-corporation-capstone/capstone-kickoff-ltv-manufacturing-corporation.mp4", durationLabel: "1 min 45 s" }),
      L(2, "the-company-its-processes-and-its-requirements", "The Company, Its Processes and Its Requirements", { contentDir: "ch01/02-the-company-its-processes-and-its-requirements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603584/ltv-ltv-manufacturing-corporation-capstone/the-company-its-processes-and-its-requirements.mp4", durationLabel: "1 min 48 s" }),
      L(3, "designing-the-enterprise-structure", "Designing the Enterprise Structure", { contentDir: "ch01/03-designing-the-enterprise-structure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604099/ltv-ltv-manufacturing-corporation-capstone/designing-the-enterprise-structure.mp4", durationLabel: "1 min 37 s" }),
      L(4, "configuring-ledger-legal-entity-and-business-units", "Configuring Ledger, Legal Entity and Business Units", { contentDir: "ch01/04-configuring-ledger-legal-entity-and-business-units", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604573/ltv-ltv-manufacturing-corporation-capstone/configuring-ledger-legal-entity-and-business-units.mp4", durationLabel: "1 min 25 s" }),
      L(5, "configuring-the-chart-of-accounts-and-calendar", "Configuring the Chart of Accounts and Calendar", { contentDir: "ch01/05-configuring-the-chart-of-accounts-and-calendar", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605106/ltv-ltv-manufacturing-corporation-capstone/configuring-the-chart-of-accounts-and-calendar.mp4", durationLabel: "1 min 33 s" }),
      L(6, "configuring-suppliers", "Configuring Suppliers", { contentDir: "ch01/06-configuring-suppliers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605619/ltv-ltv-manufacturing-corporation-capstone/configuring-suppliers.mp4", durationLabel: "1 min 27 s" }),
      L(7, "configuring-customers", "Configuring Customers", { contentDir: "ch01/07-configuring-customers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606080/ltv-ltv-manufacturing-corporation-capstone/configuring-customers.mp4", durationLabel: "1 min 24 s" }),
      L(8, "configuring-bank-accounts-and-assets", "Configuring Bank Accounts and Assets", { contentDir: "ch01/08-configuring-bank-accounts-and-assets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606602/ltv-ltv-manufacturing-corporation-capstone/configuring-bank-accounts-and-assets.mp4", durationLabel: "1 min 33 s" }),
    ],
  },
  {
    n: 2,
    title: "Running the Business",
    lessons: [
      L(9, "purchasing-requisition-to-purchase-order", "Purchasing: Requisition to Purchase Order", { contentDir: "ch02/09-purchasing-requisition-to-purchase-order", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607109/ltv-ltv-manufacturing-corporation-capstone/purchasing-requisition-to-purchase-order.mp4", durationLabel: "1 min 32 s" }),
      L(10, "receiving-and-ap-invoicing", "Receiving and AP Invoicing", { contentDir: "ch02/10-receiving-and-ap-invoicing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607585/ltv-ltv-manufacturing-corporation-capstone/receiving-and-ap-invoicing.mp4", durationLabel: "1 min 30 s" }),
      L(11, "supplier-payments", "Supplier Payments", { contentDir: "ch02/11-supplier-payments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608065/ltv-ltv-manufacturing-corporation-capstone/supplier-payments.mp4", durationLabel: "1 min 36 s" }),
      L(12, "customer-invoicing", "Customer Invoicing", { contentDir: "ch02/12-customer-invoicing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608552/ltv-ltv-manufacturing-corporation-capstone/customer-invoicing.mp4", durationLabel: "1 min 33 s" }),
      L(13, "cash-receipts", "Cash Receipts", { contentDir: "ch02/13-cash-receipts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609044/ltv-ltv-manufacturing-corporation-capstone/cash-receipts.mp4", durationLabel: "1 min 29 s" }),
      L(14, "asset-capitalization", "Asset Capitalization", { contentDir: "ch02/14-asset-capitalization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609547/ltv-ltv-manufacturing-corporation-capstone/asset-capitalization.mp4", durationLabel: "1 min 28 s" }),
      L(15, "depreciation", "Depreciation", { contentDir: "ch02/15-depreciation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610102/ltv-ltv-manufacturing-corporation-capstone/depreciation.mp4", durationLabel: "1 min 36 s" }),
      L(16, "bank-reconciliation", "Bank Reconciliation", { contentDir: "ch02/16-bank-reconciliation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610520/ltv-ltv-manufacturing-corporation-capstone/bank-reconciliation.mp4", durationLabel: "1 min 34 s" }),
      L(17, "subledger-accounting-and-general-ledger-posting", "Subledger Accounting and General Ledger Posting", { contentDir: "ch02/17-subledger-accounting-and-general-ledger-posting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611123/ltv-ltv-manufacturing-corporation-capstone/subledger-accounting-and-general-ledger-posting.mp4", durationLabel: "1 min 37 s" }),
    ],
  },
  {
    n: 3,
    title: "The January 31 Challenge",
    lessons: [
      L(18, "the-cfos-call-the-books-do-not-balance", "The CFO's Call: The Books Do Not Balance", { contentDir: "ch03/18-the-cfos-call-the-books-do-not-balance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611868/ltv-ltv-manufacturing-corporation-capstone/the-cfos-call-the-books-do-not-balance.mp4", durationLabel: "1 min 38 s" }),
      L(19, "investigating-ap-ar-and-assets", "Investigating AP, AR and Assets", { contentDir: "ch03/19-investigating-ap-ar-and-assets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623115/ltv-ltv-manufacturing-corporation-capstone/investigating-ap-ar-and-assets.mp4", durationLabel: "1 min 31 s" }),
      L(20, "investigating-cash-management-subledger-accounting-and-general-ledger", "Investigating Cash Management, Subledger Accounting and General Ledger", { contentDir: "ch03/20-investigating-cash-management-subledger-accounting-and-general-ledger", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623234/ltv-ltv-manufacturing-corporation-capstone/investigating-cash-management-subledger-accounting-and-general-ledger.mp4", durationLabel: "1 min 25 s" }),
      L(21, "correcting-reconciling-and-completing-the-month-end-close", "Correcting, Reconciling and Completing the Month-End Close", { contentDir: "ch03/21-correcting-reconciling-and-completing-the-month-end-close", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623377/ltv-ltv-manufacturing-corporation-capstone/correcting-reconciling-and-completing-the-month-end-close.mp4", durationLabel: "1 min 38 s" }),
      L(22, "deliverables-reports-issue-log-and-implementation-documentation", "Deliverables: Reports, Issue Log and Implementation Documentation", { contentDir: "ch03/22-deliverables-reports-issue-log-and-implementation-documentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623488/ltv-ltv-manufacturing-corporation-capstone/deliverables-reports-issue-log-and-implementation-documentation.mp4", durationLabel: "1 min 19 s" }),
      L(23, "final-presentation-what-was-wrong-and-how-it-was-corrected", "Final Presentation: What Was Wrong and How It Was Corrected", { contentDir: "ch03/23-final-presentation-what-was-wrong-and-how-it-was-corrected", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623628/ltv-ltv-manufacturing-corporation-capstone/final-presentation-what-was-wrong-and-how-it-was-corrected.mp4", durationLabel: "1 min 46 s" }),
    ],
  },
  {
    n: 4,
    title: "Wrap-Up",
    lessons: [
      L(24, "reviewing-your-work-against-the-requirements", "Reviewing Your Work Against the Requirements", { contentDir: "ch04/24-reviewing-your-work-against-the-requirements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623749/ltv-ltv-manufacturing-corporation-capstone/reviewing-your-work-against-the-requirements.mp4", durationLabel: "1 min 27 s" }),
      L(25, "presenting-your-capstone-portfolio", "Presenting Your Capstone Portfolio", { contentDir: "ch04/25-presenting-your-capstone-portfolio", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623875/ltv-ltv-manufacturing-corporation-capstone/presenting-your-capstone-portfolio.mp4", durationLabel: "1 min 27 s" }),
    ],
  },
];
