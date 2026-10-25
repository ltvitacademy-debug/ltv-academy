// The Order-to-Cash course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 04. Students follow revenue through the complete customer lifecycle.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-order-to-cash/
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

export const ORACLE_FUSION_ORDER_TO_CASH_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Order-to-Cash Foundations",
    lessons: [
      L(1, "order-to-cash-overview", "Order-to-Cash Overview", { contentDir: "ch01/01-order-to-cash-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600185/ltv-oracle-fusion-order-to-cash/order-to-cash-overview.mp4", durationLabel: "1 min 27 s" }),
      L(2, "the-customer-lifecycle-and-roles", "The Customer Lifecycle and Roles", { contentDir: "ch01/02-the-customer-lifecycle-and-roles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600702/ltv-oracle-fusion-order-to-cash/the-customer-lifecycle-and-roles.mp4", durationLabel: "1 min 48 s" }),
      L(3, "order-to-cash-setup-review", "Order-to-Cash Setup Review", { contentDir: "ch01/03-order-to-cash-setup-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601094/ltv-oracle-fusion-order-to-cash/order-to-cash-setup-review.mp4", durationLabel: "1 min 40 s" }),
      L(4, "following-one-transaction-the-plan", "Following One Transaction: The Plan", { contentDir: "ch01/04-following-one-transaction-the-plan", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601589/ltv-oracle-fusion-order-to-cash/following-one-transaction-the-plan.mp4", durationLabel: "1 min 48 s" }),
    ],
  },
  {
    n: 2,
    title: "Customers and Orders",
    lessons: [
      L(5, "customers-and-sales-orders", "Customers and Sales Orders", { contentDir: "ch02/05-customers-and-sales-orders", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601997/ltv-oracle-fusion-order-to-cash/customers-and-sales-orders.mp4", durationLabel: "1 min 40 s" }),
      L(6, "creating-a-sales-order", "Creating a Sales Order", { contentDir: "ch02/06-creating-a-sales-order", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602403/ltv-oracle-fusion-order-to-cash/creating-a-sales-order.mp4", durationLabel: "1 min 28 s" }),
      L(7, "order-pricing-and-discounts-overview", "Order Pricing and Discounts Overview", { contentDir: "ch02/07-order-pricing-and-discounts-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602877/ltv-oracle-fusion-order-to-cash/order-pricing-and-discounts-overview.mp4", durationLabel: "1 min 47 s" }),
      L(8, "order-approvals-and-holds", "Order Approvals and Holds", { contentDir: "ch02/08-order-approvals-and-holds", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603338/ltv-oracle-fusion-order-to-cash/order-approvals-and-holds.mp4", durationLabel: "1 min 39 s" }),
      L(9, "changing-and-cancelling-orders", "Changing and Cancelling Orders", { contentDir: "ch02/09-changing-and-cancelling-orders", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603813/ltv-oracle-fusion-order-to-cash/changing-and-cancelling-orders.mp4", durationLabel: "1 min 50 s" }),
    ],
  },
  {
    n: 3,
    title: "Fulfillment and Shipping",
    lessons: [
      L(10, "fulfillment-and-shipping", "Fulfillment and Shipping", { contentDir: "ch03/10-fulfillment-and-shipping", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604230/ltv-oracle-fusion-order-to-cash/fulfillment-and-shipping.mp4", durationLabel: "1 min 30 s" }),
      L(11, "pick-pack-and-ship-overview", "Pick, Pack and Ship Overview", { contentDir: "ch03/11-pick-pack-and-ship-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604644/ltv-oracle-fusion-order-to-cash/pick-pack-and-ship-overview.mp4", durationLabel: "1 min 32 s" }),
      L(12, "shipping-confirmation", "Shipping Confirmation", { contentDir: "ch03/12-shipping-confirmation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605148/ltv-oracle-fusion-order-to-cash/shipping-confirmation.mp4", durationLabel: "1 min 38 s" }),
      L(13, "returns-and-return-material-authorization", "Returns and Return Material Authorization", { contentDir: "ch03/13-returns-and-return-material-authorization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605649/ltv-oracle-fusion-order-to-cash/returns-and-return-material-authorization.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
  {
    n: 4,
    title: "Billing",
    lessons: [
      L(14, "billing-the-customer-the-invoice", "Billing the Customer: The Invoice", { contentDir: "ch04/14-billing-the-customer-the-invoice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606068/ltv-oracle-fusion-order-to-cash/billing-the-customer-the-invoice.mp4", durationLabel: "1 min 29 s" }),
      L(15, "interfacing-orders-to-receivables", "Interfacing Orders to Receivables", { contentDir: "ch04/15-interfacing-orders-to-receivables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606498/ltv-oracle-fusion-order-to-cash/interfacing-orders-to-receivables.mp4", durationLabel: "1 min 35 s" }),
      L(16, "autoinvoice-processing-and-errors", "AutoInvoice Processing and Errors", { contentDir: "ch04/16-autoinvoice-processing-and-errors", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606905/ltv-oracle-fusion-order-to-cash/autoinvoice-processing-and-errors.mp4", durationLabel: "1 min 37 s" }),
      L(17, "credit-memos-for-returns", "Credit Memos for Returns", { contentDir: "ch04/17-credit-memos-for-returns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607376/ltv-oracle-fusion-order-to-cash/credit-memos-for-returns.mp4", durationLabel: "1 min 38 s" }),
    ],
  },
  {
    n: 5,
    title: "Cash and Ledger",
    lessons: [
      L(18, "the-receivable-and-the-cash-receipt", "The Receivable and the Cash Receipt", { contentDir: "ch05/18-the-receivable-and-the-cash-receipt", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607814/ltv-oracle-fusion-order-to-cash/the-receivable-and-the-cash-receipt.mp4", durationLabel: "1 min 36 s" }),
      L(19, "applying-cash", "Applying Cash", { contentDir: "ch05/19-applying-cash", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608196/ltv-oracle-fusion-order-to-cash/applying-cash.mp4", durationLabel: "1 min 35 s" }),
      L(20, "accounting-for-revenue-and-cash", "Accounting for Revenue and Cash", { contentDir: "ch05/20-accounting-for-revenue-and-cash", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608659/ltv-oracle-fusion-order-to-cash/accounting-for-revenue-and-cash.mp4", durationLabel: "1 min 37 s" }),
      L(21, "following-revenue-into-general-ledger", "Following Revenue into General Ledger", { contentDir: "ch05/21-following-revenue-into-general-ledger", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609055/ltv-oracle-fusion-order-to-cash/following-revenue-into-general-ledger.mp4", durationLabel: "1 min 30 s" }),
      L(22, "reconciling-order-to-cash-end-to-end", "Reconciling Order-to-Cash End to End", { contentDir: "ch05/22-reconciling-order-to-cash-end-to-end", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609576/ltv-oracle-fusion-order-to-cash/reconciling-order-to-cash-end-to-end.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
  {
    n: 6,
    title: "Practice",
    lessons: [
      L(23, "full-order-to-cash-walkthrough", "Full Order-to-Cash Walkthrough", { contentDir: "ch06/23-full-order-to-cash-walkthrough", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610073/ltv-oracle-fusion-order-to-cash/full-order-to-cash-walkthrough.mp4", durationLabel: "1 min 43 s" }),
      L(24, "order-to-cash-exception-scenarios", "Order-to-Cash Exception Scenarios", { contentDir: "ch06/24-order-to-cash-exception-scenarios", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610407/ltv-oracle-fusion-order-to-cash/order-to-cash-exception-scenarios.mp4", durationLabel: "1 min 31 s" }),
      L(25, "order-to-cash-troubleshooting-practice", "Order-to-Cash Troubleshooting Practice", { contentDir: "ch06/25-order-to-cash-troubleshooting-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610866/ltv-oracle-fusion-order-to-cash/order-to-cash-troubleshooting-practice.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
];
