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
      L(1, "order-to-cash-overview", "Order-to-Cash Overview", { contentDir: "ch01/01-order-to-cash-overview" }),
      L(2, "the-customer-lifecycle-and-roles", "The Customer Lifecycle and Roles", { contentDir: "ch01/02-the-customer-lifecycle-and-roles" }),
      L(3, "order-to-cash-setup-review", "Order-to-Cash Setup Review", { contentDir: "ch01/03-order-to-cash-setup-review" }),
      L(4, "following-one-transaction-the-plan", "Following One Transaction: The Plan", { contentDir: "ch01/04-following-one-transaction-the-plan" }),
    ],
  },
  {
    n: 2,
    title: "Customers and Orders",
    lessons: [
      L(5, "customers-and-sales-orders", "Customers and Sales Orders", { contentDir: "ch02/05-customers-and-sales-orders" }),
      L(6, "creating-a-sales-order", "Creating a Sales Order", { contentDir: "ch02/06-creating-a-sales-order" }),
      L(7, "order-pricing-and-discounts-overview", "Order Pricing and Discounts Overview", { contentDir: "ch02/07-order-pricing-and-discounts-overview" }),
      L(8, "order-approvals-and-holds", "Order Approvals and Holds", { contentDir: "ch02/08-order-approvals-and-holds" }),
      L(9, "changing-and-cancelling-orders", "Changing and Cancelling Orders", { contentDir: "ch02/09-changing-and-cancelling-orders" }),
    ],
  },
  {
    n: 3,
    title: "Fulfillment and Shipping",
    lessons: [
      L(10, "fulfillment-and-shipping", "Fulfillment and Shipping", { contentDir: "ch03/10-fulfillment-and-shipping" }),
      L(11, "pick-pack-and-ship-overview", "Pick, Pack and Ship Overview", { contentDir: "ch03/11-pick-pack-and-ship-overview" }),
      L(12, "shipping-confirmation", "Shipping Confirmation", { contentDir: "ch03/12-shipping-confirmation" }),
      L(13, "returns-and-return-material-authorization", "Returns and Return Material Authorization", { contentDir: "ch03/13-returns-and-return-material-authorization" }),
    ],
  },
  {
    n: 4,
    title: "Billing",
    lessons: [
      L(14, "billing-the-customer-the-invoice", "Billing the Customer: The Invoice", { contentDir: "ch04/14-billing-the-customer-the-invoice" }),
      L(15, "interfacing-orders-to-receivables", "Interfacing Orders to Receivables", { contentDir: "ch04/15-interfacing-orders-to-receivables" }),
      L(16, "autoinvoice-processing-and-errors", "AutoInvoice Processing and Errors", { contentDir: "ch04/16-autoinvoice-processing-and-errors" }),
      L(17, "credit-memos-for-returns", "Credit Memos for Returns", { contentDir: "ch04/17-credit-memos-for-returns" }),
    ],
  },
  {
    n: 5,
    title: "Cash and Ledger",
    lessons: [
      L(18, "the-receivable-and-the-cash-receipt", "The Receivable and the Cash Receipt", { contentDir: "ch05/18-the-receivable-and-the-cash-receipt" }),
      L(19, "applying-cash", "Applying Cash", { contentDir: "ch05/19-applying-cash" }),
      L(20, "accounting-for-revenue-and-cash", "Accounting for Revenue and Cash", { contentDir: "ch05/20-accounting-for-revenue-and-cash" }),
      L(21, "following-revenue-into-general-ledger", "Following Revenue into General Ledger", { contentDir: "ch05/21-following-revenue-into-general-ledger" }),
      L(22, "reconciling-order-to-cash-end-to-end", "Reconciling Order-to-Cash End to End", { contentDir: "ch05/22-reconciling-order-to-cash-end-to-end" }),
    ],
  },
  {
    n: 6,
    title: "Practice",
    lessons: [
      L(23, "full-order-to-cash-walkthrough", "Full Order-to-Cash Walkthrough", { contentDir: "ch06/23-full-order-to-cash-walkthrough" }),
      L(24, "order-to-cash-exception-scenarios", "Order-to-Cash Exception Scenarios", { contentDir: "ch06/24-order-to-cash-exception-scenarios" }),
      L(25, "order-to-cash-troubleshooting-practice", "Order-to-Cash Troubleshooting Practice", { contentDir: "ch06/25-order-to-cash-troubleshooting-practice" }),
    ],
  },
];
