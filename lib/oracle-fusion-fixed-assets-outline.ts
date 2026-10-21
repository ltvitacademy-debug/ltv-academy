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
      L(1, "fixed-assets-concepts-and-the-asset-lifecycle", "Fixed Assets Concepts and the Asset Lifecycle", { contentDir: "ch01/01-fixed-assets-concepts-and-the-asset-lifecycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522909/ltv-oracle-fusion-fixed-assets/fixed-assets-concepts-and-the-asset-lifecycle.mp4", durationLabel: "1 min 36 s" }),
      L(2, "fixed-assets-work-areas", "Fixed Assets Work Areas", { contentDir: "ch01/02-fixed-assets-work-areas", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523523/ltv-oracle-fusion-fixed-assets/fixed-assets-work-areas.mp4", durationLabel: "1 min 34 s" }),
      L(3, "asset-books-and-book-controls", "Asset Books and Book Controls", { contentDir: "ch01/03-asset-books-and-book-controls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524086/ltv-oracle-fusion-fixed-assets/asset-books-and-book-controls.mp4", durationLabel: "1 min 25 s" }),
      L(4, "asset-categories-and-category-books", "Asset Categories and Category Books", { contentDir: "ch01/04-asset-categories-and-category-books", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524662/ltv-oracle-fusion-fixed-assets/asset-categories-and-category-books.mp4", durationLabel: "1 min 25 s" }),
      L(5, "asset-locations-and-asset-key-flexfields", "Asset Locations and Asset Key Flexfields", { contentDir: "ch01/05-asset-locations-and-asset-key-flexfields", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525181/ltv-oracle-fusion-fixed-assets/asset-locations-and-asset-key-flexfields.mp4", durationLabel: "1 min 24 s" }),
    ],
  },
  {
    n: 2,
    title: "Depreciation Setup",
    lessons: [
      L(6, "depreciation-methods", "Depreciation Methods", { contentDir: "ch02/06-depreciation-methods", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525824/ltv-oracle-fusion-fixed-assets/depreciation-methods.mp4", durationLabel: "1 min 38 s" }),
      L(7, "prorate-conventions-and-calendars", "Prorate Conventions and Calendars", { contentDir: "ch02/07-prorate-conventions-and-calendars", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526457/ltv-oracle-fusion-fixed-assets/prorate-conventions-and-calendars.mp4", durationLabel: "1 min 36 s" }),
      L(8, "depreciation-books-and-fiscal-years", "Depreciation Books and Fiscal Years", { contentDir: "ch02/08-depreciation-books-and-fiscal-years", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526911/ltv-oracle-fusion-fixed-assets/depreciation-books-and-fiscal-years.mp4", durationLabel: "1 min 15 s" }),
      L(9, "setting-up-category-defaults", "Setting Up Category Defaults", { contentDir: "ch02/09-setting-up-category-defaults", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527455/ltv-oracle-fusion-fixed-assets/setting-up-category-defaults.mp4", durationLabel: "1 min 23 s" }),
      L(10, "tax-books-and-corporate-books", "Tax Books and Corporate Books", { contentDir: "ch02/10-tax-books-and-corporate-books", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527947/ltv-oracle-fusion-fixed-assets/tax-books-and-corporate-books.mp4", durationLabel: "1 min 19 s" }),
    ],
  },
  {
    n: 3,
    title: "Adding Assets",
    lessons: [
      L(11, "adding-an-asset-manually", "Adding an Asset Manually", { contentDir: "ch03/11-adding-an-asset-manually", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528557/ltv-oracle-fusion-fixed-assets/adding-an-asset-manually.mp4", durationLabel: "1 min 33 s" }),
      L(12, "quick-additions", "Quick Additions", { contentDir: "ch03/12-quick-additions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529090/ltv-oracle-fusion-fixed-assets/quick-additions.mp4", durationLabel: "1 min 25 s" }),
      L(13, "mass-additions-from-payables-invoices", "Mass Additions from Payables Invoices", { contentDir: "ch03/13-mass-additions-from-payables-invoices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529583/ltv-oracle-fusion-fixed-assets/mass-additions-from-payables-invoices.mp4", durationLabel: "1 min 20 s" }),
      L(14, "preparing-mass-additions", "Preparing Mass Additions", { contentDir: "ch03/14-preparing-mass-additions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530070/ltv-oracle-fusion-fixed-assets/preparing-mass-additions.mp4", durationLabel: "1 min 19 s" }),
      L(15, "posting-mass-additions", "Posting Mass Additions", { contentDir: "ch03/15-posting-mass-additions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530522/ltv-oracle-fusion-fixed-assets/posting-mass-additions.mp4", durationLabel: "1 min 21 s" }),
      L(16, "capitalization-and-placing-assets-in-service", "Capitalization and Placing Assets in Service", { contentDir: "ch03/16-capitalization-and-placing-assets-in-service", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530966/ltv-oracle-fusion-fixed-assets/capitalization-and-placing-assets-in-service.mp4", durationLabel: "1 min 19 s" }),
    ],
  },
  {
    n: 4,
    title: "Depreciation and Adjustments",
    lessons: [
      L(17, "running-depreciation", "Running Depreciation", { contentDir: "ch04/17-running-depreciation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531389/ltv-oracle-fusion-fixed-assets/running-depreciation.mp4", durationLabel: "1 min 14 s" }),
      L(18, "depreciation-adjustments", "Depreciation Adjustments", { contentDir: "ch04/18-depreciation-adjustments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531910/ltv-oracle-fusion-fixed-assets/depreciation-adjustments.mp4", durationLabel: "1 min 18 s" }),
      L(19, "cost-adjustments", "Cost Adjustments", { contentDir: "ch04/19-cost-adjustments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532316/ltv-oracle-fusion-fixed-assets/cost-adjustments.mp4", durationLabel: "1 min 17 s" }),
      L(20, "reclassifying-assets", "Reclassifying Assets", { contentDir: "ch04/20-reclassifying-assets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532700/ltv-oracle-fusion-fixed-assets/reclassifying-assets.mp4", durationLabel: "1 min 23 s" }),
      L(21, "asset-revaluation", "Asset Revaluation", { contentDir: "ch04/21-asset-revaluation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533017/ltv-oracle-fusion-fixed-assets/asset-revaluation.mp4", durationLabel: "1 min 21 s" }),
      L(22, "impairment", "Impairment", { contentDir: "ch04/22-impairment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533258/ltv-oracle-fusion-fixed-assets/impairment.mp4", durationLabel: "1 min 17 s" }),
    ],
  },
  {
    n: 5,
    title: "Transfers and Retirements",
    lessons: [
      L(23, "asset-transfers", "Asset Transfers", { contentDir: "ch05/23-asset-transfers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533477/ltv-oracle-fusion-fixed-assets/asset-transfers.mp4", durationLabel: "1 min 7 s" }),
      L(24, "retiring-assets", "Retiring Assets", { contentDir: "ch05/24-retiring-assets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533616/ltv-oracle-fusion-fixed-assets/retiring-assets.mp4", durationLabel: "1 min 11 s" }),
      L(25, "reinstating-retired-assets", "Reinstating Retired Assets", { contentDir: "ch05/25-reinstating-retired-assets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533726/ltv-oracle-fusion-fixed-assets/reinstating-retired-assets.mp4", durationLabel: "1 min 11 s" }),
      L(26, "gains-and-losses-on-retirement", "Gains and Losses on Retirement", { contentDir: "ch05/26-gains-and-losses-on-retirement", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533843/ltv-oracle-fusion-fixed-assets/gains-and-losses-on-retirement.mp4", durationLabel: "1 min 18 s" }),
      L(27, "mass-transactions", "Mass Transactions", { contentDir: "ch05/27-mass-transactions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533945/ltv-oracle-fusion-fixed-assets/mass-transactions.mp4", durationLabel: "1 min 21 s" }),
    ],
  },
  {
    n: 6,
    title: "Accounting, Reporting and Close",
    lessons: [
      L(28, "creating-accounting-for-assets", "Creating Accounting for Assets", { contentDir: "ch06/28-creating-accounting-for-assets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534042/ltv-oracle-fusion-fixed-assets/creating-accounting-for-assets.mp4", durationLabel: "1 min 19 s" }),
      L(29, "fixed-assets-to-general-ledger-transfer", "Fixed Assets to General Ledger Transfer", { contentDir: "ch06/29-fixed-assets-to-general-ledger-transfer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534123/ltv-oracle-fusion-fixed-assets/fixed-assets-to-general-ledger-transfer.mp4", durationLabel: "1 min 15 s" }),
      L(30, "fixed-assets-reports", "Fixed Assets Reports", { contentDir: "ch06/30-fixed-assets-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534201/ltv-oracle-fusion-fixed-assets/fixed-assets-reports.mp4", durationLabel: "1 min 13 s" }),
      L(31, "asset-reconciliation", "Asset Reconciliation", { contentDir: "ch06/31-asset-reconciliation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534277/ltv-oracle-fusion-fixed-assets/asset-reconciliation.mp4", durationLabel: "1 min 14 s" }),
      L(32, "fixed-assets-period-close", "Fixed Assets Period Close", { contentDir: "ch06/32-fixed-assets-period-close", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534359/ltv-oracle-fusion-fixed-assets/fixed-assets-period-close.mp4", durationLabel: "1 min 19 s" }),
      L(33, "fixed-assets-troubleshooting-practice", "Fixed Assets Troubleshooting Practice", { contentDir: "ch06/33-fixed-assets-troubleshooting-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534441/ltv-oracle-fusion-fixed-assets/fixed-assets-troubleshooting-practice.mp4", durationLabel: "1 min 18 s" }),
    ],
  },
];
