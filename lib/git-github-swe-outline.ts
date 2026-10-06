// The full Git & GitHub for Software Engineers course outline. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". A general-software-engineering-flavored
// Git course, distinct from the data-flavored Git/CI-CD course elsewhere
// in the catalog — built for the standalone AI Engineer (and Blockchain
// Engineer) paths, which don't assume any prior LTV course.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/git-github-swe/
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

export const GIT_GITHUB_SWE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Git Fundamentals",
    lessons: [
      L(1, "why-version-control", "Why Version Control?", { contentDir: "ch01/01-why-version-control" }),
      L(2, "installing-git", "Installing Git & Your First Repository", { contentDir: "ch01/02-installing-git" }),
      L(3, "init-add-commit", "init, add & commit", { contentDir: "ch01/03-init-add-commit" }),
      L(4, "branches", "Branches", { contentDir: "ch01/04-branches" }),
      L(5, "merge-vs-rebase", "Merge vs. Rebase", { contentDir: "ch01/05-merge-vs-rebase" }),
      L(6, "resolving-conflicts", "Resolving Merge Conflicts", { contentDir: "ch01/06-resolving-conflicts" }),
    ],
  },
  {
    n: 2,
    title: "GitHub Essentials",
    lessons: [
      L(7, "repos-and-remotes", "Repositories & Remotes", { contentDir: "ch02/07-repos-and-remotes" }),
      L(8, "push-and-pull", "Push, Pull & Fetch", { contentDir: "ch02/08-push-and-pull" }),
      L(9, "pull-requests", "Pull Requests", { contentDir: "ch02/09-pull-requests" }),
      L(10, "code-review", "Code Review", { contentDir: "ch02/10-code-review" }),
      L(11, "issues-and-project-boards", "Issues & Project Boards", { contentDir: "ch02/11-issues-and-project-boards" }),
    ],
  },
  {
    n: 3,
    title: "Collaborative Workflows",
    lessons: [
      L(12, "branching-strategies", "Branching Strategies: Git Flow & Trunk-Based"),
      L(13, "forking-workflow", "The Forking Workflow"),
      L(14, "git-blame-and-history", "git blame & History"),
      L(15, "tags-and-releases", "Tags & Releases"),
      L(16, "gitignore-best-practices", ".gitignore Best Practices"),
    ],
  },
  {
    n: 4,
    title: "CI/CD Basics",
    lessons: [
      L(17, "what-is-ci-cd", "What Is CI/CD?"),
      L(18, "github-actions-fundamentals", "GitHub Actions Fundamentals"),
      L(19, "running-tests-automatically", "Running Tests Automatically"),
      L(20, "deploying-on-merge", "Deploying on Merge"),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(21, "capstone-project", "Capstone: A Project With a Real GitHub Workflow"),
      L(22, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
