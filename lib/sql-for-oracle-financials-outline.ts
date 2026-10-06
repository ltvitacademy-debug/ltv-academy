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
      L(1, "what-sql-is-and-how-finance-uses-it", "What SQL Is and How Finance Uses It", { contentDir: "ch01/01-what-sql-is-and-how-finance-uses-it" }),
      L(2, "select-from-and-where-on-finance-data", "SELECT, FROM and WHERE on Finance Data", { contentDir: "ch01/02-select-from-and-where-on-finance-data" }),
      L(3, "sorting-and-limiting-results", "Sorting and Limiting Results", { contentDir: "ch01/03-sorting-and-limiting-results" }),
      L(4, "working-with-dates-in-oracle-sql", "Working with Dates in Oracle SQL", { contentDir: "ch01/04-working-with-dates-in-oracle-sql" }),
      L(5, "nulls-and-data-quality-checks", "NULLs and Data Quality Checks", { contentDir: "ch01/05-nulls-and-data-quality-checks" }),
    ],
  },
  {
    n: 2,
    title: "Joining Financial Tables",
    lessons: [
      L(6, "joining-suppliers-and-invoices", "Joining Suppliers and Invoices", { contentDir: "ch02/06-joining-suppliers-and-invoices" }),
      L(7, "joining-invoices-and-payments", "Joining Invoices and Payments", { contentDir: "ch02/07-joining-invoices-and-payments" }),
      L(8, "inner-vs-outer-joins-for-finance", "Inner vs. Outer Joins for Finance", { contentDir: "ch02/08-inner-vs-outer-joins-for-finance" }),
      L(9, "joining-customers-transactions-and-receipts", "Joining Customers, Transactions and Receipts", { contentDir: "ch02/09-joining-customers-transactions-and-receipts" }),
      L(10, "joining-journals-to-ledgers-and-periods", "Joining Journals to Ledgers and Periods", { contentDir: "ch02/10-joining-journals-to-ledgers-and-periods" }),
    ],
  },
  {
    n: 3,
    title: "Aggregation and Aging",
    lessons: [
      L(11, "totals-with-sum-count-and-group-by", "Totals with SUM, COUNT and GROUP BY", { contentDir: "ch03/11-totals-with-sum-count-and-group-by" }),
      L(12, "having-and-filtering-groups", "HAVING and Filtering Groups", { contentDir: "ch03/12-having-and-filtering-groups" }),
      L(13, "building-aging-buckets-with-case", "Building Aging Buckets with CASE", { contentDir: "ch03/13-building-aging-buckets-with-case" }),
      L(14, "balances-by-supplier-customer-and-period", "Balances by Supplier, Customer and Period", { contentDir: "ch03/14-balances-by-supplier-customer-and-period" }),
      L(15, "running-totals-and-window-functions", "Running Totals and Window Functions", { contentDir: "ch03/15-running-totals-and-window-functions" }),
    ],
  },
  {
    n: 4,
    title: "Subqueries and CTEs",
    lessons: [
      L(16, "subqueries", "Subqueries", { contentDir: "ch04/16-subqueries" }),
      L(17, "common-table-expressions", "Common Table Expressions", { contentDir: "ch04/17-common-table-expressions" }),
      L(18, "finding-missing-records-with-not-exists", "Finding Missing Records with NOT EXISTS", { contentDir: "ch04/18-finding-missing-records-with-not-exists" }),
      L(19, "finding-duplicates", "Finding Duplicates", { contentDir: "ch04/19-finding-duplicates" }),
      L(20, "comparing-two-sets-of-data", "Comparing Two Sets of Data", { contentDir: "ch04/20-comparing-two-sets-of-data" }),
    ],
  },
  {
    n: 5,
    title: "Investigating Financial Data",
    lessons: [
      L(21, "reconciling-transactions-with-sql", "Reconciling Transactions with SQL", { contentDir: "ch05/21-reconciling-transactions-with-sql" }),
      L(22, "identifying-exceptions", "Identifying Exceptions", { contentDir: "ch05/22-identifying-exceptions" }),
      L(23, "answering-business-questions-the-unpaid-invoices-challenge", "Answering Business Questions: The Unpaid Invoices Challenge", { contentDir: "ch05/23-answering-business-questions-the-unpaid-invoices-challenge" }),
      L(24, "tracing-a-payment-back-to-the-invoice", "Tracing a Payment Back to the Invoice", { contentDir: "ch05/24-tracing-a-payment-back-to-the-invoice" }),
      L(25, "reconciling-ap-and-ar-to-general-ledger-with-sql", "Reconciling AP and AR to General Ledger with SQL", { contentDir: "ch05/25-reconciling-ap-and-ar-to-general-ledger-with-sql" }),
    ],
  },
  {
    n: 6,
    title: "Practice Sets",
    lessons: [
      L(26, "sql-practice-set-payables-investigations", "SQL Practice Set: Payables Investigations", { contentDir: "ch06/26-sql-practice-set-payables-investigations" }),
      L(27, "sql-practice-set-receivables-investigations", "SQL Practice Set: Receivables Investigations", { contentDir: "ch06/27-sql-practice-set-receivables-investigations" }),
      L(28, "sql-practice-set-ledger-and-close-investigations", "SQL Practice Set: Ledger and Close Investigations", { contentDir: "ch06/28-sql-practice-set-ledger-and-close-investigations" }),
      L(29, "reading-and-tuning-slow-queries", "Reading and Tuning Slow Queries", { contentDir: "ch06/29-reading-and-tuning-slow-queries" }),
      L(30, "turning-queries-into-reusable-reports", "Turning Queries into Reusable Reports", { contentDir: "ch06/30-turning-queries-into-reusable-reports" }),
    ],
  },
];
