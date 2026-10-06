// The Oracle Financials Data course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 05. The data-model view that makes SQL and troubleshooting make sense.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-financials-data/
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

export const ORACLE_FINANCIALS_DATA_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "The Financial Data Model",
    lessons: [
      L(1, "how-financial-data-is-organized-in-oracle-fusion", "How Financial Data Is Organized in Oracle Fusion", { contentDir: "ch01/01-how-financial-data-is-organized-in-oracle-fusion" }),
      L(2, "business-units-ledgers-and-data-access", "Business Units, Ledgers and Data Access", { contentDir: "ch01/02-business-units-ledgers-and-data-access" }),
      L(3, "reading-table-and-view-documentation", "Reading Table and View Documentation", { contentDir: "ch01/03-reading-table-and-view-documentation" }),
      L(4, "naming-conventions-and-key-columns", "Naming Conventions and Key Columns", { contentDir: "ch01/04-naming-conventions-and-key-columns" }),
    ],
  },
  {
    n: 2,
    title: "Suppliers and Customers",
    lessons: [
      L(5, "suppliers-in-the-data-model", "Suppliers in the Data Model", { contentDir: "ch02/05-suppliers-in-the-data-model" }),
      L(6, "customers-and-the-trading-community-model", "Customers and the Trading Community Model", { contentDir: "ch02/06-customers-and-the-trading-community-model" }),
      L(7, "sites-addresses-and-contacts", "Sites, Addresses and Contacts", { contentDir: "ch02/07-sites-addresses-and-contacts" }),
    ],
  },
  {
    n: 3,
    title: "Payables and Receivables Data",
    lessons: [
      L(8, "invoices-and-invoice-lines", "Invoices and Invoice Lines", { contentDir: "ch03/08-invoices-and-invoice-lines" }),
      L(9, "payments-and-payment-applications", "Payments and Payment Applications", { contentDir: "ch03/09-payments-and-payment-applications" }),
      L(10, "receivables-transactions-and-receipts", "Receivables Transactions and Receipts", { contentDir: "ch03/10-receivables-transactions-and-receipts" }),
      L(11, "how-invoices-and-payments-relate", "How Invoices and Payments Relate", { contentDir: "ch03/11-how-invoices-and-payments-relate" }),
      L(12, "status-flags-and-lifecycle-columns", "Status Flags and Lifecycle Columns", { contentDir: "ch03/12-status-flags-and-lifecycle-columns" }),
    ],
  },
  {
    n: 4,
    title: "Ledger Data",
    lessons: [
      L(13, "journal-headers-batches-and-lines", "Journal Headers, Batches and Lines", { contentDir: "ch04/13-journal-headers-batches-and-lines" }),
      L(14, "ledgers-periods-and-balances", "Ledgers, Periods and Balances", { contentDir: "ch04/14-ledgers-periods-and-balances" }),
      L(15, "following-an-accounting-transaction-across-tables", "Following an Accounting Transaction Across Tables", { contentDir: "ch04/15-following-an-accounting-transaction-across-tables" }),
      L(16, "subledger-accounting-tables-and-links-to-the-ledger", "Subledger Accounting Tables and Links to the Ledger", { contentDir: "ch04/16-subledger-accounting-tables-and-links-to-the-ledger" }),
    ],
  },
  {
    n: 5,
    title: "Using Data Well",
    lessons: [
      L(17, "building-a-data-map-of-your-practice-instance", "Building a Data Map of Your Practice Instance", { contentDir: "ch05/17-building-a-data-map-of-your-practice-instance" }),
      L(18, "data-quality-and-common-data-problems", "Data Quality and Common Data Problems", { contentDir: "ch05/18-data-quality-and-common-data-problems" }),
    ],
  },
];
