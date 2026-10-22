// The SQL for Oracle Financials course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 05. Applied SQL for finance investigations; the unpaid-invoice challenge is the running example.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/sql-for-oracle-financials/
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

export const SQL_FOR_ORACLE_FINANCIALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "SQL Foundations for Finance",
    lessons: [
      L(1, "what-sql-is-and-how-finance-uses-it", "What SQL Is and How Finance Uses It", { contentDir: "ch01/01-what-sql-is-and-how-finance-uses-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610840/ltv-sql-for-oracle-financials/what-sql-is-and-how-finance-uses-it.mp4", durationLabel: "1 min 43 s" }),
      L(2, "select-from-and-where-on-finance-data", "SELECT, FROM and WHERE on Finance Data", { contentDir: "ch01/02-select-from-and-where-on-finance-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611698/ltv-sql-for-oracle-financials/select-from-and-where-on-finance-data.mp4", durationLabel: "1 min 47 s" }),
      L(3, "sorting-and-limiting-results", "Sorting and Limiting Results", { contentDir: "ch01/03-sorting-and-limiting-results", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612438/ltv-sql-for-oracle-financials/sorting-and-limiting-results.mp4", durationLabel: "1 min 38 s" }),
      L(4, "working-with-dates-in-oracle-sql", "Working with Dates in Oracle SQL", { contentDir: "ch01/04-working-with-dates-in-oracle-sql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630212/ltv-sql-for-oracle-financials/working-with-dates-in-oracle-sql.mp4", durationLabel: "2 min 4 s" }),
      L(5, "nulls-and-data-quality-checks", "NULLs and Data Quality Checks", { contentDir: "ch01/05-nulls-and-data-quality-checks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630312/ltv-sql-for-oracle-financials/nulls-and-data-quality-checks.mp4", durationLabel: "1 min 48 s" }),
    ],
  },
  {
    n: 2,
    title: "Joining Financial Tables",
    lessons: [
      L(6, "joining-suppliers-and-invoices", "Joining Suppliers and Invoices", { contentDir: "ch02/06-joining-suppliers-and-invoices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630398/ltv-sql-for-oracle-financials/joining-suppliers-and-invoices.mp4", durationLabel: "1 min 46 s" }),
      L(7, "joining-invoices-and-payments", "Joining Invoices and Payments", { contentDir: "ch02/07-joining-invoices-and-payments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630476/ltv-sql-for-oracle-financials/joining-invoices-and-payments.mp4", durationLabel: "1 min 45 s" }),
      L(8, "inner-vs-outer-joins-for-finance", "Inner vs. Outer Joins for Finance", { contentDir: "ch02/08-inner-vs-outer-joins-for-finance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630550/ltv-sql-for-oracle-financials/inner-vs-outer-joins-for-finance.mp4", durationLabel: "1 min 44 s" }),
      L(9, "joining-customers-transactions-and-receipts", "Joining Customers, Transactions and Receipts", { contentDir: "ch02/09-joining-customers-transactions-and-receipts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630614/ltv-sql-for-oracle-financials/joining-customers-transactions-and-receipts.mp4", durationLabel: "1 min 35 s" }),
      L(10, "joining-journals-to-ledgers-and-periods", "Joining Journals to Ledgers and Periods", { contentDir: "ch02/10-joining-journals-to-ledgers-and-periods", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630692/ltv-sql-for-oracle-financials/joining-journals-to-ledgers-and-periods.mp4", durationLabel: "1 min 43 s" }),
    ],
  },
  {
    n: 3,
    title: "Aggregation and Aging",
    lessons: [
      L(11, "totals-with-sum-count-and-group-by", "Totals with SUM, COUNT and GROUP BY", { contentDir: "ch03/11-totals-with-sum-count-and-group-by", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630759/ltv-sql-for-oracle-financials/totals-with-sum-count-and-group-by.mp4", durationLabel: "1 min 37 s" }),
      L(12, "having-and-filtering-groups", "HAVING and Filtering Groups", { contentDir: "ch03/12-having-and-filtering-groups", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630826/ltv-sql-for-oracle-financials/having-and-filtering-groups.mp4", durationLabel: "1 min 29 s" }),
      L(13, "building-aging-buckets-with-case", "Building Aging Buckets with CASE", { contentDir: "ch03/13-building-aging-buckets-with-case", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630895/ltv-sql-for-oracle-financials/building-aging-buckets-with-case.mp4", durationLabel: "1 min 42 s" }),
      L(14, "balances-by-supplier-customer-and-period", "Balances by Supplier, Customer and Period", { contentDir: "ch03/14-balances-by-supplier-customer-and-period", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630947/ltv-sql-for-oracle-financials/balances-by-supplier-customer-and-period.mp4", durationLabel: "1 min 17 s" }),
      L(15, "running-totals-and-window-functions", "Running Totals and Window Functions", { contentDir: "ch03/15-running-totals-and-window-functions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631021/ltv-sql-for-oracle-financials/running-totals-and-window-functions.mp4", durationLabel: "1 min 48 s" }),
    ],
  },
  {
    n: 4,
    title: "Subqueries and CTEs",
    lessons: [
      L(16, "subqueries", "Subqueries", { contentDir: "ch04/16-subqueries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631088/ltv-sql-for-oracle-financials/subqueries.mp4", durationLabel: "1 min 36 s" }),
      L(17, "common-table-expressions", "Common Table Expressions", { contentDir: "ch04/17-common-table-expressions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631153/ltv-sql-for-oracle-financials/common-table-expressions.mp4", durationLabel: "1 min 32 s" }),
      L(18, "finding-missing-records-with-not-exists", "Finding Missing Records with NOT EXISTS", { contentDir: "ch04/18-finding-missing-records-with-not-exists", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631228/ltv-sql-for-oracle-financials/finding-missing-records-with-not-exists.mp4", durationLabel: "1 min 40 s" }),
      L(19, "finding-duplicates", "Finding Duplicates", { contentDir: "ch04/19-finding-duplicates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631294/ltv-sql-for-oracle-financials/finding-duplicates.mp4", durationLabel: "1 min 30 s" }),
      L(20, "comparing-two-sets-of-data", "Comparing Two Sets of Data", { contentDir: "ch04/20-comparing-two-sets-of-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631357/ltv-sql-for-oracle-financials/comparing-two-sets-of-data.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
  {
    n: 5,
    title: "Investigating Financial Data",
    lessons: [
      L(21, "reconciling-transactions-with-sql", "Reconciling Transactions with SQL", { contentDir: "ch05/21-reconciling-transactions-with-sql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631416/ltv-sql-for-oracle-financials/reconciling-transactions-with-sql.mp4", durationLabel: "1 min 24 s" }),
      L(22, "identifying-exceptions", "Identifying Exceptions", { contentDir: "ch05/22-identifying-exceptions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631468/ltv-sql-for-oracle-financials/identifying-exceptions.mp4", durationLabel: "1 min 19 s" }),
      L(23, "answering-business-questions-the-unpaid-invoices-challenge", "Answering Business Questions: The Unpaid Invoices Challenge", { contentDir: "ch05/23-answering-business-questions-the-unpaid-invoices-challenge", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631531/ltv-sql-for-oracle-financials/answering-business-questions-the-unpaid-invoices-challenge.mp4", durationLabel: "1 min 54 s" }),
      L(24, "tracing-a-payment-back-to-the-invoice", "Tracing a Payment Back to the Invoice", { contentDir: "ch05/24-tracing-a-payment-back-to-the-invoice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631590/ltv-sql-for-oracle-financials/tracing-a-payment-back-to-the-invoice.mp4", durationLabel: "1 min 23 s" }),
      L(25, "reconciling-ap-and-ar-to-general-ledger-with-sql", "Reconciling AP and AR to General Ledger with SQL", { contentDir: "ch05/25-reconciling-ap-and-ar-to-general-ledger-with-sql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631653/ltv-sql-for-oracle-financials/reconciling-ap-and-ar-to-general-ledger-with-sql.mp4", durationLabel: "1 min 26 s" }),
    ],
  },
  {
    n: 6,
    title: "Practice Sets",
    lessons: [
      L(26, "sql-practice-set-payables-investigations", "SQL Practice Set: Payables Investigations", { contentDir: "ch06/26-sql-practice-set-payables-investigations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631703/ltv-sql-for-oracle-financials/sql-practice-set-payables-investigations.mp4", durationLabel: "1 min 12 s" }),
      L(27, "sql-practice-set-receivables-investigations", "SQL Practice Set: Receivables Investigations", { contentDir: "ch06/27-sql-practice-set-receivables-investigations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631760/ltv-sql-for-oracle-financials/sql-practice-set-receivables-investigations.mp4", durationLabel: "1 min 18 s" }),
      L(28, "sql-practice-set-ledger-and-close-investigations", "SQL Practice Set: Ledger and Close Investigations", { contentDir: "ch06/28-sql-practice-set-ledger-and-close-investigations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631815/ltv-sql-for-oracle-financials/sql-practice-set-ledger-and-close-investigations.mp4", durationLabel: "1 min 22 s" }),
      L(29, "reading-and-tuning-slow-queries", "Reading and Tuning Slow Queries", { contentDir: "ch06/29-reading-and-tuning-slow-queries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631879/ltv-sql-for-oracle-financials/reading-and-tuning-slow-queries.mp4", durationLabel: "1 min 32 s" }),
      L(30, "turning-queries-into-reusable-reports", "Turning Queries into Reusable Reports", { contentDir: "ch06/30-turning-queries-into-reusable-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792631955/ltv-sql-for-oracle-financials/turning-queries-into-reusable-reports.mp4", durationLabel: "1 min 40 s" }),
    ],
  },
];
