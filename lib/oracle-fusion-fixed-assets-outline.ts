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
    title: "Asset Setup",
    lessons: [
      L(1, "asset-books-and-categories", "Asset Books and Categories"),
      L(2, "asset-key-flexfields-and-setup", "Asset Key Flexfields and Setup"),
    ],
  },
  {
    n: 2,
    title: "The Asset Lifecycle",
    lessons: [
      L(3, "adding-assets", "Adding Assets"),
      L(4, "capitalization-and-placing-assets-in-service", "Capitalization and Placing Assets in Service"),
      L(5, "depreciation-and-depreciation-runs", "Depreciation and Depreciation Runs"),
      L(6, "asset-transfers", "Asset Transfers"),
      L(7, "asset-retirements", "Asset Retirements"),
    ],
  },
];
