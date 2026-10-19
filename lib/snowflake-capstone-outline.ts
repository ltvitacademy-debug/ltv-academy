// The full Snowflake Data Engineering Capstone course outline. Content-only
// for now — guide.md + quiz.json for every lesson, no video yet (the same
// content-first, video-later pattern used across this catalog; resume video
// production here only once explicitly asked). Ties together every course
// in the Snowflake Data Engineer path — Snowflake, dbt, Airflow, Power BI,
// Git/CI-CD, and Terraform & Bicep — into one continuous project (Driftwood
// Media, a fictional mid-size streaming subscription company), the same
// single-scenario, consistent-naming approach the AWS Capstone course uses
// for its own path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/snowflake-capstone/
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

export const SNOWFLAKE_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Capstone Overview",
    lessons: [
      L(1, "capstone-kickoff-and-business-scenario", "Capstone Kickoff & Business Scenario", {
        contentDir: "ch01/01-capstone-kickoff-and-business-scenario",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792381914/ltv-snowflake-capstone/ch01-01-capstone-kickoff-and-business-scenario.mp4",
        durationLabel: "1:58",
      }),
      L(2, "architecture-planning", "Architecture Planning", {
        contentDir: "ch01/02-architecture-planning",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792382012/ltv-snowflake-capstone/ch01-02-architecture-planning.mp4",
        durationLabel: "1:46",
      }),
    ],
  },
  {
    n: 2,
    title: "Building the Pipeline",
    lessons: [
      L(3, "ingesting-data-into-snowflake", "Ingesting Data Into Snowflake", {
        contentDir: "ch02/03-ingesting-data-into-snowflake",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792382133/ltv-snowflake-capstone/ch02-03-ingesting-data-into-snowflake.mp4",
        durationLabel: "2:03",
      }),
      L(4, "modeling-with-dbt-staging-to-marts", "Modeling With dbt: Staging to Marts", {
        contentDir: "ch02/04-modeling-with-dbt-staging-to-marts",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792382276/ltv-snowflake-capstone/ch02-04-modeling-with-dbt-staging-to-marts.mp4",
        durationLabel: "2:18",
      }),
      L(5, "testing-and-documenting-the-dbt-project", "Testing and Documenting the dbt Project", {
        contentDir: "ch02/05-testing-and-documenting-the-dbt-project",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792382398/ltv-snowflake-capstone/ch02-05-testing-and-documenting-the-dbt-project.mp4",
        durationLabel: "2:03",
      }),
      L(6, "orchestrating-with-airflow", "Orchestrating With Airflow", {
        contentDir: "ch02/06-orchestrating-with-airflow",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792382519/ltv-snowflake-capstone/ch02-06-orchestrating-with-airflow.mp4",
        durationLabel: "1:53",
      }),
      L(7, "connecting-power-bi-to-the-marts", "Connecting Power BI to the Marts", {
        contentDir: "ch02/07-connecting-power-bi-to-the-marts",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792382635/ltv-snowflake-capstone/ch02-07-connecting-power-bi-to-the-marts.mp4",
        durationLabel: "2:05",
      }),
      L(8, "building-the-executive-dashboard", "Building the Executive Dashboard", {
        contentDir: "ch02/08-building-the-executive-dashboard",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792382747/ltv-snowflake-capstone/ch02-08-building-the-executive-dashboard.mp4",
        durationLabel: "1:52",
      }),
    ],
  },
  {
    n: 3,
    title: "Production Practices",
    lessons: [
      L(9, "securing-subscriber-pii-with-rbac-and-masking", "Securing Subscriber PII With RBAC and Masking", {
        contentDir: "ch03/09-securing-subscriber-pii-with-rbac-and-masking",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792382885/ltv-snowflake-capstone/ch03-09-securing-subscriber-pii-with-rbac-and-masking.mp4",
        durationLabel: "2:17",
      }),
      L(10, "ci-cd-for-the-dbt-project", "CI/CD for the dbt Project", {
        contentDir: "ch03/10-ci-cd-for-the-dbt-project",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792382991/ltv-snowflake-capstone/ch03-10-ci-cd-for-the-dbt-project.mp4",
        durationLabel: "1:53",
      }),
      L(11, "provisioning-snowflake-with-terraform", "Provisioning Snowflake With Terraform", {
        contentDir: "ch03/11-provisioning-snowflake-with-terraform",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792383101/ltv-snowflake-capstone/ch03-11-provisioning-snowflake-with-terraform.mp4",
        durationLabel: "2:19",
      }),
      L(12, "monitoring-pipeline-health-and-warehouse-cost", "Monitoring Pipeline Health and Warehouse Cost", {
        contentDir: "ch03/12-monitoring-pipeline-health-and-warehouse-cost",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792383216/ltv-snowflake-capstone/ch03-12-monitoring-pipeline-health-and-warehouse-cost.mp4",
        durationLabel: "2:16",
      }),
      L(13, "disaster-recovery-with-time-travel-and-fail-safe", "Disaster Recovery With Time Travel and Fail-Safe", {
        contentDir: "ch03/13-disaster-recovery-with-time-travel-and-fail-safe",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792383322/ltv-snowflake-capstone/ch03-13-disaster-recovery-with-time-travel-and-fail-safe.mp4",
        durationLabel: "2:14",
      }),
    ],
  },
  {
    n: 4,
    title: "Wrap-Up",
    lessons: [
      L(14, "presenting-your-snowflake-data-platform", "Presenting Your Snowflake Data Platform", {
        contentDir: "ch04/14-presenting-your-snowflake-data-platform",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792383429/ltv-snowflake-capstone/ch04-14-presenting-your-snowflake-data-platform.mp4",
        durationLabel: "1:46",
      }),
      L(15, "portfolio-and-interview-prep", "Portfolio & Interview Prep", {
        contentDir: "ch04/15-portfolio-and-interview-prep",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792383515/ltv-snowflake-capstone/ch04-15-portfolio-and-interview-prep.mp4",
        durationLabel: "1:45",
      }),
    ],
  },
];
