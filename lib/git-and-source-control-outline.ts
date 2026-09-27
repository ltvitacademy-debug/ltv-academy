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
    title: "Git Fundamentals",
    lessons: [
      L(1, "version-control-concepts", "Version Control Concepts"),
      L(2, "git-fundamentals", "Git Fundamentals"),
      L(3, "repositories-commits-and-history", "Repositories, Commits and History"),
      L(4, "branches", "Branches"),
      L(5, "merging", "Merging"),
      L(6, "remotes-and-github", "Remotes and GitHub"),
    ],
  },
  {
    n: 2,
    title: "Collaboration",
    lessons: [
      L(7, "pull-requests", "Pull Requests"),
      L(8, "merge-conflicts", "Merge Conflicts"),
      L(9, "code-review", "Code Review"),
      L(10, "branch-protection-and-permissions", "Branch Protection and Permissions"),
      L(11, "git-hooks-and-linting", "Git Hooks and Linting"),
    ],
  },
  {
    n: 3,
    title: "Salesforce Workflows",
    lessons: [
      L(12, "salesforce-development-workflows", "Salesforce Development Workflows"),
      L(13, "branching-strategies", "Branching Strategies"),
      L(14, "trunk-based-development-vs-feature-branches", "Trunk-Based Development vs. Feature Branches"),
      L(15, "managing-metadata-conflicts", "Managing Metadata Conflicts"),
      L(16, "gitignore-and-salesforce-projects", "Gitignore and Salesforce Projects"),
      L(17, "source-control-case-study", "Source Control Case Study"),
    ],
  },
];
