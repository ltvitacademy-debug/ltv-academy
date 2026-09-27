// The Git & Source Control course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/git-and-source-control/
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

export const SFTA_GIT_AND_SOURCE_CONTROL_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Git for Salesforce",
    lessons: [
      L(1, "git-fundamentals", "Git Fundamentals"),
      L(2, "branches", "Branches"),
      L(3, "pull-requests", "Pull Requests"),
      L(4, "merge-conflicts", "Merge Conflicts"),
      L(5, "salesforce-development-workflows", "Salesforce Development Workflows"),
      L(6, "branching-strategies", "Branching Strategies"),
      L(7, "code-review", "Code Review"),
    ],
  },
];
