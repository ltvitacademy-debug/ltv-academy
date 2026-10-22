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
      L(1, "why-version-control", "Why Version Control?", { contentDir: "ch01/01-why-version-control", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626082/ltv-git-github-swe/why-version-control.mp4", durationLabel: "1 min 22 s" }),
      L(2, "installing-git", "Installing Git & Your First Repository", { contentDir: "ch01/02-installing-git", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626178/ltv-git-github-swe/installing-git.mp4", durationLabel: "1 min 16 s" }),
      L(3, "init-add-commit", "init, add & commit", { contentDir: "ch01/03-init-add-commit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626277/ltv-git-github-swe/init-add-commit.mp4", durationLabel: "1 min 22 s" }),
      L(4, "branches", "Branches", { contentDir: "ch01/04-branches", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626387/ltv-git-github-swe/branches.mp4", durationLabel: "1 min 27 s" }),
      L(5, "merge-vs-rebase", "Merge vs. Rebase", { contentDir: "ch01/05-merge-vs-rebase", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626488/ltv-git-github-swe/merge-vs-rebase.mp4", durationLabel: "1 min 20 s" }),
      L(6, "resolving-conflicts", "Resolving Merge Conflicts", { contentDir: "ch01/06-resolving-conflicts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626579/ltv-git-github-swe/resolving-conflicts.mp4", durationLabel: "1 min 14 s" }),
    ],
  },
  {
    n: 2,
    title: "GitHub Essentials",
    lessons: [
      L(7, "repos-and-remotes", "Repositories & Remotes", { contentDir: "ch02/07-repos-and-remotes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626683/ltv-git-github-swe/repos-and-remotes.mp4", durationLabel: "1 min 19 s" }),
      L(8, "push-and-pull", "Push, Pull & Fetch", { contentDir: "ch02/08-push-and-pull", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626764/ltv-git-github-swe/push-and-pull.mp4", durationLabel: "1 min 7 s" }),
      L(9, "pull-requests", "Pull Requests", { contentDir: "ch02/09-pull-requests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626856/ltv-git-github-swe/pull-requests.mp4", durationLabel: "1 min 9 s" }),
      L(10, "code-review", "Code Review", { contentDir: "ch02/10-code-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626933/ltv-git-github-swe/code-review.mp4", durationLabel: "1 min 3 s" }),
      L(11, "issues-and-project-boards", "Issues & Project Boards", { contentDir: "ch02/11-issues-and-project-boards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627049/ltv-git-github-swe/issues-and-project-boards.mp4", durationLabel: "1 min 25 s" }),
    ],
  },
  {
    n: 3,
    title: "Collaborative Workflows",
    lessons: [
      L(12, "branching-strategies", "Branching Strategies: Git Flow & Trunk-Based", { contentDir: "ch03/12-branching-strategies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627160/ltv-git-github-swe/branching-strategies.mp4", durationLabel: "1 min 25 s" }),
      L(13, "forking-workflow", "The Forking Workflow", { contentDir: "ch03/13-forking-workflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627248/ltv-git-github-swe/forking-workflow.mp4", durationLabel: "1 min 19 s" }),
      L(14, "git-blame-and-history", "git blame & History", { contentDir: "ch03/14-git-blame-and-history", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627333/ltv-git-github-swe/git-blame-and-history.mp4", durationLabel: "1 min 8 s" }),
      L(15, "tags-and-releases", "Tags & Releases", { contentDir: "ch03/15-tags-and-releases", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627420/ltv-git-github-swe/tags-and-releases.mp4", durationLabel: "1 min 14 s" }),
      L(16, "gitignore-best-practices", ".gitignore Best Practices", { contentDir: "ch03/16-gitignore-best-practices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627540/ltv-git-github-swe/gitignore-best-practices.mp4", durationLabel: "1 min 32 s" }),
    ],
  },
  {
    n: 4,
    title: "CI/CD Basics",
    lessons: [
      L(17, "what-is-ci-cd", "What Is CI/CD?", { contentDir: "ch04/17-what-is-ci-cd", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627631/ltv-git-github-swe/what-is-ci-cd.mp4", durationLabel: "1 min 12 s" }),
      L(18, "github-actions-fundamentals", "GitHub Actions Fundamentals", { contentDir: "ch04/18-github-actions-fundamentals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627747/ltv-git-github-swe/github-actions-fundamentals.mp4", durationLabel: "1 min 19 s" }),
      L(19, "running-tests-automatically", "Running Tests Automatically", { contentDir: "ch04/19-running-tests-automatically", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627843/ltv-git-github-swe/running-tests-automatically.mp4", durationLabel: "1 min 16 s" }),
      L(20, "deploying-on-merge", "Deploying on Merge", { contentDir: "ch04/20-deploying-on-merge", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627936/ltv-git-github-swe/deploying-on-merge.mp4", durationLabel: "1 min 11 s" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(21, "capstone-project", "Capstone: A Project With a Real GitHub Workflow", { contentDir: "ch05/21-capstone-project", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628042/ltv-git-github-swe/capstone-project.mp4", durationLabel: "1 min 19 s" }),
      L(22, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/22-capstone-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628148/ltv-git-github-swe/capstone-wrap-up.mp4", durationLabel: "1 min 31 s" }),
    ],
  },
];
