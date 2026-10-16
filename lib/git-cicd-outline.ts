// The full Git, GitHub & CI/CD for Data course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". Written for people whose daily work is SQL, dbt, notebooks,
// and pipelines, not software engineers — every lesson stays grounded in a
// data project, not a generic software-dev tutorial.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/git-cicd/
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

export const GIT_CICD_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Git Fundamentals for Data People",
    lessons: [
      L(1, "why-git-for-data-work", "Why Git Matters for Data Work", { contentDir: "ch01/01-why-git-for-data-work", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119041/ltv-git-cicd/why-git-for-data-work.mp4", durationLabel: "1 min 24 s" }),
      L(2, "installing-git", "Installing Git & Your First Repository", { contentDir: "ch01/02-installing-git", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119091/ltv-git-cicd/installing-git.mp4", durationLabel: "1 min 41 s" }),
      L(3, "init-add-commit", "init, add & commit", { contentDir: "ch01/03-init-add-commit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119143/ltv-git-cicd/init-add-commit.mp4", durationLabel: "1 min 46 s" }),
      L(4, "branches", "Branches: Working Without Breaking Things", { contentDir: "ch01/04-branches", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119192/ltv-git-cicd/branches.mp4", durationLabel: "1 min 35 s" }),
      L(5, "merge-vs-rebase", "Merge vs. Rebase", { contentDir: "ch01/05-merge-vs-rebase", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119244/ltv-git-cicd/merge-vs-rebase.mp4", durationLabel: "1 min 47 s" }),
      L(6, "resolving-conflicts", "Resolving Merge Conflicts", { contentDir: "ch01/06-resolving-conflicts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119295/ltv-git-cicd/resolving-conflicts.mp4", durationLabel: "1 min 43 s" }),
    ],
  },
  {
    n: 2,
    title: "GitHub Essentials",
    lessons: [
      L(7, "repos-and-remotes", "Repositories & Remotes", { contentDir: "ch02/07-repos-and-remotes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119356/ltv-git-cicd/repos-and-remotes.mp4", durationLabel: "2 min 2 s" }),
      L(8, "push-and-pull", "Push, Pull & Fetch", { contentDir: "ch02/08-push-and-pull", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119395/ltv-git-cicd/push-and-pull.mp4", durationLabel: "1 min 21 s" }),
      L(9, "pull-requests", "Pull Requests", { contentDir: "ch02/09-pull-requests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119436/ltv-git-cicd/pull-requests.mp4", durationLabel: "1 min 20 s" }),
      L(10, "code-review-basics", "Code Review Basics", { contentDir: "ch02/10-code-review-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119481/ltv-git-cicd/code-review-basics.mp4", durationLabel: "1 min 32 s" }),
      L(11, "github-issues-and-projects", "GitHub Issues & Project Boards", { contentDir: "ch02/11-github-issues-and-projects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119534/ltv-git-cicd/github-issues-and-projects.mp4", durationLabel: "1 min 49 s" }),
    ],
  },
  {
    n: 3,
    title: "Git for Data Projects Specifically",
    lessons: [
      L(12, "gitignore-for-data-projects", ".gitignore for Data Projects", { contentDir: "ch03/12-gitignore-for-data-projects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119582/ltv-git-cicd/gitignore-for-data-projects.mp4", durationLabel: "1 min 35 s" }),
      L(13, "notebooks-in-git", "Notebooks in Git: The Diff Problem", { contentDir: "ch03/13-notebooks-in-git", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119638/ltv-git-cicd/notebooks-in-git.mp4", durationLabel: "1 min 48 s" }),
      L(14, "large-file-handling", "Large File Handling & Git LFS", { contentDir: "ch03/14-large-file-handling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119697/ltv-git-cicd/large-file-handling.mp4", durationLabel: "2 min 2 s" }),
      L(15, "versioning-sql-dbt-notebooks", "Versioning SQL, dbt Projects & Notebooks", { contentDir: "ch03/15-versioning-sql-dbt-notebooks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119749/ltv-git-cicd/versioning-sql-dbt-notebooks.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 4,
    title: "CI/CD Concepts",
    lessons: [
      L(16, "what-is-ci-cd", "What Is CI/CD, Really?", { contentDir: "ch04/16-what-is-ci-cd", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792119802/ltv-git-cicd/what-is-ci-cd.mp4", durationLabel: "1 min 42 s" }),
      L(17, "pipelines-as-code", "Pipelines as Code", { contentDir: "ch04/17-pipelines-as-code" }),
      L(18, "github-actions-basics", "GitHub Actions Basics", { contentDir: "ch04/18-github-actions-basics" }),
      L(19, "running-tests-automatically", "Running Tests Automatically on Every Commit", { contentDir: "ch04/19-running-tests-automatically" }),
    ],
  },
  {
    n: 5,
    title: "Building a CI/CD Pipeline for a Data Project",
    lessons: [
      L(20, "a-real-github-actions-workflow", "A Real GitHub Actions Workflow, Start to Finish", { contentDir: "ch05/20-a-real-github-actions-workflow" }),
      L(21, "running-dbt-and-tests-in-ci", "Running dbt Models & Tests in CI", { contentDir: "ch05/21-running-dbt-and-tests-in-ci" }),
      L(22, "deploying-on-merge", "Deploying on Merge to Main", { contentDir: "ch05/22-deploying-on-merge" }),
      L(23, "environment-secrets", "Environment Variables & Secrets in CI/CD", { contentDir: "ch05/23-environment-secrets" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(24, "capstone-project", "Capstone: A Data Project With a Real CI/CD Pipeline", { contentDir: "ch06/24-capstone-project" }),
      L(25, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/25-capstone-wrap-up" }),
    ],
  },
];
