// The Hands-On Salesforce Environment course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-hands-on-environment/
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

export const SFTA_SALESFORCE_HANDS_ON_ENVIRONMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Your Free Practice Environment",
    lessons: [
      L(1, "why-hands-on-practice-matters-in-salesforce", "Why Hands-On Practice Matters in Salesforce"),
      L(2, "creating-your-trailhead-account", "Creating Your Trailhead Account"),
      L(3, "creating-trailhead-playgrounds", "Creating Trailhead Playgrounds"),
      L(4, "understanding-developer-edition-orgs", "Understanding Developer Edition Orgs"),
      L(5, "trailhead-playground-vs-developer-edition-vs-sandbox", "Trailhead Playground vs. Developer Edition vs. Sandbox"),
    ],
  },
  {
    n: 2,
    title: "Getting Comfortable in Setup",
    lessons: [
      L(6, "navigating-setup", "Navigating Setup"),
      L(7, "using-setup-search-and-quick-find", "Using Setup Search and Quick Find"),
      L(8, "your-personal-settings", "Your Personal Settings"),
      L(9, "company-information-and-org-settings", "Company Information and Org Settings"),
      L(10, "sample-data-and-resetting-your-org", "Sample Data and Resetting Your Org"),
    ],
  },
  {
    n: 3,
    title: "Your Permanent Training Environment",
    lessons: [
      L(11, "preparing-your-permanent-training-environment", "Preparing Your Permanent Training Environment"),
      L(12, "organizing-your-work-naming-and-notes", "Organizing Your Work: Naming and Notes"),
      L(13, "using-trailhead-modules-and-superbadges-with-ltv", "Using Trailhead Modules and Superbadges With LTV"),
      L(14, "getting-help-documentation-and-the-trailblazer-community", "Getting Help: Documentation and the Trailblazer Community"),
    ],
  },
];
