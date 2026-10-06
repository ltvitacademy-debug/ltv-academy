// The Fixed Assets course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 03. Oracle Fusion Cloud Fixed Assets.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-fixed-assets/
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

export const ORACLE_FUSION_FIXED_ASSETS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Fixed Assets Fundamentals",
    lessons: [
      L(1, "fixed-assets-concepts-and-the-asset-lifecycle", "Fixed Assets Concepts and the Asset Lifecycle", { contentDir: "ch01/01-fixed-assets-concepts-and-the-asset-lifecycle" }),
      L(2, "fixed-assets-work-areas", "Fixed Assets Work Areas", { contentDir: "ch01/02-fixed-assets-work-areas" }),
      L(3, "asset-books-and-book-controls", "Asset Books and Book Controls", { contentDir: "ch01/03-asset-books-and-book-controls" }),
      L(4, "asset-categories-and-category-books", "Asset Categories and Category Books", { contentDir: "ch01/04-asset-categories-and-category-books" }),
      L(5, "asset-locations-and-asset-key-flexfields", "Asset Locations and Asset Key Flexfields", { contentDir: "ch01/05-asset-locations-and-asset-key-flexfields" }),
    ],
  },
  {
    n: 2,
    title: "Depreciation Setup",
    lessons: [
      L(6, "depreciation-methods", "Depreciation Methods", { contentDir: "ch02/06-depreciation-methods" }),
      L(7, "prorate-conventions-and-calendars", "Prorate Conventions and Calendars", { contentDir: "ch02/07-prorate-conventions-and-calendars" }),
      L(8, "depreciation-books-and-fiscal-years", "Depreciation Books and Fiscal Years", { contentDir: "ch02/08-depreciation-books-and-fiscal-years" }),
      L(9, "setting-up-category-defaults", "Setting Up Category Defaults", { contentDir: "ch02/09-setting-up-category-defaults" }),
      L(10, "tax-books-and-corporate-books", "Tax Books and Corporate Books", { contentDir: "ch02/10-tax-books-and-corporate-books" }),
    ],
  },
  {
    n: 3,
    title: "Adding Assets",
    lessons: [
      L(11, "adding-an-asset-manually", "Adding an Asset Manually", { contentDir: "ch03/11-adding-an-asset-manually" }),
      L(12, "quick-additions", "Quick Additions", { contentDir: "ch03/12-quick-additions" }),
      L(13, "mass-additions-from-payables-invoices", "Mass Additions from Payables Invoices", { contentDir: "ch03/13-mass-additions-from-payables-invoices" }),
      L(14, "preparing-mass-additions", "Preparing Mass Additions", { contentDir: "ch03/14-preparing-mass-additions" }),
      L(15, "posting-mass-additions", "Posting Mass Additions", { contentDir: "ch03/15-posting-mass-additions" }),
      L(16, "capitalization-and-placing-assets-in-service", "Capitalization and Placing Assets in Service", { contentDir: "ch03/16-capitalization-and-placing-assets-in-service" }),
    ],
  },
  {
    n: 4,
    title: "Depreciation and Adjustments",
    lessons: [
      L(17, "running-depreciation", "Running Depreciation", { contentDir: "ch04/17-running-depreciation" }),
      L(18, "depreciation-adjustments", "Depreciation Adjustments", { contentDir: "ch04/18-depreciation-adjustments" }),
      L(19, "cost-adjustments", "Cost Adjustments", { contentDir: "ch04/19-cost-adjustments" }),
      L(20, "reclassifying-assets", "Reclassifying Assets", { contentDir: "ch04/20-reclassifying-assets" }),
      L(21, "asset-revaluation", "Asset Revaluation", { contentDir: "ch04/21-asset-revaluation" }),
      L(22, "impairment", "Impairment", { contentDir: "ch04/22-impairment" }),
    ],
  },
  {
    n: 5,
    title: "Transfers and Retirements",
    lessons: [
      L(23, "asset-transfers", "Asset Transfers", { contentDir: "ch05/23-asset-transfers" }),
      L(24, "retiring-assets", "Retiring Assets", { contentDir: "ch05/24-retiring-assets" }),
      L(25, "reinstating-retired-assets", "Reinstating Retired Assets", { contentDir: "ch05/25-reinstating-retired-assets" }),
      L(26, "gains-and-losses-on-retirement", "Gains and Losses on Retirement", { contentDir: "ch05/26-gains-and-losses-on-retirement" }),
      L(27, "mass-transactions", "Mass Transactions", { contentDir: "ch05/27-mass-transactions" }),
    ],
  },
  {
    n: 6,
    title: "Accounting, Reporting and Close",
    lessons: [
      L(28, "creating-accounting-for-assets", "Creating Accounting for Assets", { contentDir: "ch06/28-creating-accounting-for-assets" }),
      L(29, "fixed-assets-to-general-ledger-transfer", "Fixed Assets to General Ledger Transfer", { contentDir: "ch06/29-fixed-assets-to-general-ledger-transfer" }),
      L(30, "fixed-assets-reports", "Fixed Assets Reports", { contentDir: "ch06/30-fixed-assets-reports" }),
      L(31, "asset-reconciliation", "Asset Reconciliation", { contentDir: "ch06/31-asset-reconciliation" }),
      L(32, "fixed-assets-period-close", "Fixed Assets Period Close", { contentDir: "ch06/32-fixed-assets-period-close" }),
      L(33, "fixed-assets-troubleshooting-practice", "Fixed Assets Troubleshooting Practice", { contentDir: "ch06/33-fixed-assets-troubleshooting-practice" }),
    ],
  },
];
