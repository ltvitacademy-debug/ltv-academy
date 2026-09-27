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
      L(1, "fixed-assets-concepts-and-the-asset-lifecycle", "Fixed Assets Concepts and the Asset Lifecycle"),
      L(2, "fixed-assets-work-areas", "Fixed Assets Work Areas"),
      L(3, "asset-books-and-book-controls", "Asset Books and Book Controls"),
      L(4, "asset-categories-and-category-books", "Asset Categories and Category Books"),
      L(5, "asset-locations-and-asset-key-flexfields", "Asset Locations and Asset Key Flexfields"),
    ],
  },
  {
    n: 2,
    title: "Depreciation Setup",
    lessons: [
      L(6, "depreciation-methods", "Depreciation Methods"),
      L(7, "prorate-conventions-and-calendars", "Prorate Conventions and Calendars"),
      L(8, "depreciation-books-and-fiscal-years", "Depreciation Books and Fiscal Years"),
      L(9, "setting-up-category-defaults", "Setting Up Category Defaults"),
      L(10, "tax-books-and-corporate-books", "Tax Books and Corporate Books"),
    ],
  },
  {
    n: 3,
    title: "Adding Assets",
    lessons: [
      L(11, "adding-an-asset-manually", "Adding an Asset Manually"),
      L(12, "quick-additions", "Quick Additions"),
      L(13, "mass-additions-from-payables-invoices", "Mass Additions from Payables Invoices"),
      L(14, "preparing-mass-additions", "Preparing Mass Additions"),
      L(15, "posting-mass-additions", "Posting Mass Additions"),
      L(16, "capitalization-and-placing-assets-in-service", "Capitalization and Placing Assets in Service"),
    ],
  },
  {
    n: 4,
    title: "Depreciation and Adjustments",
    lessons: [
      L(17, "running-depreciation", "Running Depreciation"),
      L(18, "depreciation-adjustments", "Depreciation Adjustments"),
      L(19, "cost-adjustments", "Cost Adjustments"),
      L(20, "reclassifying-assets", "Reclassifying Assets"),
      L(21, "asset-revaluation", "Asset Revaluation"),
      L(22, "impairment", "Impairment"),
    ],
  },
  {
    n: 5,
    title: "Transfers and Retirements",
    lessons: [
      L(23, "asset-transfers", "Asset Transfers"),
      L(24, "retiring-assets", "Retiring Assets"),
      L(25, "reinstating-retired-assets", "Reinstating Retired Assets"),
      L(26, "gains-and-losses-on-retirement", "Gains and Losses on Retirement"),
      L(27, "mass-transactions", "Mass Transactions"),
    ],
  },
  {
    n: 6,
    title: "Accounting, Reporting and Close",
    lessons: [
      L(28, "creating-accounting-for-assets", "Creating Accounting for Assets"),
      L(29, "fixed-assets-to-general-ledger-transfer", "Fixed Assets to General Ledger Transfer"),
      L(30, "fixed-assets-reports", "Fixed Assets Reports"),
      L(31, "asset-reconciliation", "Asset Reconciliation"),
      L(32, "fixed-assets-period-close", "Fixed Assets Period Close"),
      L(33, "fixed-assets-troubleshooting-practice", "Fixed Assets Troubleshooting Practice"),
    ],
  },
];
