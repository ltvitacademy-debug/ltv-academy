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
      L(1, "procure-to-pay-overview", "Procure-to-Pay Overview", { contentDir: "ch01/01-procure-to-pay-overview" }),
      L(2, "procurement-roles-and-work-areas", "Procurement Roles and Work Areas", { contentDir: "ch01/02-procurement-roles-and-work-areas" }),
      L(3, "procurement-setup-review-business-units-and-agents", "Procurement Setup Review: Business Units and Agents", { contentDir: "ch01/03-procurement-setup-review-business-units-and-agents" }),
      L(4, "following-one-transaction-the-plan", "Following One Transaction: The Plan", { contentDir: "ch01/04-following-one-transaction-the-plan" }),
    ],
  },
  {
    n: 2,
    title: "Requisitions",
    lessons: [
      L(5, "self-service-procurement-and-requisitions", "Self Service Procurement and Requisitions", { contentDir: "ch02/05-self-service-procurement-and-requisitions" }),
      L(6, "creating-a-requisition", "Creating a Requisition", { contentDir: "ch02/06-creating-a-requisition" }),
      L(7, "requisition-approvals", "Requisition Approvals", { contentDir: "ch02/07-requisition-approvals" }),
      L(8, "requisition-accounting-distributions", "Requisition Accounting Distributions", { contentDir: "ch02/08-requisition-accounting-distributions" }),
      L(9, "processing-requisitions-into-purchase-orders", "Processing Requisitions into Purchase Orders", { contentDir: "ch02/09-processing-requisitions-into-purchase-orders" }),
    ],
  },
  {
    n: 3,
    title: "Purchase Orders",
    lessons: [
      L(10, "purchase-order-types-and-purchase-agreements", "Purchase Order Types and Purchase Agreements", { contentDir: "ch03/10-purchase-order-types-and-purchase-agreements" }),
      L(11, "creating-a-purchase-order", "Creating a Purchase Order", { contentDir: "ch03/11-creating-a-purchase-order" }),
      L(12, "purchase-order-approvals-and-communication", "Purchase Order Approvals and Communication", { contentDir: "ch03/12-purchase-order-approvals-and-communication" }),
      L(13, "change-orders", "Change Orders", { contentDir: "ch03/13-change-orders" }),
      L(14, "closing-and-cancelling-purchase-orders", "Closing and Cancelling Purchase Orders", { contentDir: "ch03/14-closing-and-cancelling-purchase-orders" }),
    ],
  },
  {
    n: 4,
    title: "Receiving",
    lessons: [
      L(15, "receiving-goods-and-services", "Receiving Goods and Services", { contentDir: "ch04/15-receiving-goods-and-services" }),
      L(16, "receipt-routing-and-inspection", "Receipt Routing and Inspection", { contentDir: "ch04/16-receipt-routing-and-inspection" }),
      L(17, "returns-and-corrections", "Returns and Corrections", { contentDir: "ch04/17-returns-and-corrections" }),
      L(18, "receipt-accounting-and-accruals", "Receipt Accounting and Accruals", { contentDir: "ch04/18-receipt-accounting-and-accruals" }),
    ],
  },
  {
    n: 5,
    title: "Invoice to Ledger",
    lessons: [
      L(19, "matching-the-ap-invoice", "Matching the AP Invoice", { contentDir: "ch05/19-matching-the-ap-invoice" }),
      L(20, "payment-and-accounting", "Payment and Accounting", { contentDir: "ch05/20-payment-and-accounting" }),
      L(21, "following-the-transaction-into-general-ledger", "Following the Transaction into General Ledger", { contentDir: "ch05/21-following-the-transaction-into-general-ledger" }),
      L(22, "reconciling-procure-to-pay-end-to-end", "Reconciling Procure-to-Pay End to End", { contentDir: "ch05/22-reconciling-procure-to-pay-end-to-end" }),
      L(23, "procure-to-pay-troubleshooting-practice", "Procure-to-Pay Troubleshooting Practice", { contentDir: "ch05/23-procure-to-pay-troubleshooting-practice" }),
    ],
  },
  {
    n: 6,
    title: "Practice",
    lessons: [
      L(24, "full-procure-to-pay-walkthrough", "Full Procure-to-Pay Walkthrough", { contentDir: "ch06/24-full-procure-to-pay-walkthrough" }),
      L(25, "procure-to-pay-exception-scenarios", "Procure-to-Pay Exception Scenarios", { contentDir: "ch06/25-procure-to-pay-exception-scenarios" }),
    ],
  },
];
