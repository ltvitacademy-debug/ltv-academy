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
      L(1, "procure-to-pay-overview", "Procure-to-Pay Overview", { contentDir: "ch01/01-procure-to-pay-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520661/ltv-oracle-fusion-procure-to-pay/procure-to-pay-overview.mp4", durationLabel: "1 min 45 s" }),
      L(2, "procurement-roles-and-work-areas", "Procurement Roles and Work Areas", { contentDir: "ch01/02-procurement-roles-and-work-areas", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521365/ltv-oracle-fusion-procure-to-pay/procurement-roles-and-work-areas.mp4", durationLabel: "1 min 40 s" }),
      L(3, "procurement-setup-review-business-units-and-agents", "Procurement Setup Review: Business Units and Agents", { contentDir: "ch01/03-procurement-setup-review-business-units-and-agents", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522024/ltv-oracle-fusion-procure-to-pay/procurement-setup-review-business-units-and-agents.mp4", durationLabel: "1 min 34 s" }),
      L(4, "following-one-transaction-the-plan", "Following One Transaction: The Plan", { contentDir: "ch01/04-following-one-transaction-the-plan", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522591/ltv-oracle-fusion-procure-to-pay/following-one-transaction-the-plan.mp4", durationLabel: "1 min 32 s" }),
    ],
  },
  {
    n: 2,
    title: "Requisitions",
    lessons: [
      L(5, "self-service-procurement-and-requisitions", "Self Service Procurement and Requisitions", { contentDir: "ch02/05-self-service-procurement-and-requisitions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523241/ltv-oracle-fusion-procure-to-pay/self-service-procurement-and-requisitions.mp4", durationLabel: "1 min 34 s" }),
      L(6, "creating-a-requisition", "Creating a Requisition", { contentDir: "ch02/06-creating-a-requisition", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523819/ltv-oracle-fusion-procure-to-pay/creating-a-requisition.mp4", durationLabel: "1 min 25 s" }),
      L(7, "requisition-approvals", "Requisition Approvals", { contentDir: "ch02/07-requisition-approvals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524312/ltv-oracle-fusion-procure-to-pay/requisition-approvals.mp4", durationLabel: "1 min 19 s" }),
      L(8, "requisition-accounting-distributions", "Requisition Accounting Distributions", { contentDir: "ch02/08-requisition-accounting-distributions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524900/ltv-oracle-fusion-procure-to-pay/requisition-accounting-distributions.mp4", durationLabel: "1 min 27 s" }),
      L(9, "processing-requisitions-into-purchase-orders", "Processing Requisitions into Purchase Orders", { contentDir: "ch02/09-processing-requisitions-into-purchase-orders", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525489/ltv-oracle-fusion-procure-to-pay/processing-requisitions-into-purchase-orders.mp4", durationLabel: "1 min 26 s" }),
    ],
  },
  {
    n: 3,
    title: "Purchase Orders",
    lessons: [
      L(10, "purchase-order-types-and-purchase-agreements", "Purchase Order Types and Purchase Agreements", { contentDir: "ch03/10-purchase-order-types-and-purchase-agreements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526023/ltv-oracle-fusion-procure-to-pay/purchase-order-types-and-purchase-agreements.mp4", durationLabel: "1 min 26 s" }),
      L(11, "creating-a-purchase-order", "Creating a Purchase Order", { contentDir: "ch03/11-creating-a-purchase-order", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526606/ltv-oracle-fusion-procure-to-pay/creating-a-purchase-order.mp4", durationLabel: "1 min 26 s" }),
      L(12, "purchase-order-approvals-and-communication", "Purchase Order Approvals and Communication", { contentDir: "ch03/12-purchase-order-approvals-and-communication", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527218/ltv-oracle-fusion-procure-to-pay/purchase-order-approvals-and-communication.mp4", durationLabel: "1 min 31 s" }),
      L(13, "change-orders", "Change Orders", { contentDir: "ch03/13-change-orders", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527794/ltv-oracle-fusion-procure-to-pay/change-orders.mp4", durationLabel: "1 min 26 s" }),
      L(14, "closing-and-cancelling-purchase-orders", "Closing and Cancelling Purchase Orders", { contentDir: "ch03/14-closing-and-cancelling-purchase-orders", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528333/ltv-oracle-fusion-procure-to-pay/closing-and-cancelling-purchase-orders.mp4", durationLabel: "1 min 25 s" }),
    ],
  },
  {
    n: 4,
    title: "Receiving",
    lessons: [
      L(15, "receiving-goods-and-services", "Receiving Goods and Services", { contentDir: "ch04/15-receiving-goods-and-services", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528899/ltv-oracle-fusion-procure-to-pay/receiving-goods-and-services.mp4", durationLabel: "1 min 26 s" }),
      L(16, "receipt-routing-and-inspection", "Receipt Routing and Inspection", { contentDir: "ch04/16-receipt-routing-and-inspection", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529488/ltv-oracle-fusion-procure-to-pay/receipt-routing-and-inspection.mp4", durationLabel: "1 min 25 s" }),
      L(17, "returns-and-corrections", "Returns and Corrections", { contentDir: "ch04/17-returns-and-corrections", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530084/ltv-oracle-fusion-procure-to-pay/returns-and-corrections.mp4", durationLabel: "1 min 29 s" }),
      L(18, "receipt-accounting-and-accruals", "Receipt Accounting and Accruals", { contentDir: "ch04/18-receipt-accounting-and-accruals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530575/ltv-oracle-fusion-procure-to-pay/receipt-accounting-and-accruals.mp4", durationLabel: "1 min 27 s" }),
    ],
  },
  {
    n: 5,
    title: "Invoice to Ledger",
    lessons: [
      L(19, "matching-the-ap-invoice", "Matching the AP Invoice", { contentDir: "ch05/19-matching-the-ap-invoice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531060/ltv-oracle-fusion-procure-to-pay/matching-the-ap-invoice.mp4", durationLabel: "1 min 24 s" }),
      L(20, "payment-and-accounting", "Payment and Accounting", { contentDir: "ch05/20-payment-and-accounting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531589/ltv-oracle-fusion-procure-to-pay/payment-and-accounting.mp4", durationLabel: "1 min 22 s" }),
      L(21, "following-the-transaction-into-general-ledger", "Following the Transaction into General Ledger", { contentDir: "ch05/21-following-the-transaction-into-general-ledger", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532182/ltv-oracle-fusion-procure-to-pay/following-the-transaction-into-general-ledger.mp4", durationLabel: "1 min 31 s" }),
      L(22, "reconciling-procure-to-pay-end-to-end", "Reconciling Procure-to-Pay End to End", { contentDir: "ch05/22-reconciling-procure-to-pay-end-to-end", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532674/ltv-oracle-fusion-procure-to-pay/reconciling-procure-to-pay-end-to-end.mp4", durationLabel: "1 min 34 s" }),
      L(23, "procure-to-pay-troubleshooting-practice", "Procure-to-Pay Troubleshooting Practice", { contentDir: "ch05/23-procure-to-pay-troubleshooting-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533019/ltv-oracle-fusion-procure-to-pay/procure-to-pay-troubleshooting-practice.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 6,
    title: "Practice",
    lessons: [
      L(24, "full-procure-to-pay-walkthrough", "Full Procure-to-Pay Walkthrough", { contentDir: "ch06/24-full-procure-to-pay-walkthrough", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533323/ltv-oracle-fusion-procure-to-pay/full-procure-to-pay-walkthrough.mp4", durationLabel: "1 min 26 s" }),
      L(25, "procure-to-pay-exception-scenarios", "Procure-to-Pay Exception Scenarios", { contentDir: "ch06/25-procure-to-pay-exception-scenarios", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533591/ltv-oracle-fusion-procure-to-pay/procure-to-pay-exception-scenarios.mp4", durationLabel: "1 min 40 s" }),
    ],
  },
];
