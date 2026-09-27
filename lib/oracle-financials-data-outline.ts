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
      L(1, "how-financial-data-is-organized-in-oracle-fusion", "How Financial Data Is Organized in Oracle Fusion"),
      L(2, "business-units-ledgers-and-data-access", "Business Units, Ledgers and Data Access"),
      L(3, "reading-table-and-view-documentation", "Reading Table and View Documentation"),
      L(4, "naming-conventions-and-key-columns", "Naming Conventions and Key Columns"),
    ],
  },
  {
    n: 2,
    title: "Suppliers and Customers",
    lessons: [
      L(5, "suppliers-in-the-data-model", "Suppliers in the Data Model"),
      L(6, "customers-and-the-trading-community-model", "Customers and the Trading Community Model"),
      L(7, "sites-addresses-and-contacts", "Sites, Addresses and Contacts"),
    ],
  },
  {
    n: 3,
    title: "Payables and Receivables Data",
    lessons: [
      L(8, "invoices-and-invoice-lines", "Invoices and Invoice Lines"),
      L(9, "payments-and-payment-applications", "Payments and Payment Applications"),
      L(10, "receivables-transactions-and-receipts", "Receivables Transactions and Receipts"),
      L(11, "how-invoices-and-payments-relate", "How Invoices and Payments Relate"),
      L(12, "status-flags-and-lifecycle-columns", "Status Flags and Lifecycle Columns"),
    ],
  },
  {
    n: 4,
    title: "Ledger Data",
    lessons: [
      L(13, "journal-headers-batches-and-lines", "Journal Headers, Batches and Lines"),
      L(14, "ledgers-periods-and-balances", "Ledgers, Periods and Balances"),
      L(15, "following-an-accounting-transaction-across-tables", "Following an Accounting Transaction Across Tables"),
      L(16, "subledger-accounting-tables-and-links-to-the-ledger", "Subledger Accounting Tables and Links to the Ledger"),
    ],
  },
  {
    n: 5,
    title: "Using Data Well",
    lessons: [
      L(17, "building-a-data-map-of-your-practice-instance", "Building a Data Map of Your Practice Instance"),
      L(18, "data-quality-and-common-data-problems", "Data Quality and Common Data Problems"),
    ],
  },
];
