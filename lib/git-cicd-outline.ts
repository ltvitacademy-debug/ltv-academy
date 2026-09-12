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
      L(1, "why-git-for-data-work", "Why Git Matters for Data Work", { contentDir: "ch01/01-why-git-for-data-work" }),
      L(2, "installing-git", "Installing Git & Your First Repository", { contentDir: "ch01/02-installing-git" }),
      L(3, "init-add-commit", "init, add & commit", { contentDir: "ch01/03-init-add-commit" }),
      L(4, "branches", "Branches: Working Without Breaking Things", { contentDir: "ch01/04-branches" }),
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
      L(10, "code-review-basics", "Code Review Basics", { contentDir: "ch02/10-code-review-basics" }),
      L(11, "github-issues-and-projects", "GitHub Issues & Project Boards", { contentDir: "ch02/11-github-issues-and-projects" }),
    ],
  },
  {
    n: 3,
    title: "Git for Data Projects Specifically",
    lessons: [
      L(12, "gitignore-for-data-projects", ".gitignore for Data Projects", { contentDir: "ch03/12-gitignore-for-data-projects" }),
      L(13, "notebooks-in-git", "Notebooks in Git: The Diff Problem", { contentDir: "ch03/13-notebooks-in-git" }),
      L(14, "large-file-handling", "Large File Handling & Git LFS", { contentDir: "ch03/14-large-file-handling" }),
      L(15, "versioning-sql-dbt-notebooks", "Versioning SQL, dbt Projects & Notebooks", { contentDir: "ch03/15-versioning-sql-dbt-notebooks" }),
    ],
  },
  {
    n: 4,
    title: "CI/CD Concepts",
    lessons: [
      L(16, "what-is-ci-cd", "What Is CI/CD, Really?", { contentDir: "ch04/16-what-is-ci-cd" }),
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
