// The Hands-On Salesforce Environment course outline. All lessons have
// real guide.md content (the header here previously, incorrectly, called
// this "framework only" — fixed 2026-10-17). Lessons without a contentDir
// render as "in production". Part of the Salesforce Administrator path's
// "Salesforce Foundations" stage (not the Technical Architect path, as a
// prior version of this comment said).

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
      L(1, "why-hands-on-practice-matters-in-salesforce", "Why Hands-On Practice Matters in Salesforce", { contentDir: "ch01/01-why-hands-on-practice-matters-in-salesforce", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514984/ltv-salesforce-hands-on-environment/why-hands-on-practice-matters-in-salesforce.mp4", durationLabel: "1 min 21 s" }),
      L(2, "creating-your-trailhead-account", "Creating Your Trailhead Account", { contentDir: "ch01/02-creating-your-trailhead-account", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515588/ltv-salesforce-hands-on-environment/creating-your-trailhead-account.mp4", durationLabel: "1 min 32 s" }),
      L(3, "creating-trailhead-playgrounds", "Creating Trailhead Playgrounds", { contentDir: "ch01/03-creating-trailhead-playgrounds", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516212/ltv-salesforce-hands-on-environment/creating-trailhead-playgrounds.mp4", durationLabel: "1 min 28 s" }),
      L(4, "understanding-developer-edition-orgs", "Understanding Developer Edition Orgs", { contentDir: "ch01/04-understanding-developer-edition-orgs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516759/ltv-salesforce-hands-on-environment/understanding-developer-edition-orgs.mp4", durationLabel: "1 min 27 s" }),
      L(5, "trailhead-playground-vs-developer-edition-vs-sandbox", "Trailhead Playground vs. Developer Edition vs. Sandbox", { contentDir: "ch01/05-trailhead-playground-vs-developer-edition-vs-sandbox", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517428/ltv-salesforce-hands-on-environment/trailhead-playground-vs-developer-edition-vs-sandbox.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
  {
    n: 2,
    title: "Getting Comfortable in Setup",
    lessons: [
      L(6, "navigating-setup", "Navigating Setup", { contentDir: "ch02/06-navigating-setup", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522785/ltv-salesforce-hands-on-environment/navigating-setup.mp4", durationLabel: "1 min 43 s" }),
      L(7, "using-setup-search-and-quick-find", "Using Setup Search and Quick Find", { contentDir: "ch02/07-using-setup-search-and-quick-find", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523375/ltv-salesforce-hands-on-environment/using-setup-search-and-quick-find.mp4", durationLabel: "1 min 36 s" }),
      L(8, "your-personal-settings", "Your Personal Settings", { contentDir: "ch02/08-your-personal-settings", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523927/ltv-salesforce-hands-on-environment/your-personal-settings.mp4", durationLabel: "1 min 22 s" }),
      L(9, "company-information-and-org-settings", "Company Information and Org Settings", { contentDir: "ch02/09-company-information-and-org-settings", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519292/ltv-salesforce-hands-on-environment/company-information-and-org-settings.mp4", durationLabel: "1 min 26 s" }),
      L(10, "sample-data-and-resetting-your-org", "Sample Data and Resetting Your Org", { contentDir: "ch02/10-sample-data-and-resetting-your-org", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519979/ltv-salesforce-hands-on-environment/sample-data-and-resetting-your-org.mp4", durationLabel: "1 min 36 s" }),
    ],
  },
  {
    n: 3,
    title: "Your Permanent Training Environment",
    lessons: [
      L(11, "preparing-your-permanent-training-environment", "Preparing Your Permanent Training Environment", { contentDir: "ch03/11-preparing-your-permanent-training-environment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524590/ltv-salesforce-hands-on-environment/preparing-your-permanent-training-environment.mp4", durationLabel: "1 min 43 s" }),
      L(12, "organizing-your-work-naming-and-notes", "Organizing Your Work: Naming and Notes", { contentDir: "ch03/12-organizing-your-work-naming-and-notes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520899/ltv-salesforce-hands-on-environment/organizing-your-work-naming-and-notes.mp4", durationLabel: "1 min 37 s" }),
      L(13, "using-trailhead-modules-and-superbadges-with-ltv", "Using Trailhead Modules and Superbadges With LTV", { contentDir: "ch03/13-using-trailhead-modules-and-superbadges-with-ltv", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525278/ltv-salesforce-hands-on-environment/using-trailhead-modules-and-superbadges-with-ltv.mp4", durationLabel: "1 min 48 s" }),
      L(14, "getting-help-documentation-and-the-trailblazer-community", "Getting Help: Documentation and the Trailblazer Community", { contentDir: "ch03/14-getting-help-documentation-and-the-trailblazer-community", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522043/ltv-salesforce-hands-on-environment/getting-help-documentation-and-the-trailblazer-community.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
];
