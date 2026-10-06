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
      L(1, "why-hands-on-practice-matters-in-salesforce", "Why Hands-On Practice Matters in Salesforce", { contentDir: "ch01/01-why-hands-on-practice-matters-in-salesforce" }),
      L(2, "creating-your-trailhead-account", "Creating Your Trailhead Account", { contentDir: "ch01/02-creating-your-trailhead-account" }),
      L(3, "creating-trailhead-playgrounds", "Creating Trailhead Playgrounds", { contentDir: "ch01/03-creating-trailhead-playgrounds" }),
      L(4, "understanding-developer-edition-orgs", "Understanding Developer Edition Orgs", { contentDir: "ch01/04-understanding-developer-edition-orgs" }),
      L(5, "trailhead-playground-vs-developer-edition-vs-sandbox", "Trailhead Playground vs. Developer Edition vs. Sandbox", { contentDir: "ch01/05-trailhead-playground-vs-developer-edition-vs-sandbox" }),
    ],
  },
  {
    n: 2,
    title: "Getting Comfortable in Setup",
    lessons: [
      L(6, "navigating-setup", "Navigating Setup", { contentDir: "ch02/06-navigating-setup" }),
      L(7, "using-setup-search-and-quick-find", "Using Setup Search and Quick Find", { contentDir: "ch02/07-using-setup-search-and-quick-find" }),
      L(8, "your-personal-settings", "Your Personal Settings", { contentDir: "ch02/08-your-personal-settings" }),
      L(9, "company-information-and-org-settings", "Company Information and Org Settings", { contentDir: "ch02/09-company-information-and-org-settings" }),
      L(10, "sample-data-and-resetting-your-org", "Sample Data and Resetting Your Org", { contentDir: "ch02/10-sample-data-and-resetting-your-org" }),
    ],
  },
  {
    n: 3,
    title: "Your Permanent Training Environment",
    lessons: [
      L(11, "preparing-your-permanent-training-environment", "Preparing Your Permanent Training Environment", { contentDir: "ch03/11-preparing-your-permanent-training-environment" }),
      L(12, "organizing-your-work-naming-and-notes", "Organizing Your Work: Naming and Notes", { contentDir: "ch03/12-organizing-your-work-naming-and-notes" }),
      L(13, "using-trailhead-modules-and-superbadges-with-ltv", "Using Trailhead Modules and Superbadges With LTV", { contentDir: "ch03/13-using-trailhead-modules-and-superbadges-with-ltv" }),
      L(14, "getting-help-documentation-and-the-trailblazer-community", "Getting Help: Documentation and the Trailblazer Community", { contentDir: "ch03/14-getting-help-documentation-and-the-trailblazer-community" }),
    ],
  },
];
