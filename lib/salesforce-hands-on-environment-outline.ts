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
      L(1, "creating-your-trailhead-account", "Creating Your Trailhead Account"),
      L(2, "creating-trailhead-playgrounds", "Creating Trailhead Playgrounds"),
      L(3, "understanding-developer-edition-orgs", "Understanding Developer Edition Orgs"),
      L(4, "navigating-setup", "Navigating Setup"),
      L(5, "preparing-your-permanent-training-environment", "Preparing Your Permanent Training Environment"),
    ],
  },
];
