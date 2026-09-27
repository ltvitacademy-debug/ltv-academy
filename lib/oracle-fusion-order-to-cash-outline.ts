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
      L(1, "order-to-cash-overview", "Order-to-Cash Overview"),
      L(2, "the-customer-lifecycle-and-roles", "The Customer Lifecycle and Roles"),
      L(3, "order-to-cash-setup-review", "Order-to-Cash Setup Review"),
      L(4, "following-one-transaction-the-plan", "Following One Transaction: The Plan"),
    ],
  },
  {
    n: 2,
    title: "Customers and Orders",
    lessons: [
      L(5, "customers-and-sales-orders", "Customers and Sales Orders"),
      L(6, "creating-a-sales-order", "Creating a Sales Order"),
      L(7, "order-pricing-and-discounts-overview", "Order Pricing and Discounts Overview"),
      L(8, "order-approvals-and-holds", "Order Approvals and Holds"),
      L(9, "changing-and-cancelling-orders", "Changing and Cancelling Orders"),
    ],
  },
  {
    n: 3,
    title: "Fulfillment and Shipping",
    lessons: [
      L(10, "fulfillment-and-shipping", "Fulfillment and Shipping"),
      L(11, "pick-pack-and-ship-overview", "Pick, Pack and Ship Overview"),
      L(12, "shipping-confirmation", "Shipping Confirmation"),
      L(13, "returns-and-return-material-authorization", "Returns and Return Material Authorization"),
    ],
  },
  {
    n: 4,
    title: "Billing",
    lessons: [
      L(14, "billing-the-customer-the-invoice", "Billing the Customer: The Invoice"),
      L(15, "interfacing-orders-to-receivables", "Interfacing Orders to Receivables"),
      L(16, "autoinvoice-processing-and-errors", "AutoInvoice Processing and Errors"),
      L(17, "credit-memos-for-returns", "Credit Memos for Returns"),
    ],
  },
  {
    n: 5,
    title: "Cash and Ledger",
    lessons: [
      L(18, "the-receivable-and-the-cash-receipt", "The Receivable and the Cash Receipt"),
      L(19, "applying-cash", "Applying Cash"),
      L(20, "accounting-for-revenue-and-cash", "Accounting for Revenue and Cash"),
      L(21, "following-revenue-into-general-ledger", "Following Revenue into General Ledger"),
      L(22, "reconciling-order-to-cash-end-to-end", "Reconciling Order-to-Cash End to End"),
    ],
  },
  {
    n: 6,
    title: "Practice",
    lessons: [
      L(23, "full-order-to-cash-walkthrough", "Full Order-to-Cash Walkthrough"),
      L(24, "order-to-cash-exception-scenarios", "Order-to-Cash Exception Scenarios"),
      L(25, "order-to-cash-troubleshooting-practice", "Order-to-Cash Troubleshooting Practice"),
    ],
  },
];
