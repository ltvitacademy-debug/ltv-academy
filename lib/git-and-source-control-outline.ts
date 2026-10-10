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
      L(1, "version-control-concepts", "Version Control Concepts", { contentDir: "ch01/01-version-control-concepts" }),
      L(2, "git-fundamentals", "Git Fundamentals", { contentDir: "ch01/02-git-fundamentals" }),
      L(3, "repositories-commits-and-history", "Repositories, Commits and History", { contentDir: "ch01/03-repositories-commits-and-history" }),
      L(4, "branches", "Branches", { contentDir: "ch01/04-branches" }),
      L(5, "merging", "Merging", { contentDir: "ch01/05-merging" }),
      L(6, "remotes-and-github", "Remotes and GitHub", { contentDir: "ch01/06-remotes-and-github" }),
    ],
  },
  {
    n: 2,
    title: "Collaboration",
    lessons: [
      L(7, "pull-requests", "Pull Requests", { contentDir: "ch02/07-pull-requests" }),
      L(8, "merge-conflicts", "Merge Conflicts", { contentDir: "ch02/08-merge-conflicts" }),
      L(9, "code-review", "Code Review", { contentDir: "ch02/09-code-review" }),
      L(10, "branch-protection-and-permissions", "Branch Protection and Permissions", { contentDir: "ch02/10-branch-protection-and-permissions" }),
      L(11, "git-hooks-and-linting", "Git Hooks and Linting", { contentDir: "ch02/11-git-hooks-and-linting" }),
    ],
  },
  {
    n: 3,
    title: "Salesforce Workflows",
    lessons: [
      L(12, "salesforce-development-workflows", "Salesforce Development Workflows", { contentDir: "ch03/12-salesforce-development-workflows" }),
      L(13, "branching-strategies", "Branching Strategies", { contentDir: "ch03/13-branching-strategies" }),
      L(14, "trunk-based-development-vs-feature-branches", "Trunk-Based Development vs. Feature Branches", { contentDir: "ch03/14-trunk-based-development-vs-feature-branches" }),
      L(15, "managing-metadata-conflicts", "Managing Metadata Conflicts", { contentDir: "ch03/15-managing-metadata-conflicts" }),
      L(16, "gitignore-and-salesforce-projects", "Gitignore and Salesforce Projects", { contentDir: "ch03/16-gitignore-and-salesforce-projects" }),
      L(17, "source-control-case-study", "Source Control Case Study", { contentDir: "ch03/17-source-control-case-study" }),
    ],
  },
];
