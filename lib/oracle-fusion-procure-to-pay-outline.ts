// The Procure-to-Pay course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 04. Students follow one transaction through the complete purchasing lifecycle.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-procure-to-pay/
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

export const ORACLE_FUSION_PROCURE_TO_PAY_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Procure-to-Pay Foundations",
    lessons: [
      L(1, "procure-to-pay-overview", "Procure-to-Pay Overview"),
      L(2, "procurement-roles-and-work-areas", "Procurement Roles and Work Areas"),
      L(3, "procurement-setup-review-business-units-and-agents", "Procurement Setup Review: Business Units and Agents"),
      L(4, "following-one-transaction-the-plan", "Following One Transaction: The Plan"),
    ],
  },
  {
    n: 2,
    title: "Requisitions",
    lessons: [
      L(5, "self-service-procurement-and-requisitions", "Self Service Procurement and Requisitions"),
      L(6, "creating-a-requisition", "Creating a Requisition"),
      L(7, "requisition-approvals", "Requisition Approvals"),
      L(8, "requisition-accounting-distributions", "Requisition Accounting Distributions"),
      L(9, "processing-requisitions-into-purchase-orders", "Processing Requisitions into Purchase Orders"),
    ],
  },
  {
    n: 3,
    title: "Purchase Orders",
    lessons: [
      L(10, "purchase-order-types-and-purchase-agreements", "Purchase Order Types and Purchase Agreements"),
      L(11, "creating-a-purchase-order", "Creating a Purchase Order"),
      L(12, "purchase-order-approvals-and-communication", "Purchase Order Approvals and Communication"),
      L(13, "change-orders", "Change Orders"),
      L(14, "closing-and-cancelling-purchase-orders", "Closing and Cancelling Purchase Orders"),
    ],
  },
  {
    n: 4,
    title: "Receiving",
    lessons: [
      L(15, "receiving-goods-and-services", "Receiving Goods and Services"),
      L(16, "receipt-routing-and-inspection", "Receipt Routing and Inspection"),
      L(17, "returns-and-corrections", "Returns and Corrections"),
      L(18, "receipt-accounting-and-accruals", "Receipt Accounting and Accruals"),
    ],
  },
  {
    n: 5,
    title: "Invoice to Ledger",
    lessons: [
      L(19, "matching-the-ap-invoice", "Matching the AP Invoice"),
      L(20, "payment-and-accounting", "Payment and Accounting"),
      L(21, "following-the-transaction-into-general-ledger", "Following the Transaction into General Ledger"),
      L(22, "reconciling-procure-to-pay-end-to-end", "Reconciling Procure-to-Pay End to End"),
      L(23, "procure-to-pay-troubleshooting-practice", "Procure-to-Pay Troubleshooting Practice"),
    ],
  },
  {
    n: 6,
    title: "Practice",
    lessons: [
      L(24, "full-procure-to-pay-walkthrough", "Full Procure-to-Pay Walkthrough"),
      L(25, "procure-to-pay-exception-scenarios", "Procure-to-Pay Exception Scenarios"),
    ],
  },
];
