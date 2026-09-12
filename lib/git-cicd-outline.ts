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
      L(2, "installing-git", "Installing Git & Your First Repository"),
      L(3, "init-add-commit", "init, add & commit"),
      L(4, "branches", "Branches: Working Without Breaking Things"),
      L(5, "merge-vs-rebase", "Merge vs. Rebase"),
      L(6, "resolving-conflicts", "Resolving Merge Conflicts"),
    ],
  },
  {
    n: 2,
    title: "GitHub Essentials",
    lessons: [
      L(7, "repos-and-remotes", "Repositories & Remotes"),
      L(8, "push-and-pull", "Push, Pull & Fetch"),
      L(9, "pull-requests", "Pull Requests"),
      L(10, "code-review-basics", "Code Review Basics"),
      L(11, "github-issues-and-projects", "GitHub Issues & Project Boards"),
    ],
  },
  {
    n: 3,
    title: "Git for Data Projects Specifically",
    lessons: [
      L(12, "gitignore-for-data-projects", ".gitignore for Data Projects"),
      L(13, "notebooks-in-git", "Notebooks in Git: The Diff Problem"),
      L(14, "large-file-handling", "Large File Handling & Git LFS"),
      L(15, "versioning-sql-dbt-notebooks", "Versioning SQL, dbt Projects & Notebooks"),
    ],
  },
  {
    n: 4,
    title: "CI/CD Concepts",
    lessons: [
      L(16, "what-is-ci-cd", "What Is CI/CD, Really?"),
      L(17, "pipelines-as-code", "Pipelines as Code"),
      L(18, "github-actions-basics", "GitHub Actions Basics"),
      L(19, "running-tests-automatically", "Running Tests Automatically on Every Commit"),
    ],
  },
  {
    n: 5,
    title: "Building a CI/CD Pipeline for a Data Project",
    lessons: [
      L(20, "a-real-github-actions-workflow", "A Real GitHub Actions Workflow, Start to Finish"),
      L(21, "running-dbt-and-tests-in-ci", "Running dbt Models & Tests in CI"),
      L(22, "deploying-on-merge", "Deploying on Merge to Main"),
      L(23, "environment-secrets", "Environment Variables & Secrets in CI/CD"),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(24, "capstone-project", "Capstone: A Data Project With a Real CI/CD Pipeline"),
      L(25, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
