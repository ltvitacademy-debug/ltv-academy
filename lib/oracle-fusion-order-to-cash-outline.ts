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
    title: "The Customer Lifecycle",
    lessons: [
      L(1, "order-to-cash-overview", "Order-to-Cash Overview"),
      L(2, "customers-and-sales-orders", "Customers and Sales Orders"),
      L(3, "fulfillment-and-shipping", "Fulfillment and Shipping"),
    ],
  },
  {
    n: 2,
    title: "Invoice to Ledger",
    lessons: [
      L(4, "billing-the-customer-the-invoice", "Billing the Customer: The Invoice"),
      L(5, "the-receivable-and-the-cash-receipt", "The Receivable and the Cash Receipt"),
      L(6, "accounting-for-revenue-and-cash", "Accounting for Revenue and Cash"),
      L(7, "following-revenue-into-general-ledger", "Following Revenue into General Ledger"),
    ],
  },
];
