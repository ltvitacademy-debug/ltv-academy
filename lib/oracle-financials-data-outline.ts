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
      L(1, "how-financial-data-is-organized-in-oracle-fusion", "How Financial Data Is Organized in Oracle Fusion", { contentDir: "ch01/01-how-financial-data-is-organized-in-oracle-fusion", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628123/ltv-oracle-financials-data/how-financial-data-is-organized-in-oracle-fusion.mp4", durationLabel: "2 min 6 s" }),
      L(2, "business-units-ledgers-and-data-access", "Business Units, Ledgers and Data Access", { contentDir: "ch01/02-business-units-ledgers-and-data-access", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628245/ltv-oracle-financials-data/business-units-ledgers-and-data-access.mp4", durationLabel: "1 min 58 s" }),
      L(3, "reading-table-and-view-documentation", "Reading Table and View Documentation", { contentDir: "ch01/03-reading-table-and-view-documentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628354/ltv-oracle-financials-data/reading-table-and-view-documentation.mp4", durationLabel: "1 min 49 s" }),
      L(4, "naming-conventions-and-key-columns", "Naming Conventions and Key Columns", { contentDir: "ch01/04-naming-conventions-and-key-columns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628469/ltv-oracle-financials-data/naming-conventions-and-key-columns.mp4", durationLabel: "1 min 58 s" }),
    ],
  },
  {
    n: 2,
    title: "Suppliers and Customers",
    lessons: [
      L(5, "suppliers-in-the-data-model", "Suppliers in the Data Model", { contentDir: "ch02/05-suppliers-in-the-data-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628583/ltv-oracle-financials-data/suppliers-in-the-data-model.mp4", durationLabel: "1 min 60 s" }),
      L(6, "customers-and-the-trading-community-model", "Customers and the Trading Community Model", { contentDir: "ch02/06-customers-and-the-trading-community-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628736/ltv-oracle-financials-data/customers-and-the-trading-community-model.mp4", durationLabel: "2 min 42 s" }),
      L(7, "sites-addresses-and-contacts", "Sites, Addresses and Contacts", { contentDir: "ch02/07-sites-addresses-and-contacts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628867/ltv-oracle-financials-data/sites-addresses-and-contacts.mp4", durationLabel: "2 min 17 s" }),
    ],
  },
  {
    n: 3,
    title: "Payables and Receivables Data",
    lessons: [
      L(8, "invoices-and-invoice-lines", "Invoices and Invoice Lines", { contentDir: "ch03/08-invoices-and-invoice-lines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628989/ltv-oracle-financials-data/invoices-and-invoice-lines.mp4", durationLabel: "2 min 14 s" }),
      L(9, "payments-and-payment-applications", "Payments and Payment Applications", { contentDir: "ch03/09-payments-and-payment-applications", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629078/ltv-oracle-financials-data/payments-and-payment-applications.mp4", durationLabel: "1 min 43 s" }),
      L(10, "receivables-transactions-and-receipts", "Receivables Transactions and Receipts", { contentDir: "ch03/10-receivables-transactions-and-receipts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629194/ltv-oracle-financials-data/receivables-transactions-and-receipts.mp4", durationLabel: "2 min 0 s" }),
      L(11, "how-invoices-and-payments-relate", "How Invoices and Payments Relate", { contentDir: "ch03/11-how-invoices-and-payments-relate", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629290/ltv-oracle-financials-data/how-invoices-and-payments-relate.mp4", durationLabel: "1 min 42 s" }),
      L(12, "status-flags-and-lifecycle-columns", "Status Flags and Lifecycle Columns", { contentDir: "ch03/12-status-flags-and-lifecycle-columns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629385/ltv-oracle-financials-data/status-flags-and-lifecycle-columns.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
  {
    n: 4,
    title: "Ledger Data",
    lessons: [
      L(13, "journal-headers-batches-and-lines", "Journal Headers, Batches and Lines", { contentDir: "ch04/13-journal-headers-batches-and-lines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629480/ltv-oracle-financials-data/journal-headers-batches-and-lines.mp4", durationLabel: "1 min 48 s" }),
      L(14, "ledgers-periods-and-balances", "Ledgers, Periods and Balances", { contentDir: "ch04/14-ledgers-periods-and-balances", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629592/ltv-oracle-financials-data/ledgers-periods-and-balances.mp4", durationLabel: "1 min 57 s" }),
      L(15, "following-an-accounting-transaction-across-tables", "Following an Accounting Transaction Across Tables", { contentDir: "ch04/15-following-an-accounting-transaction-across-tables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629710/ltv-oracle-financials-data/following-an-accounting-transaction-across-tables.mp4", durationLabel: "2 min 10 s" }),
      L(16, "subledger-accounting-tables-and-links-to-the-ledger", "Subledger Accounting Tables and Links to the Ledger", { contentDir: "ch04/16-subledger-accounting-tables-and-links-to-the-ledger", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629811/ltv-oracle-financials-data/subledger-accounting-tables-and-links-to-the-ledger.mp4", durationLabel: "1 min 56 s" }),
    ],
  },
  {
    n: 5,
    title: "Using Data Well",
    lessons: [
      L(17, "building-a-data-map-of-your-practice-instance", "Building a Data Map of Your Practice Instance", { contentDir: "ch05/17-building-a-data-map-of-your-practice-instance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629901/ltv-oracle-financials-data/building-a-data-map-of-your-practice-instance.mp4", durationLabel: "1 min 39 s" }),
      L(18, "data-quality-and-common-data-problems", "Data Quality and Common Data Problems", { contentDir: "ch05/18-data-quality-and-common-data-problems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630007/ltv-oracle-financials-data/data-quality-and-common-data-problems.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
];
