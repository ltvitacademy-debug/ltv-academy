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
    title: "The Purchasing Lifecycle",
    lessons: [
      L(1, "procure-to-pay-overview", "Procure-to-Pay Overview"),
      L(2, "requisitions", "Requisitions"),
      L(3, "purchase-orders", "Purchase Orders"),
      L(4, "receiving-goods-and-services", "Receiving Goods and Services"),
    ],
  },
  {
    n: 2,
    title: "Invoice to Ledger",
    lessons: [
      L(5, "matching-the-ap-invoice", "Matching the AP Invoice"),
      L(6, "payment-and-accounting", "Payment and Accounting"),
      L(7, "following-the-transaction-into-general-ledger", "Following the Transaction into General Ledger"),
    ],
  },
];
