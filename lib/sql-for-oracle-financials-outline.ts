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
      L(1, "what-sql-is-and-how-finance-uses-it", "What SQL Is and How Finance Uses It"),
      L(2, "select-from-and-where-on-finance-data", "SELECT, FROM and WHERE on Finance Data"),
      L(3, "sorting-and-limiting-results", "Sorting and Limiting Results"),
      L(4, "working-with-dates-in-oracle-sql", "Working with Dates in Oracle SQL"),
      L(5, "nulls-and-data-quality-checks", "NULLs and Data Quality Checks"),
    ],
  },
  {
    n: 2,
    title: "Joining Financial Tables",
    lessons: [
      L(6, "joining-suppliers-and-invoices", "Joining Suppliers and Invoices"),
      L(7, "joining-invoices-and-payments", "Joining Invoices and Payments"),
      L(8, "inner-vs-outer-joins-for-finance", "Inner vs. Outer Joins for Finance"),
      L(9, "joining-customers-transactions-and-receipts", "Joining Customers, Transactions and Receipts"),
      L(10, "joining-journals-to-ledgers-and-periods", "Joining Journals to Ledgers and Periods"),
    ],
  },
  {
    n: 3,
    title: "Aggregation and Aging",
    lessons: [
      L(11, "totals-with-sum-count-and-group-by", "Totals with SUM, COUNT and GROUP BY"),
      L(12, "having-and-filtering-groups", "HAVING and Filtering Groups"),
      L(13, "building-aging-buckets-with-case", "Building Aging Buckets with CASE"),
      L(14, "balances-by-supplier-customer-and-period", "Balances by Supplier, Customer and Period"),
      L(15, "running-totals-and-window-functions", "Running Totals and Window Functions"),
    ],
  },
  {
    n: 4,
    title: "Subqueries and CTEs",
    lessons: [
      L(16, "subqueries", "Subqueries"),
      L(17, "common-table-expressions", "Common Table Expressions"),
      L(18, "finding-missing-records-with-not-exists", "Finding Missing Records with NOT EXISTS"),
      L(19, "finding-duplicates", "Finding Duplicates"),
      L(20, "comparing-two-sets-of-data", "Comparing Two Sets of Data"),
    ],
  },
  {
    n: 5,
    title: "Investigating Financial Data",
    lessons: [
      L(21, "reconciling-transactions-with-sql", "Reconciling Transactions with SQL"),
      L(22, "identifying-exceptions", "Identifying Exceptions"),
      L(23, "answering-business-questions-the-unpaid-invoices-challenge", "Answering Business Questions: The Unpaid Invoices Challenge"),
      L(24, "tracing-a-payment-back-to-the-invoice", "Tracing a Payment Back to the Invoice"),
      L(25, "reconciling-ap-and-ar-to-general-ledger-with-sql", "Reconciling AP and AR to General Ledger with SQL"),
    ],
  },
  {
    n: 6,
    title: "Practice Sets",
    lessons: [
      L(26, "sql-practice-set-payables-investigations", "SQL Practice Set: Payables Investigations"),
      L(27, "sql-practice-set-receivables-investigations", "SQL Practice Set: Receivables Investigations"),
      L(28, "sql-practice-set-ledger-and-close-investigations", "SQL Practice Set: Ledger and Close Investigations"),
      L(29, "reading-and-tuning-slow-queries", "Reading and Tuning Slow Queries"),
      L(30, "turning-queries-into-reusable-reports", "Turning Queries into Reusable Reports"),
    ],
  },
];
